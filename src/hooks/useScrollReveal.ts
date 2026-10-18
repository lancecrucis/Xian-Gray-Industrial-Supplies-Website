import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const root = document.documentElement
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches && !import.meta.env.DEV

    if (import.meta.env.DEV) root.classList.add('motion-preview')

    if (reducedMotion) {
      elements.forEach(element => element.classList.add('is-visible'))
      return () => root.classList.remove('motion-preview')
    }

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
