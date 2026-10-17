import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
export function PartnershipsSection() {
  return <section id="partnerships" className="section partnerships-section"><Container className="partnership-grid">
    <div className="process-heading" data-reveal="up"><SectionHeading title="How we work">A straightforward path from requirement to coordinated next step.</SectionHeading><Button href="#contact">Start an inquiry</Button></div>
    <ol className="partnership-steps"><li data-reveal="up"><span>01</span><div><h3>Share the requirement</h3><p>Tell us the application, specifications, quantity and target timeline.</p></div></li><li data-reveal="up"><span>02</span><div><h3>Review suitable options</h3><p>We coordinate relevant products and clarify the details that affect selection.</p></div></li><li data-reveal="up"><span>03</span><div><h3>Confirm the next step</h3><p>Move forward with a clear record of the agreed requirement.</p></div></li></ol>
  </Container></section>
}
