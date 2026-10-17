import { useEffect, useRef, useState } from 'react'
import { navigation } from '../../data/company'
import { Brand } from '../ui/Brand'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
    }
    const closeOutside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOutside)
    return () => { document.removeEventListener('keydown', closeOnEscape); document.removeEventListener('pointerdown', closeOutside) }
  }, [open])
  return <header className="site-header" ref={header}><Container className="header-inner">
    <Brand />
    <button className="menu-toggle" ref={toggle} type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}><span>{open ? 'Close' : 'Menu'}</span><span aria-hidden="true">{open ? '×' : '☰'}</span></button>
    <nav id="primary-navigation" aria-label="Main navigation" className={open ? 'main-nav is-open' : 'main-nav'}>
      {navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      <Button href="#contact" onClick={() => setOpen(false)}>Contact us</Button>
    </nav>
  </Container></header>
}
