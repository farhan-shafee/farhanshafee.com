import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt =
  "Farhan Shafee — Security Engineering, AI Automation & Fintech Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#121419",
        color: "#f8f9fb",
        display: "flex",
        flexDirection: "column",
        padding: "64px 80px",
        fontFamily: "sans-serif",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#b7bcc6",
          fontSize: 22,
        }}
      >
        <span>farhanshafee.com</span>
        <span>SECURITY / AUTOMATION / SYSTEMS</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: 56,
            height: 5,
            background: "#a99eff",
            marginBottom: 32,
          }}
        />
        <div style={{ fontSize: 82, letterSpacing: "-4px", fontWeight: 700 }}>
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 26,
            color: "#c9c6ec",
          }}
        >
          Security Engineering × AI Automation × Fintech Systems
        </div>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #3a3d46",
          paddingTop: 24,
          fontSize: 22,
          color: "#b7bcc6",
        }}
      >
        Security tooling, workflow automation, and backend financial systems.
      </div>
    </div>,
    size,
  );
}
