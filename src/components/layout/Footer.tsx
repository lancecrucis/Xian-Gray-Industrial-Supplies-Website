import { company, navigation } from '../../data/company'
import { products } from '../../data/products'
import { Brand } from '../ui/Brand'
import { Container } from '../ui/Container'
export function Footer({ onSelect }: { onSelect: (category: string) => void }) {
  return <footer className="site-footer"><Container>
    <div className="footer-grid" data-reveal="up"><div className="footer-brand"><Brand /><p>Industrial essentials.<br />Thoughtful sourcing.<br />Partnerships built to last.</p><span className="footer-country">Sta. Rosa, Laguna · Philippines</span></div>
    <div><h2>Explore</h2><nav aria-label="Footer navigation">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav></div>
    <div><h2>Our products</h2><nav aria-label="Product shortcuts">{[products[0], products[1], products[2], products[4]].map(product => <a key={product.id} href="#contact" onClick={() => onSelect(product.name)}>{product.name}</a>)}<a href="#products">View all products</a></nav></div>
    <div className="footer-contact"><h2>Let’s connect</h2><a href="#contact" aria-label="Open the inquiry form">{company.email}</a><address>{company.address}</address><a className="footer-quote" href="#contact">Contact us</a></div></div>
    <div className="footer-meta" data-reveal="up"><span>© {new Date().getFullYear()} Xian & Gray Industrial Supplies. All rights reserved.</span><a href="#home">Back to top</a></div>
  </Container></footer>
}
