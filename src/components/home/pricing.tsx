"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { requestToken } from "../toasts";

const tiers = [
  {
    name: "Hobbyist",
    price: "Free",
    period: "",
    description: "For individuals who round occasionally.",
    features: [
      { text: "Rounding down only", included: true },
      { text: "Community support (Reddit)", included: true },
      { text: "Rounding up numbers", included: false },
      { text: "Custom rounding strategies", included: false },
    ],
    cta: "Start Free",
    function: () => console.log("holaa"),
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For teams serious about decimal precision.",
    features: [
      { text: "10,000 rounds/month", included: true },
      { text: "All rounding methods", included: true },
      { text: "Rounding audit logs", included: true },
      { text: "99.9% SLA", included: true },
      { text: "Smart rounding strategies", included: false },
    ],
    cta: "Generate key",
    function: () => requestToken("pro"),
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For organizations that demand rounding excellence.",
    features: [
      { text: "Unlimited rounds", included: true },
      { text: "All rounding methods", included: true },
      { text: "24/7 dedicated support", included: true },
      { text: "Custom rounding strategies", included: true },
      { text: "On-premise deployment", included: true },
      { text: "Rounding insurance policy", included: true },
    ],
    cta: "Generate key",
    function: () => requestToken("enterprise"),
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/5 text-primary"
          >
            Pricing
          </Badge>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Simple, transparent pricing.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Pay only for the rounding you use. No hidden fees. No surprise
            decimals.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                tier.highlighted
                  ? "border-primary/50 bg-card/50 shadow-[0_0_40px_rgba(56,139,253,0.1)]"
                  : "border-border/50 bg-card/20"
              }`}
            >
              {tier.highlighted && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {tier.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-muted-foreground">{tier.period}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tier.description}
                </p>
              </div>

              <div className="mb-8 flex flex-1 flex-col gap-3">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    {feature.included ? (
                      <Check className="size-4 shrink-0 text-emerald-400" />
                    ) : (
                      <X className="size-4 shrink-0 text-muted-foreground/30" />
                    )}
                    <span
                      className={
                        feature.included
                          ? "text-foreground"
                          : "text-muted-foreground/40"
                      }
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                className={
                  tier.highlighted
                    ? "w-full bg-primary text-primary-foreground shadow-[0_0_20px_rgba(56,139,253,0.3)]"
                    : "w-full border-border/50 text-foreground"
                }
                variant={tier.highlighted ? "default" : "outline"}
                onClick={tier.function}
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          All plans include 256-bit AES encryption for your decimals. Because
          security.
        </p>
      </div>
    </section>
  );
}
