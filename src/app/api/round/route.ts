import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const numberParam = searchParams.get("number");
  const methodParam = searchParams.get("method");

  const authHeader = request.headers.get("authorization");
  const apiKey =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : "";

  if (!numberParam || isNaN(Number(numberParam))) {
    return NextResponse.json(
      {
        error: "Bad Request: Please provide a valid 'number' query parameter.",
      },
      { status: 400 },
    );
  }

  const num = Number(numberParam);
  let result;
  let tier = "free";

  if (apiKey.startsWith("ent_")) {
    tier = "enterprise";
  } else if (apiKey.startsWith("pro_")) {
    tier = "pro";
  } else if (apiKey.length > 0) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid API key. Please upgrade your plan." },
      { status: 401 },
    );
  }

  // Strict Gatekeeping
  if (tier === "free" && (methodParam === "ceil" || methodParam === "round")) {
    return NextResponse.json(
      {
        error: `Payment Required: this is a premium feature. Please upgrade your plan.`,
      },
      { status: 402 },
    );
  }

  if (tier === "pro" && methodParam === "round") {
    return NextResponse.json(
      {
        error: "Payment Required: this requires an Enterprise license.",
      },
      { status: 402 },
    );
  }

  // Execution
  switch (tier) {
    case "enterprise":
      if (methodParam === "floor") {
        result = Math.floor(num);
      } else if (methodParam === "ceil") {
        result = Math.ceil(num);
      } else {
        result = Math.round(num); // Defaults to true round
      }
      break;

    case "pro":
      if (methodParam === "floor") {
        result = Math.floor(num);
      } else {
        result = Math.ceil(num); // Defaults to ceil
      }
      break;

    case "free":
    default:
      result = Math.floor(num); // Strictly locked to floor
      break;
  }

  return NextResponse.json({
    original_value: num,
    rounded_value: result,
  });
}
