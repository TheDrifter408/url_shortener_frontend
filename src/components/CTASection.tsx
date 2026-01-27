import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

export const CTASection = () => {
  return (
    <section className="py-24 px-4" aria-labelledby="cta-heading">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative p-12 md:p-16 rounded-3xl bg-card border border-border overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-accent/10 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10">
            <h2 id="cta-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Ready to simplify your links?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 text-pretty leading-relaxed">
              Join thousands of marketers, developers, and creators who trust Snip for their link management needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="h-14 px-8 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-base"
              >
                Get started for free
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 rounded-xl border-border text-foreground hover:bg-secondary font-medium text-base bg-transparent"
              >
                View pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}