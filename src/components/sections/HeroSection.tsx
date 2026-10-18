import { useRef, type PointerEvent as ReactPointerEvent } from 'react'
import sourcingCoordination from '../../assets/hero-sourcing-coordination.webp'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function HeroSection() {
  const heroVisualRef = useRef<HTMLDivElement>(null)
  const handleHeroPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return
    const visual = heroVisualRef.current
    if (!visual || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 3
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -2
    visual.style.setProperty('--hero-tilt-x', `${x.toFixed(2)}deg`)
    visual.style.setProperty('--hero-tilt-y', `${y.toFixed(2)}deg`)
  }
  const handleHeroPointerLeave = () => {
    const visual = heroVisualRef.current
    visual?.style.setProperty('--hero-tilt-x', '0deg')
    visual?.style.setProperty('--hero-tilt-y', '0deg')
  }

  return <section id="home" className="hero" aria-label="Xian and Gray Industrial Supplies">
    <Container className="hero-grid">
      <div className="hero-copy">
        <p className="hero-eyebrow">Your Online Partner in Industrial Safety Solutions</p>
        <h1>Industrial supplies, sourced around the way you work.</h1>
        <p className="hero-descriptor">PPE, cleanroom, road-safety, facility and workplace essentials coordinated for businesses across the Philippines.</p>
        <div className="hero-ctas"><Button href="#contact" className="hero-button-primary">Request a quotation</Button><Button href="#products" variant="secondary" className="hero-button-secondary">Explore products</Button></div>
        <ul className="hero-proof" aria-label="Company highlights">
          <li><strong>8</strong><span>Supply categories</span></li>
          <li><strong>Sta. Rosa</strong><span>Laguna based</span></li>
          <li><strong>PH</strong><span>Business support</span></li>
        </ul>
      </div>
      <div ref={heroVisualRef} className="hero-visual" onPointerMove={handleHeroPointerMove} onPointerLeave={handleHeroPointerLeave}>
        <img className="hero-industry-scene" src={sourcingCoordination} alt="Sourcing coordinator connecting a client requirement with industrial safety, cleanroom and facility supply partners" width="1536" height="1024" fetchPriority="high" />
      </div>
    </Container>
  </section>
}
