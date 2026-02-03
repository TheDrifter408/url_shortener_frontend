import { CTASection } from '@/components/CTASection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/HeroSection'
import { StatsSection } from '@/components/StatsSection'
import { createFileRoute } from '@tanstack/react-router'

const Index = () => {
  return (
    <div className="flex flex-col">
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  )
}

export const Route = createFileRoute('/_public/')({
  component: Index,
});
