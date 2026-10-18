import type { products } from '../../data/products'
export function ProductCard({ product }: { product: (typeof products)[number] }) {
  return <article className="product-card"><div className="product-card-image-wrap"><img className="product-card-image" src={product.image} alt={`${product.name} product assortment`} width="900" height="900" decoding="async" /></div><div className="product-card-body"><div className="product-card-top"><span>{product.tag}</span></div><h3>{product.name}</h3><p>{product.description}</p></div></article>
}
