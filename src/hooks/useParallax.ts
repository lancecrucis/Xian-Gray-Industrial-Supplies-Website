import { useEffect } from 'react'

export function useParallax() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches && !import.meta.env.DEV
    if (reducedMotion || elements.length === 0) return

    let frame = 0
    const update = () => {
      frame = 0
      elements.forEach(element => {
        const scene = element.closest<HTMLElement>('[data-parallax-scene]')
        if (!scene) return
        const rect = scene.getBoundingClientRect()
        const stickyTop = window.innerWidth <= 900 ? 76 : 88
        const scrollTravel = Math.max(1, rect.height - window.innerHeight + stickyTop)
        const progress = Math.max(0, Math.min(1, (stickyTop - rect.top) / scrollTravel))
        const distance = Number(element.dataset.parallax ?? 0)
        const offset = (progress - .5) * distance
        const axis = element.dataset.parallaxAxis ?? 'y'
        element.style.setProperty('--parallax-x', axis === 'x' ? `${offset.toFixed(2)}px` : '0px')
        element.style.setProperty('--parallax-y', axis === 'y' ? `${offset.toFixed(2)}px` : '0px')
      })
    }
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])
}
