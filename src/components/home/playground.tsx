"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Lock,
  Copy,
  Check,
  Loader2,
  Key,
  Unlock,
  X,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { generateTierToken } from "@/lib/keys";

export function ApiPlayground() {
  const [number, setNumber] = useState("4.8");
  const [method, setMethod] = useState("floor");
  const [token, setToken] = useState("");
  const [result, setResult] = useState<undefined | object>(undefined);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRound = useCallback(async () => {
    setError(null);
    setResult(undefined);

    if (!number || isNaN(Number(number))) {
      setError("Please enter a valid number.");
      return;
    }

    setLoading(true);

    try {
      const url = new URL("/api/round", window.location.origin);
      url.searchParams.append("number", number);
      if (method !== "round") {
        url.searchParams.append("method", method);
      }

      const headers: HeadersInit = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(url.toString(), { headers });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "An unknown error occurred.");
      } else {
        // Just save the exact API response
        setResult(data);
      }
    } catch (err) {
      setError("Failed to connect to the rounding matrix.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token, number, method]);

  const copyResult = useCallback(() => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [result]);

  return (
    <section id="playground" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/5 text-primary"
          >
            Interactive Demo
          </Badge>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            API Playground
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Test our enterprise rounding engine in real-time. No credit card
            required.
          </p>
        </div>

        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-border/50 bg-card/50 px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-red-500/60" />
              <div className="size-3 rounded-full bg-yellow-500/60" />
              <div className="size-3 rounded-full bg-green-500/60" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              raas-playground.ts
            </span>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-muted-foreground">Connected</span>
            </div>
          </div>

          <div className="grid gap-0 md:grid-cols-2">
            {/* Left - Controls */}
            <div className="flex flex-col gap-6 border-b border-border/50 p-8 md:border-b-0 md:border-r">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Input Number
                </label>
                <Input
                  type="text"
                  placeholder="4.8"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="border-border/50 bg-background/50 font-mono text-foreground"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Rounding Method
                </label>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger className="w-full border-border/50 bg-background/50 font-mono text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="floor">
                      <span className="font-mono">Flooring</span>
                    </SelectItem>
                    <SelectItem value="ceil">
                      <span className="flex items-center gap-2 font-mono">
                        Ceiling
                        <Lock className="size-3 text-muted-foreground" />
                      </span>
                    </SelectItem>
                    <SelectItem value="round">
                      <span className="flex items-center gap-2 font-mono">
                        Smart Round™
                        <Lock className="size-3 text-muted-foreground" />
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Bearer Token
                </label>
                <div className="flex flex-col gap-3">
                  <Input
                    type="text"
                    placeholder="Leave empty for Free tier..."
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="border-border/50 bg-background/50 font-mono text-xs text-foreground"
                  />
                </div>
              </div>

              <ButtonGroup className="w-full">
                <Button
                  variant="outline"
                  className="flex-1 border-border/50 text-xs text-primary hover:bg-primary/10 hover:text-primary"
                  onClick={() => setToken(generateTierToken("pro"))}
                >
                  <Unlock className="mr-2 size-3" />
                  Generate Pro Key
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0 border-border/50 text-muted-foreground"
                    >
                      <ChevronDown className="size-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-50">
                    <DropdownMenuItem
                      onClick={() => setToken(generateTierToken("enterprise"))}
                      className="cursor-pointer text-xs focus:bg-amber-500/10 focus:text-amber-500"
                    >
                      <Key className="mr-2 size-3" />
                      Generate Enterprise Key
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setToken("")}
                      className="cursor-pointer text-xs focus:bg-destructive/10 focus:text-destructive"
                    >
                      <X className="mr-2 size-3" />
                      Clear Token (Free Tier)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ButtonGroup>
              <Button
                onClick={handleRound}
                disabled={loading}
                className="mt-2 w-full bg-primary text-primary-foreground shadow-[0_0_20px_rgba(56,139,253,0.3)] hover:shadow-[0_0_30px_rgba(56,139,253,0.5)]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Rounding...
                  </>
                ) : (
                  "Execute Round"
                )}
              </Button>
            </div>

            {/* Right - Response */}
            <div className="flex flex-col bg-background/30 p-8">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Response
                </span>
                {result && (
                  <button
                    onClick={copyResult}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {copied ? (
                      <Check className="size-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </button>
                )}
              </div>

              <div className="flex-1 rounded-lg border border-border/30 bg-background/50 p-4 font-mono text-sm">
                {error && (
                  <pre className="overflow-x-auto text-xs leading-6 text-red-400">
                    {JSON.stringify({ error, status: 401 }, null, 2)}
                  </pre>
                )}

                {loading && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Loader2 className="size-4 animate-spin text-primary" />
                    <span className="text-xs">Processing via API...</span>
                  </div>
                )}

                {result && !loading && (
                  <pre className="overflow-x-auto text-xs leading-6 text-emerald-400">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                )}

                {!result && !loading && !error && (
                  <p className="text-muted-foreground/50">
                    {"// Response will appear here..."}
                  </p>
                )}
              </div>

              {result && !loading && (
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>HTTP 200 OK</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
