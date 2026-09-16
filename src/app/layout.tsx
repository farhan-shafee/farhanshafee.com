import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  applicationName: siteConfig.name,
  referrer: "strict-origin-when-cross-origin",
  robots:
    process.env.VERCEL_ENV === "preview"
      ? { index: false, follow: false }
      : { index: true, follow: true },
  alternates: { types: { "application/rss+xml": `${siteConfig.url}/rss.xml` } },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9fb" },
    { media: "(prefers-color-scheme: dark)", color: "#121419" },
  ],
  colorScheme: "light dark",
};

const themeScript = `(function(){var t;try{t=localStorage.getItem('fs-theme')}catch(e){}var m=matchMedia('(prefers-color-scheme: dark)');document.documentElement.dataset.theme=t==='dark'||t==='light'?t:m.matches?'dark':'light';m.addEventListener('change',function(e){var s;try{s=localStorage.getItem('fs-theme')}catch(e){}if(s!=='light'&&s!=='dark'){document.documentElement.dataset.theme=e.matches?'dark':'light';window.dispatchEvent(new Event('theme-change'))}})})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
