const footerLinks = {
  Product: [
    "API Docs",
    "Playground",
    "Changelog",
    "Uptime Status",
    "Rounding Blog",
  ],
  Company: ["About", "Careers (We're Hiring!)", "Press Kit", "Brand Assets"],
  Legal: [
    "Terms of Rounding",
    "Privacy Policy",
    "Cookie Rounding Policy",
    "GDPR Compliance",
  ],
  Community: ["Discord", "GitHub", "Stack Overflow", "Rounding Conf 2026"],
};

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-card/10 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                <span className="font-mono text-sm font-bold text-primary-foreground">
                  R
                </span>
              </div>
              <span className="font-mono text-lg font-bold text-foreground">
                RaaS
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Enterprise-grade decimal management for the modern web.
            </p>
            <p className="mt-4 font-mono text-xs text-muted-foreground/50">
              v4.2.0
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            {"\u00A9"} 2026 RaaS, Inc. All rights reserved. No decimals were
            harmed in the making of this product.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>System Status:</span>
            <div className="size-2 rounded-full bg-emerald-500" />
            <span className="text-emerald-400">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
