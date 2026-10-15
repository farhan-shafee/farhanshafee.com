"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Object.defineProperty(exports, "getRootDirs", { enumerable: true, get: function() { return getRootDirs; } });
var glob = require("glob/raw");
var matcher = require("minimatch");
var fs = require("node:fs");
var path = require("node:path");
function posix(value) {
    return value.replace(/\\/g, "/").replace(/^\/\/\?\/UNC\//, "//").replace(/^\/\/\?\/([A-Za-z]:\/)/, "$1");
}
function isDirectory(value) {
    try { return fs.statSync(value).isDirectory(); }
    catch (error) { if (error.code === "ENOENT" || error.code === "ENOTDIR") return false; throw error; }
}
// Raw syntax matters: hasMagic optimizes singleton classes such as [o].
function hasPatternSyntax(value) { return /[*?[\]{}()]/.test(value); }
function expandRoot(pattern) {
    var parts = pattern.split("/");
    var sawMagic = false;
    for (var part of parts) {
        if (part === ".." && sawMagic) return [];
        sawMagic = sawMagic || hasPatternSyntax(part);
    }
    if (!hasPatternSyntax(pattern)) return isDirectory(pattern) ? [pattern] : [];
    pattern = pattern.replace(/\/+$/, "");
    var base = path.posix.dirname(pattern);
    while (hasPatternSyntax(base)) base = path.posix.dirname(base);
    var absoluteBase = path.resolve(base);
    var relativePattern = path.posix.relative(base, pattern);
    return glob.globSync(pattern, { follow: true, posix: true, mark: false })
        .map(function(value) { return posix(path.resolve(posix(value))); })
        .filter(function(value) {
            var relative = posix(path.relative(absoluteBase, value));
            // Match relative to a literal base, never interpret checkout names as patterns.
            // A terminal globstar consumes zero segments after a dynamic directory.
            return relative !== "" && isDirectory(value) &&
                (matcher.minimatch(relative, relativePattern) || matcher.minimatch(relative + "/", relativePattern));
        })
        .map(function(value) {
            var relative = posix(path.relative(absoluteBase, value));
            if (base === ".") return (pattern.startsWith("./") ? "./" : "") + relative;
            return base.replace(/\/$/, "") + "/" + relative;
        });
}
function processRootDir(rootDir) {
    var pattern = rootDir.replace(/\\/g, "/");
    if (!pattern) throw new TypeError("Patterns must be a string (non empty) or an array of strings");
    if (pattern[0] === "!" && !pattern.startsWith("!(")) return [];
    // Each expanded alternative has its own static traversal base, as fast-glob did.
    var matches = matcher.braceExpand(pattern).flatMap(expandRoot);
    return Array.from(new Set(matches)).sort();
}
var getRootDirs = function(context) {
    var rootDirs = [context.cwd];
    var nextSettings = context.settings.next || {};
    var rootDir = nextSettings.rootDir;
    if (typeof rootDir === "string") rootDirs = processRootDir(rootDir);
    else if (Array.isArray(rootDir)) rootDirs = rootDir.map(function(dir) {
        return typeof dir === "string" ? processRootDir(dir) : [];
    }).flat();
    return rootDirs;
};
