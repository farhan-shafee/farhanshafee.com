import { PageIntro, TextLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="404 / Not found"
        title="Nothing at this address."
        description="This page may have moved, or it hasn’t been published yet."
      />
      <TextLink href="/">Return home</TextLink>
    </div>
  );
}
