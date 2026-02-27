export function generateTierToken(tier: "pro" | "enterprise") {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let token = tier === "enterprise" ? "ent_" : "pro_";
  for (let i = 0; i < 24; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}
