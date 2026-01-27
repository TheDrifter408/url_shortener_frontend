import { ArrowRight, Check, Copy, Link2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

export function HeroSection() {
  const [url, setUrl] = useState("")
  const [shortenedUrl, setShortenedUrl] = useState("")
  const [copied, setCopied] = useState(false)

  const handleShorten = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (url) {
      setShortenedUrl(`snip.io/${Math.random().toString(36).substring(2, 8)}`)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-200 h-100 bg-accent/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-border bg-card/50 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
          <span className="text-sm text-muted-foreground">Trusted by 50,000+ users worldwide</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight mb-6">
          Shorten URLs.
          <br />
          <span className="text-muted-foreground">Amplify reach.</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty leading-relaxed">
          Transform long, unwieldy links into clean, trackable URLs in seconds.
          Get detailed analytics and take control of your digital presence.
        </p>

        <form onSubmit={handleShorten} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8">
          <div className="relative flex-1">
            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
            <Input
              type="url"
              placeholder="Paste your long URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-14 pl-12 pr-4 bg-card border-border text-foreground placeholder:text-muted-foreground rounded-xl text-base"
              aria-label="URL to shorten"
              required
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-14 px-8 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-base"
          >
            Shorten
            <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
          </Button>
        </form>

        {shortenedUrl && (
          <div className="flex items-center justify-center gap-3 p-4 bg-card border border-border rounded-xl max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
            <span className="text-foreground font-medium truncate">{shortenedUrl}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="shrink-0 hover:bg-secondary"
              aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </Button>
          </div>
        )}

        <p className="mt-6 text-sm text-muted-foreground">
          No registration required. Free forever for basic use.
        </p>
      </div>
    </section>
  )
}