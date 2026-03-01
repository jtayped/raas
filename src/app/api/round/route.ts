import { ROUNDING_METHODS, ROUNDING_TERMS } from "@/constants";
import { RoundingMethods } from "@/types/api";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const startTime = performance.now();

  const { searchParams } = new URL(request.url);
  const numberParam = searchParams.get("number");
  const methodParam = (searchParams.get("method") ??
    "settle") as RoundingMethods;

  const authHeader = request.headers.get("authorization");
  const apiKey =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : "free_tier";

  if (numberParam === "apple" || numberParam === "banana") {
    return NextResponse.json(
      {
        error: "Cannot apply mathematical truncation to fruit.",
      },
      { status: 418 },
    );
  }

  if (!numberParam || isNaN(Number(numberParam))) {
    return NextResponse.json(
      {
        error:
          "Unprocessable Entity: Please provide a compliant 'number' query parameter.",
      },
      { status: 422 },
    );
  }

  const num = Number(numberParam);
  let result;
  let tier = "free";

  if (apiKey.startsWith("ent_")) {
    tier = "enterprise";
  } else if (apiKey.startsWith("pro_")) {
    tier = "pro";
  } else if (apiKey.startsWith("free_") || apiKey === "free_tier") {
    tier = "free";
  } else {
    return NextResponse.json(
      {
        error: "Unauthorized: Invalid or deprecated Bearer token.",
      },
      { status: 401 },
    );
  }

  // Check if the method even exists
  if (!ROUNDING_METHODS.includes(methodParam)) {
    return NextResponse.json(
      {
        error: `Bad Request: '${methodParam}' is not a recognized corporate rounding strategy. Try: ${ROUNDING_METHODS.join(", ")}.`,
      },
      { status: 400 },
    );
  }

  // Map tiers to their paid features
  const tierPermissions: Record<string, Array<RoundingMethods>> = {
    free: ["settle"],
    pro: ["settle", "elevate"],
    enterprise: ["settle", "elevate", "smart"],
  };

  // Throws 402 if they try to use a method they haven't paid for
  if (
    !tierPermissions[tier as keyof typeof tierPermissions].includes(methodParam)
  ) {
    return NextResponse.json(
      {
        error: `The '${methodParam}' algorithm is locked behind a higher paywall.`,
      },
      { status: 402 },
    );
  }

  if (methodParam === "smart") {
    result = Math.round(num);
  } else if (methodParam === "elevate") {
    result = Math.ceil(num);
  } else {
    result = Math.floor(num);
  }

  const algorithmName = ROUNDING_TERMS[methodParam];
  const precisionLoss = Math.abs(num - result);
  const fakeLatency = Math.random() * 80 + 40;
  const computationTimeMs = (
    performance.now() -
    startTime +
    fakeLatency
  ).toFixed(2);

  return NextResponse.json({
    status: "success",
    data: {
      original_value: num,
      rounded_value: result,
      precision_loss: Number(precisionLoss.toFixed(10)),
    },
    metadata: {
      algorithm_used: algorithmName,
      computation_time_ms: Number(computationTimeMs),
      is_integer: Number.isInteger(result),
    },
  });
}
