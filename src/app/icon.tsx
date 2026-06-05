import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon — the Ascent mark on the indigo brand tile.
// Drawn inline so ImageResponse / Satori can rasterize it without any external font/asset.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "linear-gradient(135deg, #5B5FE8 0%, #7C7FED 55%, #E0B978 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          {/* Right-leg ghost — completes the M silhouette */}
          <path
            d="M26 26 L26 9"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.5"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Rising arrow (left-leg → valley → up to tip) */}
          <path
            d="M6 26 L6 9 L16 18 L26 7"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Arrowhead */}
          <path
            d="M20 7 L26 7 L26 13"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
