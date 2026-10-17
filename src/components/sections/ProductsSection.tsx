import { products } from '../../data/products'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { ProductCard } from '../ui/ProductCard'
import { Button } from '../ui/Button'
export function ProductsSection({ onSelect }: { onSelect: (category: string) => void }) {
  return <section id="products" className="section products-section"><Container>
    <div className="section-topline" data-reveal="up"><SectionHeading title="Products" /></div>
    <div className="products-grid">{products.map(product => <ProductCard key={product.id} product={product} />)}</div>
    <div className="portfolio-note" data-reveal="up"><p>Need something specific? Tell us what you’re sourcing.</p><Button href="#contact" variant="dark" onClick={() => onSelect('Other / sourcing inquiry')}>Talk to our team</Button></div>
  </Container></section>
}
