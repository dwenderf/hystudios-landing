import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Hudson Yards Studios";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "#0b0d12",
          color: "white",
        }}
      >
        <div style={{ fontSize: 18, opacity: 0.7, letterSpacing: 1 }}>
          Hudson Yards Studios
        </div>

        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, marginTop: 16 }}>
          Building the rails for
          <br />
          modern film finance
        </div>

        <div style={{ fontSize: 26, opacity: 0.75, marginTop: 22, maxWidth: 900 }}>
          A modern film finance, studio, and technology platform.
        </div>

        <div style={{ marginTop: 44, fontSize: 18, opacity: 0.6 }}>hystudios.io</div>
      </div>
    ),
    size
  );
}
