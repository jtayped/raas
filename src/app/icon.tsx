import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        display: "flex",
        width: "32px",
        height: "32px",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        backgroundColor: "#4f46e5",
      }}
    >
      <span
        style={{
          fontSize: "18px",
          fontWeight: "extrabold",
          color: "#ffffff",
        }}
      >
        R
      </span>
    </div>,
    {
      ...size,
    },
  );
}
