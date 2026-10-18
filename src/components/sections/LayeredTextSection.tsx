import { Container } from '../ui/Container'
import { LayeredText } from '../ui/LayeredText'

export function LayeredTextSection() {
  return <section className="layered-text-section" aria-labelledby="values-title">
    <Container>
      <h2 id="values-title" className="layered-text-title" data-reveal="up">Built on the details that matter.</h2>
      <LayeredText fontSize="clamp(38px, 5.6vw, 86px)" fontSizeMd="28px" lineHeight={60} lineHeightMd={32} />
    </Container>
  </section>
}
