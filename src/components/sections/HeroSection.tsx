import logo from '../../assets/xg-logo.webp'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function HeroSection() {
  return <section id="home" className="hero" aria-label="Xian and Gray Industrial Supplies">
    <Container className="hero-brand-stage">
      <div className="hero-lockup" data-reveal="up">
        <img className="hero-logo" src={logo} alt="XG — Xian & Gray" width="453" height="337" fetchPriority="high" />
        <div className="hero-lockup-copy"><strong>XIAN &amp; GRAY</strong><span>INDUSTRIAL SUPPLIES</span></div>
      </div>
      <p className="hero-descriptor" data-reveal="up">Industrial, cleanroom, safety and workplace supplies.</p>
      <div className="hero-ctas" data-reveal="up"><Button href="#products">View products</Button><Button href="#contact" variant="secondary">Start an inquiry</Button></div>
    </Container>
  </section>
}
