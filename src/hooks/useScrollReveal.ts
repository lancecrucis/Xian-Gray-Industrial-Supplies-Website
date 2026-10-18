import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const root = document.documentElement
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    // Keep the interaction model identical in development and production.
    // The site's motion is intentionally part of the visual direction, so the
    // preview class is applied in both environments instead of being DEV-only.
    root.classList.add('motion-preview')

    root.classList.add('motion-ready')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.14, rootMargin: '0px 0px -12% 0px' })

    elements.forEach(element => observer.observe(element))
    return () => {
      observer.disconnect()
      root.classList.remove('motion-ready')
      root.classList.remove('motion-preview')
    }
  }, [])
}
