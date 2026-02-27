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

  switch (tier) {
    case "enterprise":
      if (methodParam === "floor") {
        result = Math.floor(num);
      } else if (methodParam === "ceil") {
        result = Math.ceil(num);
      } else {
        result = Math.round(num);
      }
      break;

    case "pro":
      if (methodParam === "floor") {
        result = Math.floor(num);
      } else {
        result = Math.ceil(num);
      }
      break;

    case "free":
    default:
      result = Math.floor(num);
      break;
  }

  return NextResponse.json({
    original_value: num,
    rounded_value: result,
  });
}
