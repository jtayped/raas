import { RoundingMethods, Tiers } from "@/types/api";

export const API_URL = "https://raas.joeltaylor.business/api/round";

/** The fourth tier is not in the pricing table and not in the docs.
 *
 * It is the same joke as the fourth flag on joeltaylor.business: a slot in
 * a list of three that is not a member of the category the other three
 * belong to. It sells nothing, it is not more expensive, and the thing it
 * unlocks is the algorithm that declines to do the work.
 *
 * Any token starting with the prefix is accepted, because there is no key
 * store here and there never was. That is true of the other three tiers as
 * well, which is arguably the more interesting disclosure. */
export const TIERS = ["free", "pro", "enterprise", "joel"] as const;

export const ROUNDING_METHODS = ["settle", "elevate", "smart", "abstain"] as const;

export const ROUNDING_TERMS: Record<RoundingMethods, string> = {
  settle: "Gravitational Decimal Settling (GDS)™",
  elevate: "Aspirational Decimal Elevation (ADE)™",
  smart: "Smart Rounding™",
  abstain: "Principled Numerical Abstention (PNA)™",
};

/** Single source of truth for what each tier may call.
 *
 * This used to be declared here and again inline inside the round route,
 * with nothing importing this copy. They happened to agree, so nothing was
 * visibly wrong, and adding a tier to one of them would have quietly
 * 402'd a tier that the rest of the app believed in. */
export const TIER_PERMISSIONS: Record<Tiers, Array<RoundingMethods>> = {
  free: ["settle"],
  pro: ["settle", "elevate"],
  enterprise: ["settle", "elevate", "smart"],
  joel: ["settle", "elevate", "smart", "abstain"],
};

/** Bearer token prefix per tier, and the only authentication in the
 * building. Ordered longest-first is unnecessary here since none is a
 * prefix of another, but keep it that way if one ever is. */
export const TIER_PREFIXES: Record<Tiers, string> = {
  free: "free_",
  pro: "pro_",
  enterprise: "ent_",
  joel: "joel_",
};

/** What the 401 admits to accepting.
 *
 * The fourth prefix is left off deliberately, and the field it is served
 * under is named for what this list actually is rather than for what it
 * would be convenient to imply. Every prefix here can be bought. The one
 * that is missing cannot, which is why it is not in a list of the ones
 * that can, and a reader who notices the word doing that work has found
 * the more interesting half of this api. */
export const PURCHASABLE_PREFIXES = [
  TIER_PREFIXES.free,
  TIER_PREFIXES.pro,
  TIER_PREFIXES.enterprise,
];
