const testimonials = [
  {
    quote:
      "Before RaaS, we were rounding numbers by hand. Now our team can focus on what really matters: arguing about tabs vs. spaces.",
    name: "Chad Brogrammer",
    title: "VP of Rounding, Hooli",
    avatar: "CB",
  },
  {
    quote:
      "We replaced our entire 12-person rounding team with one API call. The ROI is literally infinite. I don't know what ROI means.",
    name: "Karen Manager",
    title: "Chief Decimal Officer",
    avatar: "KM",
  },
  {
    quote:
      "RaaS achieved what our 3-year digital transformation roadmap couldn't: rounding 4.5 to 5. Absolutely game-changing.",
    name: "Steve Synergy",
    title: "Head of Innovation Theater",
    avatar: "SS",
  },
  {
    quote:
      "I was skeptical at first, but after our rounding latency dropped from 0ms to 0.2ms, I knew we were on to something big.",
    name: "Dr. Decimal",
    title: "Rounding Scientist, MIT",
    avatar: "DD",
  },
];

export function Testimonials() {
  return (
    <section className="border-y border-border/30 bg-card/10 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Loved by engineers worldwide.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {"Don't just take our word for it. Take theirs. They signed NDAs."}
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-4 rounded-2xl border border-border/30 bg-card/20 p-8"
            >
              <p className="flex-1 text-sm leading-relaxed text-foreground/80">
                {'"'}
                {t.quote}
                {'"'}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
