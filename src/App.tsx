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
import { useScrollReveal } from './hooks/useScrollReveal'
import { useParallax } from './hooks/useParallax'

export default function App() {
  const [category, setCategory] = useState('')
  useScrollReveal()
  useParallax()
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navbar />
    <main id="main">
      <HeroSection /><CatalogIntroSection /><ProductsSection onSelect={setCategory} /><AboutSection />
      <WhyChooseUsSection /><PartnershipsSection />
      <ContactSection category={category} onCategoryChange={setCategory} />
    </main>
    <Footer onSelect={setCategory} />
  </>
}
