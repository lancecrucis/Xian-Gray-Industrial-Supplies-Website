import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
export function AboutSection() {
  return <section id="about" className="section about-section"><Container className="about-grid">
    <div className="about-intro" data-reveal="up"><SectionHeading title="About" /><p>Based in Sta. Rosa, Laguna</p></div>
    <div className="about-copy" data-reveal="up">
      <p className="lead">One sourcing partner for the supplies that keep business moving.</p>
      <div className="about-detail"><p>Xian &amp; Gray supports businesses across the Philippines with industrial, cleanroom, safety, office and facility essentials.</p><p>Every inquiry starts with the application, specifications, quantity and timeline so suitable options can be coordinated clearly.</p></div>
      <div className="about-facts" aria-label="Company overview"><div><span>Scope</span><strong>Eight supply categories</strong></div><div><span>Approach</span><strong>Requirement-led sourcing</strong></div><div><span>Location</span><strong>Sta. Rosa, Laguna</strong></div></div>
    </div>
  </Container></section>
}
