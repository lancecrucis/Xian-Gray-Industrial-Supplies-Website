import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import supplyScopeArt from '../../assets/why-supply-scope-character.webp'
import selectionProcessArt from '../../assets/why-selection-process-character.webp'
import localCoordinationArt from '../../assets/why-local-coordination-character.webp'

const benefits = [
  { title: 'Supply scope', description: 'Eight categories covering industrial, cleanroom, safety and everyday workplace requirements.', image: supplyScopeArt, alt: 'A sourcing professional considering safety, cleanroom, facility and workplace supply categories', width: 1223, height: 1286 },
  { title: 'Selection process', description: 'Product options are shaped around the application, specification, quantity and timeline.', image: selectionProcessArt, alt: 'A sourcing professional comparing options and selecting a suitable industrial product', width: 1327, height: 1186 },
  { title: 'Local coordination', description: 'Inquiry support based in Sta. Rosa, Laguna for businesses across the Philippines.', image: localCoordinationArt, alt: 'A local coordinator managing supply routes and delivery points across the Philippines', width: 1206, height: 1305 },
]
export function WhyChooseUsSection() {
  return <section className="section why-section"><Container><div className="why-heading"><SectionHeading title="Why Xian &amp; Gray" /><p>Practical sourcing built around what the work actually requires.</p></div><div className="benefits-grid">{benefits.map((benefit, index) => <article className="benefit" key={benefit.title}><div className="benefit-art"><span>0{index + 1}</span><img src={benefit.image} alt={benefit.alt} width={benefit.width} height={benefit.height} loading="lazy" decoding="async" /></div><h3>{benefit.title}</h3><p>{benefit.description}</p></article>)}</div></Container></section>
}
