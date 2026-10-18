import { useState } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/sections/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { ProductsSection } from './components/sections/ProductsSection'
import { PartnershipsSection } from './components/sections/PartnershipsSection'
import { WhyChooseUsSection } from './components/sections/WhyChooseUsSection'
import { ContactSection } from './components/sections/ContactSection'
import { CatalogIntroSection } from './components/sections/CatalogIntroSection'
import { LayeredTextSection } from './components/sections/LayeredTextSection'
import { useScrollReveal } from './hooks/useScrollReveal'

export default function App() {
  const [category, setCategory] = useState('')
  useScrollReveal()
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navbar />
    <main id="main">
      <HeroSection /><CatalogIntroSection /><ProductsSection onSelect={setCategory} /><AboutSection />
      <WhyChooseUsSection /><PartnershipsSection />
      <ContactSection category={category} onCategoryChange={setCategory} />
    </main>
    <LayeredTextSection />
    <Footer onSelect={setCategory} />
  </>
}
