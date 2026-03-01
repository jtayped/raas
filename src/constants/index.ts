import { RoundingMethods, Tiers } from "@/types/api";

export const API_URL = "https://raas.joeltaylor.business/api/round";

export const TIERS = ["free", "pro", "enterprise"] as const;
export const ROUNDING_METHODS = ["settle", "elevate", "smart"] as const;
export const ROUNDING_TERMS: Record<RoundingMethods, string> = {
  settle: "Gravitational Decimal Settling (GDS)™",
  elevate: "Aspirational Decimal Elevation (ADE)™",
  smart: "Smart Rounding™",
};

export const TIER_PERMISSIONS: Record<Tiers, Array<RoundingMethods>> = {
  free: ["settle"],
  pro: ["settle", "elevate"],
  enterprise: ["settle", "elevate", "smart"],
};
