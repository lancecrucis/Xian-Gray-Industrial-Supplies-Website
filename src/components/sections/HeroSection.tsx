import { useEffect, useRef } from 'react'
import sourcingCoordination from '../../assets/hero-sourcing-coordination.webp'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function HeroSection() {
  const visual = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = visual.current
    if (!element) return

    let frame = 0

    const reset = () => {
      window.cancelAnimationFrame(frame)
      element.style.transform = ''
    }

    const tilt = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || window.innerWidth <= 680) return

      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect()
        const horizontal = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2)
        const vertical = (event.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2)
        element.style.transform = `perspective(1000px) rotateX(${vertical * 10}deg) rotateY(${horizontal * -10}deg) scale(1.02)`
      })
    }

    document.addEventListener('pointermove', tilt, { passive: true })
    document.documentElement.addEventListener('pointerleave', reset)
    window.addEventListener('blur', reset)

    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('pointermove', tilt)
      document.documentElement.removeEventListener('pointerleave', reset)
      window.removeEventListener('blur', reset)
    }
  }, [])

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
      <div className="hero-visual" ref={visual}>
        <img className="hero-industry-scene" src={sourcingCoordination} alt="Sourcing coordinator connecting a client requirement with industrial safety, cleanroom and facility supply partners" width="1536" height="1024" fetchPriority="high" />
      </div>
    </Container>
  </section>
}
