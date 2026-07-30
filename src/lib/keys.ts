import { TIER_PREFIXES } from "@/constants";
import { Tiers } from "@/types/api";

/** Mints a token for any tier, prefix taken from the shared table rather
 * than a ternary, so the playground and the api can never disagree about
 * what a given tier's token looks like. */
export function generateTierToken(tier: Tiers) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let token = TIER_PREFIXES[tier];
  for (let i = 0; i < 24; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}
