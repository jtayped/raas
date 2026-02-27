"use client"
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { requestToken } from "../toasts";

export function Cta() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          Ready to stop rounding
          <br />
          <span className="bg-linear-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            like a caveman?
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Join 10,000+ engineers who have outsourced their basic arithmetic to
          the cloud. Your decimals deserve better.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            onClick={() => requestToken("pro")}
            className="gap-2 bg-primary px-8 text-primary-foreground shadow-[0_0_40px_rgba(56,139,253,0.4)] hover:shadow-[0_0_60px_rgba(56,139,253,0.6)]"
          >
            Get Started for Free
            <ArrowRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-border/50 px-8 text-foreground"
          >
            Schedule a Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
