import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test, { after, before } from "node:test";

const repo = process.cwd();
const load = createRequire(
  path.join(repo, "node_modules/eslint-config-next/package.json"),
);
const resolverFile = load.resolve(
  "@next/eslint-plugin-next/dist/utils/get-root-dirs.js",
);
const pluginRoot = path.dirname(
  load.resolve("@next/eslint-plugin-next/package.json"),
);
const getRootDirs: (context: {
  cwd: string;
  settings: { next?: { rootDir?: unknown } };
}) => string[] = load(resolverFile).getRootDirs;
const fixture = mkdtempSync(path.join(tmpdir(), "portfolio-next-lint-"));
const unix = (value: string) => value.replaceAll("\\", "/");
const dirs = (rootDir: unknown) =>
  getRootDirs({ cwd: repo, settings: { next: { rootDir } } });
const sorted = (values: string[]) => [...values].sort();

function stableResolverSettings(settings: Record<string, unknown>) {
  const resolvers = settings["import/resolver"];
  if (!resolvers || typeof resolvers !== "object" || Array.isArray(resolvers))
    return settings;
  const aliases = new Map([
    [load.resolve("eslint-import-resolver-node"), "node"],
    [load.resolve("eslint-import-resolver-typescript"), "typescript"],
  ]);
  const seen = new Set<string>();
  const entries = Object.entries(resolvers).map(([key, value]) => {
    const name = aliases.get(key) ?? key;
    assert.ok(!seen.has(name), "duplicate resolver " + name);
    seen.add(name);
    return [name, value];
  });
  return { ...settings, "import/resolver": Object.fromEntries(entries) };
}

test("resolver settings normalize only the installed official resolver paths", () => {
  const input = {
    react: { version: "detect" },
    "import/resolver": {
      [load.resolve("eslint-import-resolver-node")]: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      [load.resolve("eslint-import-resolver-typescript")]: {
        alwaysTryTypes: true,
      },
    },
  };
  assert.deepEqual(stableResolverSettings(input), {
    react: { version: "detect" },
    "import/resolver": {
      node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
      typescript: { alwaysTryTypes: true },
    },
  });
});

test("resolver settings reject aliases that would overwrite an existing resolver", () => {
  assert.throws(
    () =>
      stableResolverSettings({
        "import/resolver": {
          node: { extensions: [".js"] },
          [load.resolve("eslint-import-resolver-node")]: {
            extensions: [".ts"],
          },
        },
      }),
    /duplicate resolver/,
  );
});

test("resolver settings preserve unknown paths and every resolver option", () => {
  const unknown = path.join(
    repo,
    "other-checkout",
    "eslint-import-resolver-node",
    "index.js",
  );
  const input = {
    "import/resolver": {
      [unknown]: { extensions: [".custom"], enabled: false },
      node: { extensions: [".js"], custom: { strict: true } },
    },
  };
  assert.deepEqual(stableResolverSettings(input), input);
});

before(() => {
  for (const dir of ["apps/one/deep", "apps/two", "apps/.hidden", "empty"])
    mkdirSync(path.join(fixture, dir), { recursive: true });
  writeFileSync(path.join(fixture, "apps/plain.txt"), "not a directory");
  symlinkSync(
    path.join(fixture, "apps/one"),
    path.join(fixture, "apps/linked"),
    process.platform === "win32" ? "junction" : "dir",
  );
  process.chdir(fixture);
});
after(() => {
  process.chdir(repo);
  rmSync(fixture, { recursive: true, force: true });
});

test("Next lint defaults to context.cwd without changing rule behavior", () => {
  assert.deepEqual(getRootDirs({ cwd: repo, settings: {} }), [repo]);
});

test("literal roots preserve relative prefixes and trailing separators", () => {
  for (const root of ["apps/one", "./apps/one", "apps/one/", "./"])
    assert.deepEqual(dirs(root), [root]);
});

test("wildcards include symlinked directories and exclude files and hidden roots", () => {
  const expected = ["apps/linked", "apps/one", "apps/two"];
  assert.deepEqual(sorted(dirs("apps/*")), expected);
  assert.deepEqual(sorted(dirs("apps/*/")), expected);
  assert.deepEqual(sorted(dirs("apps\\*")), expected);
});

test("recursive roots include symlink descendants and exclude the glob base", () => {
  const expected = [
    "apps/linked",
    "apps/linked/deep",
    "apps/one",
    "apps/one/deep",
    "apps/two",
  ];
  assert.deepEqual(sorted(dirs("apps/**")), expected);
  assert.deepEqual(sorted(dirs("apps/**/")), expected);
});

test("terminal globstars retain roots selected by the preceding wildcard", () => {
  assert.deepEqual(sorted(dirs("apps/*/**")), [
    "apps/linked",
    "apps/linked/deep",
    "apps/one",
    "apps/one/deep",
    "apps/two",
  ]);
});

test("singleton character classes expand to their matching directories", () => {
  assert.deepEqual(dirs("apps/[o]ne"), ["apps/one"]);
});

test("literal glob characters in the checkout directory do not suppress roots", () => {
  const checkout = path.join(fixture, "checkout-[1]");
  mkdirSync(path.join(checkout, "apps/one"), { recursive: true });
  process.chdir(checkout);
  try {
    assert.deepEqual(dirs("apps/*"), ["apps/one"]);
  } finally {
    process.chdir(fixture);
  }
});

test("brace-expanded recursive roots exclude each static traversal base", () => {
  for (const root of ["apps/{one,two}/**", "{apps/one,apps/two}/**"])
    assert.deepEqual(dirs(root), ["apps/one/deep"]);
  assert.deepEqual(dirs("apps/[o]ne/**"), ["apps/one", "apps/one/deep"]);
});

test("brace alternatives, extglobs and single-character patterns retain their directory matches", () => {
  assert.deepEqual(sorted(dirs("apps/{one,two}")), ["apps/one", "apps/two"]);
  assert.deepEqual(sorted(dirs("apps/+(one|two)")), ["apps/one", "apps/two"]);
  assert.deepEqual(dirs("apps/?ne"), ["apps/one"]);
  assert.deepEqual(dirs("apps/.hidden"), ["apps/.hidden"]);
});

test("absolute roots and absolute wildcard roots retain the same paths on Windows and Linux", () => {
  const root = unix(fixture);
  assert.deepEqual(dirs(root + "/apps/one"), [root + "/apps/one"]);
  assert.deepEqual(
    sorted(dirs(root + "/apps/*/")),
    ["linked", "one", "two"].map((name) => root + "/apps/" + name),
  );
});

test("parent-relative roots preserve aliases that resolve back into the fixture", () => {
  const root = "../" + path.basename(fixture) + "/apps/one";
  assert.deepEqual(dirs(root), [root]);
});

test("arrays preserve input order and ignore non-string entries", () => {
  assert.deepEqual(dirs(["apps/two", 42, null, "apps/one"]), [
    "apps/two",
    "apps/one",
  ]);
  assert.deepEqual(dirs([]), []);
});

test("missing roots and negative-only roots stay empty while empty strings remain errors", () => {
  assert.deepEqual(dirs("missing"), []);
  assert.deepEqual(dirs("!apps/*"), []);
  assert.deepEqual(dirs("apps/*/../one"), []);
  assert.throws(() => dirs(""), TypeError);
});

test("deep brace patterns complete without a recursive stack overflow", () => {
  const script = [
    "const resolve = require(" +
      JSON.stringify(resolverFile) +
      ").getRootDirs;",
    "try { resolve({cwd:process.cwd(),settings:{next:{rootDir:'{'.repeat(3000)+'a,b'+'}'.repeat(3000)}}});",
    "console.log('completed'); } catch (error) { console.error(error.name+': '+error.message); process.exit(2); }",
  ].join("\n");
  const child = spawnSync(
    process.execPath,
    ["--max-old-space-size=128", "-e", script],
    { cwd: fixture, encoding: "utf8", timeout: 8000, maxBuffer: 100_000 },
  );
  assert.equal(child.status, 0, child.stderr || child.error?.message);
  assert.equal(child.stdout.trim(), "completed");
});

test("the resolved project lock contains none of the vulnerable glob dependency chain", () => {
  const lock = JSON.parse(
    readFileSync(path.join(repo, "package-lock.json"), "utf8"),
  );
  const affected = Object.keys(lock.packages).filter((name) =>
    /(?:^|\/)node_modules\/(?:fast-glob|micromatch|braces)$/.test(name),
  );
  assert.deepEqual(
    affected,
    [],
    "vulnerable transitive packages must actually be removed",
  );
});

test("all upstream Next lint rules and configuration code remain byte-for-byte intact", () => {
  const upstream = JSON.parse(
    readFileSync(
      path.join(repo, "tooling/next-eslint-plugin/upstream.json"),
      "utf8",
    ),
  );
  const plugin = load("@next/eslint-plugin-next");
  assert.deepEqual(Object.keys(plugin.rules).sort(), upstream.rules);
  assert.equal(
    readFileSync(path.join(pluginRoot, "dist/utils/get-root-dirs.js"), "utf8"),
    readFileSync(
      path.join(repo, "tooling/next-eslint-plugin/dist/utils/get-root-dirs.js"),
      "utf8",
    ),
    "installed helper must equal the reviewed local source",
  );
  for (const file of upstream.files.filter(
    (entry: { file: string }) =>
      entry.file.startsWith("dist/") &&
      entry.file !== "dist/utils/get-root-dirs.js",
  )) {
    const actual = createHash("sha256")
      .update(readFileSync(path.join(pluginRoot, file.file)))
      .digest("hex");
    assert.equal(actual, file.sha256, file.file + " changed");
  }
});

test("the effective Next, React, accessibility and TypeScript rule configurations are unchanged", async () => {
  const { ESLint } = load("eslint");
  const lint = new ESLint({ cwd: repo });
  const expected = JSON.parse(
    readFileSync(
      path.join(repo, "tests/fixtures/next-lint-config.json"),
      "utf8",
    ),
  );
  for (const [file, baseline] of Object.entries(expected)) {
    const config = await lint.calculateConfigForFile(path.join(repo, file));
    const current = {
      rules: config.rules,
      settings: stableResolverSettings(config.settings ?? {}),
      globals: config.languageOptions.globals,
      parser: config.languageOptions.parser.meta?.name,
      ecmaVersion: config.languageOptions.ecmaVersion,
      sourceType: config.languageOptions.sourceType,
    };
    assert.deepEqual(JSON.parse(JSON.stringify(current)), baseline, file);
  }
});

async function assertPageLinkRule(checkout: string, rootDir: string) {
  const pages = path.join(checkout, "apps/one/pages");
  mkdirSync(pages, { recursive: true });
  writeFileSync(
    path.join(pages, "about.js"),
    "export default function About() {}",
  );
  const { ESLint } = load("eslint");
  const plugin = load("@next/eslint-plugin-next");
  const lint = new ESLint({
    cwd: checkout,
    overrideConfigFile: true,
    overrideConfig: [
      {
        files: ["**/*.jsx"],
        languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
        plugins: { "@next/next": plugin },
        settings: { next: { rootDir } },
        rules: { "@next/next/no-html-link-for-pages": "error" },
      },
    ],
  });
  const previous = process.cwd();
  process.chdir(checkout);
  try {
    const [result] = await lint.lintText(
      'export default function Page() { return <a href="/about">About</a> }',
      { filePath: path.join(pages, "index.jsx") },
    );
    assert.ok(
      result.messages.some(
        (message: { ruleId: string }) =>
          message.ruleId === "@next/next/no-html-link-for-pages",
      ),
      rootDir,
    );
  } finally {
    process.chdir(previous);
  }
}

for (const rootDir of ["apps/*", "apps/*/**", "apps/[o]ne"])
  test(
    "the real Next page-link rule detects violations with " + rootDir,
    async () => {
      await assertPageLinkRule(fixture, rootDir);
    },
  );

test("the real Next page-link rule detects violations in a checkout with literal brackets", async () => {
  await assertPageLinkRule(path.join(fixture, "lint-checkout-[1]"), "apps/*");
});
