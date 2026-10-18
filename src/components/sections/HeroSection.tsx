import logo from '../../assets/xg-logo.webp'
import { AnimatedCharacters } from '../AnimatedCharacters'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function HeroSection() {
  return <section id="home" className="hero" aria-label="Xian and Gray Industrial Supplies">
    <Container className="hero-brand-stage">
      <div className="hero-lockup">
        <img className="hero-logo" src={logo} alt="XG — Xian & Gray" width="453" height="337" fetchPriority="high" />
        <div className="hero-lockup-copy"><strong>XIAN &amp; GRAY</strong><span>INDUSTRIAL SUPPLIES</span></div>
      </div>
      <div className="hero-characters-mid-anchor">
        <AnimatedCharacters />
      </div>
      <p className="hero-descriptor">Industrial, cleanroom, safety and workplace supplies.</p>
      <div className="hero-ctas"><Button href="#products" variant="dark" className="hero-button-primary">View products</Button><Button href="#contact" variant="dark" className="hero-button-secondary">Start an inquiry</Button></div>
    </Container>
  </section>
}
