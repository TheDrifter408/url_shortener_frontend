export const StatsSection = () => {
  const stats = [
    { value: "2B+", label: "Links shortened" },
    { value: "50K+", label: "Active users" },
    { value: "99.9%", label: "Uptime" },
    { value: "150ms", label: "Avg. redirect time" },
  ]

  return (
    <section className="py-20 px-4 border-y border-border bg-card/30" aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">Platform Statistics</h2>
      <div className="max-w-6xl mx-auto">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <li key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2">
                {stat.value}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}