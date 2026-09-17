/* Nardo AR — Lenis (scroll suave) integrado ao GSAP */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export function createLenis() {
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  return lenis
}

/** Rola suavemente até um alvo (seletor ou elemento) */
export function scrollToTarget(lenis, target, offset = 0) {
  lenis.scrollTo(target, {
    offset,
    duration: 1.5,
    easing: (t) => 1 - Math.pow(1 - t, 4),
  })
}
