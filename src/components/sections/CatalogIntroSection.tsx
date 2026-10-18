import { useEffect, useState } from 'react'
import { Container } from '../ui/Container'

export function CatalogIntroSection() {
  const statements = ['Genuine Service', 'Honest Work', 'Quality You Can Trust.']
  const [activeStatement, setActiveStatement] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStatement((current) => (current + 1) % statements.length)
    }, 2500)

    return () => window.clearInterval(interval)
  }, [statements.length])

  return <section className="catalog-intro" aria-label="Company values">
    <div className="catalog-intro-frame">
      <div className="catalog-grid-layer" aria-hidden="true" />
      <Container className="catalog-intro-content">
        <div className="catalog-copy-layer">
          <div className="catalog-values" aria-live="polite" aria-atomic="true">
            <span key={activeStatement} className="catalog-value">{statements[activeStatement]}</span>
          </div>
        </div>
      </Container>
    </div>
  </section>
}
