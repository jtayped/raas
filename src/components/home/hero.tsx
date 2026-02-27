"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { API_URL } from "@/constants";
import { requestToken } from "../toasts";

export default function HeroSection() {
  return (
    <section className="flex min-h-screen items-center justify-center overflow-hidden pt-32">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        {/* Adjusted mobile font size from 4xl to 3xl/sm:text-5xl to handle long words */}
        <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-7xl">
          Enterprise-Grade
          <br />
          <span className="bg-linear-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Decimal Management.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-sm sm:text-md leading-relaxed text-muted-foreground md:text-xl">
          Stop leaving your integers to chance.{" "}
          <span className="text-foreground">RaaS (Rounding-as-a-Service)</span>{" "}
          provides secure, blazingly fast, cloud-native number rounding for
          modern engineering teams.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button
            size="lg"
            onClick={() => requestToken("pro")}
            className="gap-2 bg-primary px-8 text-primary-foreground shadow-[0_0_30px_rgba(56,139,253,0.4)] transition-shadow hover:shadow-[0_0_50px_rgba(56,139,253,0.6)]"
          >
            Get API Key
            <ArrowRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 border-border/50 px-8 text-foreground"
          >
            See an example
          </Button>
        </div>

        <div className="mt-16 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-emerald-500" />
            <span>99.999% Uptime SLA</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-emerald-500" />
            <span>SOC 2 Type II</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-emerald-500" />
            <span>{"< 0.3ms Latency"}</span>
          </div>
        </div>

        {/* Terminal preview */}
        <div className="mt-5 md:mt-12 w-full max-w-2xl overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
            <div className="size-3 rounded-full bg-red-500/60" />
            <div className="size-3 rounded-full bg-yellow-500/60" />
            <div className="size-3 rounded-full bg-green-500/60" />
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              terminal
            </span>
          </div>
          <div className="p-6 text-left font-mono text-sm">
            <p className="text-muted-foreground">
              <span className="text-emerald-400">$</span>{" "}
              {`curl -X GET ${API_URL}?number=3.65 \\`}
            </p>
            <p className="pl-4 text-muted-foreground">
              {'-H "Authorization: Bearer pro_123..." \\'}
            </p>
            <p className="mt-4 text-emerald-400">
              {'{"original_value":3.65,"rounded_value":3}'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
