import { Badge } from "@/components/ui/badge";
import { Check, Zap } from "lucide-react";

const features = [
  "Prefix-based Bearer Auth",
  "Stateless JSON responses",
  "Aggressive decimal truncation",
  "Premium Round-up support",
  "Query-based method routing",
  "Enterprise Smart Rounding",
];

export default function Features() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/5 text-primary"
          >
            Features
          </Badge>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Over-engineered for your delight.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every feature you never knew you needed, built with technologies you
            never asked for.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {/* Large feature card */}
          <div className="flex flex-col justify-between rounded-2xl border border-border/50 bg-card/20 p-8 md:col-span-2 md:row-span-2">
            <div>
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                <Zap className="size-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Smart Rounding™ (Enterprise Only)
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                Why settle for the floor when you can afford the truth? Our
                Enterprise tier unlocks the highly coveted `Math.round()`
                algorithm, authenticated securely via military-grade Bearer
                tokens.
              </p>
            </div>
            <div className="mt-8 rounded-xl border border-border/30 bg-background/50 p-4 font-mono text-xs">
              <p className="text-muted-foreground">
                <span className="text-primary">const</span>{" "}
                <span className="text-emerald-400">res</span> ={" "}
                <span className="text-primary">await</span> fetch(
              </p>
              <p className="pl-4 text-muted-foreground">
                <span className="text-amber-400">
                  {'"/api/round?number=4.8"'}
                </span>
                ,
              </p>
              <p className="pl-4 text-muted-foreground">
                {"{ "}headers: {"{ "}Authorization:{" "}
                <span className="text-amber-400">{'"Bearer ent_7x9p2"'}</span>
                {" } }"}
              </p>
              <p className="text-muted-foreground">{");"}</p>
              <p className="mt-2 text-muted-foreground">
                <span className="text-primary">const</span>{" "}
                <span className="text-emerald-400">data</span> ={" "}
                <span className="text-primary">await</span> res.json();
              </p>
              <p className="mt-2 text-emerald-400">
                {"// => { original_value: 4.8, rounded_value: 5 }"}
              </p>
            </div>
          </div>

          {/* Small feature cards */}
          <div className="rounded-2xl border border-border/50 bg-card/20 p-8">
            <h3 className="text-lg font-bold text-foreground">
              Pro Tier: The Power of Choice
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Pass `?method=ceil` or `?method=floor` in your URL. Because paying
              $4.99/mo means never having to round down if you don&apos;t want
              to.
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card/20 p-8">
            <h3 className="text-lg font-bold text-foreground">
              Strict Bearer Authentication
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Your calculations are protected by state-of-the-art string prefix
              validation. If your key doesn&apos;t start with `pro_` or `ent_`,
              you&apos;re staying on the floor.
            </p>
          </div>

          {/* Full-width feature */}
          <div className="rounded-2xl border border-border/50 bg-card/20 p-8 md:col-span-3">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Everything you need to round with confidence.
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Enterprise features included at every tier. Most of them are
                  just basic math.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-3">
                {features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-sm text-foreground/80"
                  >
                    <Check className="size-4 shrink-0 text-emerald-400" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
