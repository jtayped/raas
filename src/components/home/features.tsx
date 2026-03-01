import { Badge } from "@/components/ui/badge";
import { Check, Zap } from "lucide-react";
import { API_URL, ROUNDING_TERMS } from "@/constants";

const features = [
  "Prefix-based Bearer Auth",
  "Stateless JSON responses",
  "Actionable precision analytics",
  "Premium Aspirational Elevation",
  "Query-based method routing",
  "Enterprise Smart Rounding",
];

export default function Features() {
  return (
    <section className="overflow-hidden py-32 sm:px-6 lg:px-8">
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
          <div className="flex min-w-0 flex-col justify-between rounded-2xl border border-border/50 bg-card/20 p-6 md:col-span-2 md:row-span-2 md:p-8">
            <div>
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                <Zap className="size-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                {ROUNDING_TERMS.smart} (Enterprise Only)
              </h3>
              <p className="mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
                Why settle for the baseline when you can afford the absolute
                truth? Our Enterprise tier unlocks proprietary, AI-adjacent
                proximity snapping. We algorithmically evaluate your
                decimal&apos;s delta relative to its neighboring integers,
                authenticated securely via military-grade Bearer tokens.
              </p>
            </div>
            <div className="mt-8 w-full overflow-x-auto rounded-xl border border-border/30 bg-background/50 p-4 font-mono text-xs">
              <p className="whitespace-nowrap text-muted-foreground">
                <span className="text-primary">const</span>{" "}
                <span className="text-emerald-400">res</span> ={" "}
                <span className="text-primary">await</span> fetch(
              </p>
              <p className="whitespace-nowrap pl-4 text-muted-foreground">
                <span className="text-amber-400">
                  {`"${API_URL}?number=4.82&method=smart"`}
                </span>
                ,
              </p>
              <p className="whitespace-nowrap pl-4 text-muted-foreground">
                {"{ "}headers: {"{ "}Authorization:{" "}
                <span className="text-amber-400">{'"Bearer ent_7x9p2"'}</span>
                {" } }"}
              </p>
              <p className="text-muted-foreground">{");"}</p>
              <p className="mt-2 whitespace-nowrap text-muted-foreground">
                <span className="text-primary">const</span>{" "}
                <span className="text-emerald-400">data</span> ={" "}
                <span className="text-primary">await</span> res.json();
              </p>
              <pre className="mt-2 text-emerald-400">
                {`// => {
//      status: "success",
//      data: { original_value: 4.82, rounded_value: 5, precision_loss: 0.18 },
//      metadata: { 
//        algorithm_used: "Smart Rounding™", 
//        computation_time_ms: 104.2,
//        is_integer: true 
//      }
//    }`}
              </pre>
            </div>
          </div>

          <div className="min-w-0 rounded-2xl border border-border/50 bg-card/20 p-6 md:p-8">
            <h3 className="text-lg font-bold text-foreground">
              Pro Tier: The Power of Choice
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Pass `?method=elevate` or `?method=settle` in your URL parameters.
              Because paying $49/mo means having the strict architectural
              freedom to explicitly tell your numbers exactly where to go.
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-border/50 bg-card/20 p-6 md:p-8">
            <h3 className="text-lg font-bold text-foreground">
              Actionable Precision Loss Analytics
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Don&apos;t just discard your fractions—track them. Our API returns
              exact precision loss metrics on every request, ensuring you know
              exactly how much quantitative data you are safely incinerating.
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-border/50 bg-card/20 p-6 md:col-span-3 md:p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Everything you need to round with confidence.
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Enterprise features included at every tier. Most of them are
                  just computationally intense, proprietary heuristics.
                </p>
              </div>
              <div className="grid w-full grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 md:w-auto md:grid-cols-3">
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
