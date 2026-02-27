"use client";
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";
import { Loader2, Key, Check, Copy, Terminal } from "lucide-react";
import { generateTierToken } from "@/lib/keys";

function TokenToast({
  tier,
  onComplete,
}: {
  id: string | number;
  tier: "pro" | "enterprise";
  onComplete?: (token: string) => void;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const delay = Math.floor(Math.random() * 1500) + 500; // 0.5s to 2.0s
    const timer = setTimeout(() => {
      const generatedToken = generateTierToken(tier);
      setToken(generatedToken);
      if (onComplete) onComplete(generatedToken);
    }, delay);

    return () => clearTimeout(timer);
  }, [tier, onComplete]);

  const copyToken = useCallback(() => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [token]);

  if (!token) {
    return (
      <div className="flex w-full min-w-[320px] items-center gap-3 rounded-lg border border-border/50 bg-card p-4 shadow-lg backdrop-blur-md">
        <Loader2 className="size-4 animate-spin text-primary" />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">
            Authenticating...
          </span>
          <span className="text-xs text-muted-foreground">
            {tier === "enterprise"
              ? "Provisioning dedicated routing mesh..."
              : "Generating Pro authorization key..."}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-[320px] flex-col gap-3 rounded-lg border border-border/50 bg-card p-4 shadow-lg backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div
          className={`flex size-6 items-center justify-center rounded-full ${
            tier === "enterprise" ? "bg-amber-500/10" : "bg-primary/10"
          }`}
        >
          <Key
            className={`size-3 ${
              tier === "enterprise" ? "text-amber-500" : "text-primary"
            }`}
          />
        </div>
        <span className="text-sm font-medium text-foreground">
          {tier === "enterprise" ? "Enterprise" : "Pro"} Key Generated
        </span>
      </div>

      <div className="flex items-center justify-between rounded-md border border-border/30 bg-background/50 p-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <Terminal className="size-3 shrink-0 text-muted-foreground" />
          <span className="truncate font-mono text-xs text-muted-foreground">
            {token}
          </span>
        </div>
        <button
          onClick={copyToken}
          className="ml-2 flex shrink-0 items-center justify-center rounded bg-background p-1.5 hover:bg-muted"
        >
          {copied ? (
            <Check className="size-3 text-emerald-400" />
          ) : (
            <Copy className="size-3 text-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}

export function requestToken(
  tier: "pro" | "enterprise",
  onComplete?: (token: string) => void,
) {
  toast.custom(
    (id) => <TokenToast id={id} tier={tier} onComplete={onComplete} />,
    {
      duration: 6000,
    },
  );
}
