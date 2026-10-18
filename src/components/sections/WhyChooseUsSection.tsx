import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
const benefits = [
  ['Supply scope', 'Eight categories covering industrial, cleanroom, safety and everyday workplace requirements.'],
  ['Selection process', 'Product options are shaped around the application, specification, quantity and timeline.'],
  ['Local coordination', 'Inquiry support based in Sta. Rosa, Laguna for businesses across the Philippines.'],
]
export function WhyChooseUsSection() {
  return <section className="section why-section"><Container><div className="why-heading"><SectionHeading title="Why Xian &amp; Gray" /><p>Practical sourcing built around what the work actually requires.</p></div><div className="benefits-grid">{benefits.map(([title, description], index) => <article className="benefit" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></Container></section>
}
