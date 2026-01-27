import { BarChart3, Globe, Lock, Zap, QrCode, Users } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate short links instantly with our optimized infrastructure. No waiting, no delays.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "Track clicks, geographic data, referrers, and device types with real-time dashboards.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "Enterprise-grade security with SSL encryption and optional password protection.",
  },
  {
    icon: Globe,
    title: "Custom Domains",
    description: "Use your own branded domain for a professional, trustworthy appearance.",
  },
  {
    icon: QrCode,
    title: "QR Code Generation",
    description: "Automatically generate QR codes for every link to bridge online and offline.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Invite team members, share links, and manage permissions effortlessly.",
  },
]

export const FeaturesSection = () => {
  return (
    <section className="py-24 px-4" aria-labelledby="features-heading">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h2 id="features-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Everything you need to manage links
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Powerful features designed for individuals and teams who want more than just short URLs.
          </p>
        </header>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <li key={feature.title}>
              <article className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-colors duration-300 h-full">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-foreground" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
