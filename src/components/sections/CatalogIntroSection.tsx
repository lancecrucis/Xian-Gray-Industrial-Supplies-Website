import { Container } from '../ui/Container'

export function CatalogIntroSection() {
  return <section className="catalog-intro" data-parallax-scene aria-labelledby="catalog-intro-title">
    <div className="catalog-intro-frame">
      <div className="catalog-grid-layer" data-parallax="220" aria-hidden="true" />
      <div className="catalog-ghost-word" data-parallax="-320" data-parallax-axis="x" aria-hidden="true">SUPPLY</div>
      <Container className="catalog-intro-content">
        <div className="catalog-copy-layer" data-parallax="-90">
          <p data-reveal="up">Supply overview</p>
          <h2 id="catalog-intro-title" data-reveal="up"><span>Eight categories.</span><span>One point of inquiry.</span></h2>
        </div>
        <div className="catalog-rail" data-parallax="280" aria-hidden="true"><span /><span /><span /></div>
      </Container>
    </div>
  </section>
}
