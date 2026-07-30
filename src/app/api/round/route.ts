import {
  PURCHASABLE_PREFIXES,
  ROUNDING_METHODS,
  ROUNDING_TERMS,
  TIER_PERMISSIONS,
  TIER_PREFIXES,
} from "@/constants";
import { RoundingMethods, Tiers } from "@/types/api";
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

  /* Derived from TIER_PREFIXES rather than a hand-written ladder, so a new
     tier is one entry in one object and cannot be added to the permissions
     table while remaining unauthenticable.
     No prefix here is a prefix of another, so first match wins safely. If
     one ever is, order this longest-first. The "free_tier" placeholder used
     when no header arrives matches free_ on its own. */
  const tier = (Object.keys(TIER_PREFIXES) as Tiers[]).find((candidate) =>
    apiKey.startsWith(TIER_PREFIXES[candidate]),
  );

  if (!tier) {
    return NextResponse.json(
      {
        error: "Unauthorized: Invalid or deprecated Bearer token.",
        purchasable_prefixes: PURCHASABLE_PREFIXES,
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

  // Throws 402 if they try to use a method they haven't paid for
  if (!TIER_PERMISSIONS[tier].includes(methodParam)) {
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
  } else if (methodParam === "abstain") {
    /* The premium feature is that it does nothing. The number was already
       fine and rounding it was always the customer's idea. */
    result = num;
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
      tier,
      /* Gated on the method rather than the tier, because the fourth tier
         can still call the other three algorithms and those do round. A
         note claiming otherwise while precision_loss sat above zero two
         lines up would be the one wrong fact in the response. */
      ...(methodParam === "abstain"
        ? {
            note: "this method does not round. the number was already fine. joeltaylor.business",
          }
        : {}),
    },
  });
}
