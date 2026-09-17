/* Nardo AR — preloader cinematográfico
   Contador sincronizado + cortina de saída, liberando o hero em seguida. */

import gsap from 'gsap'
import { $, $$, prefersReduced } from './utils.js'

const MIN_TIME = 2.15
const MAX_WAIT = 4.5

export function initPreloader(lenis, onReveal) {
  const pre = $('#preloader')

  if (!pre || prefersReduced) {
    pre?.remove()
    onReveal(true)
    return
  }

  lenis.stop()

  const counter = $('.preloader__counter', pre)
  const fill = $('.preloader__bar-fill', pre)
  const chars = $$('.pl-ch', pre)

  // Entrada do logotipo
  gsap.set(chars, { yPercent: 130 })
  gsap.to(chars, {
    yPercent: 0,
    duration: 1.05,
    ease: 'expo.out',
    stagger: 0.05,
    delay: 0.15,
  })
  gsap.fromTo(
    '.preloader__tagline',
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.55 }
  )

  // Contador
  const state = { v: 0 }
  const count = gsap.to(state, {
    v: 100,
    duration: MIN_TIME,
    ease: 'power2.inOut',
    onUpdate() {
      counter.textContent = String(Math.round(state.v)).padStart(3, '0')
      gsap.set(fill, { scaleX: state.v / 100 })
    },
  })

  const loaded = new Promise((resolve) => {
    if (document.readyState === 'complete') resolve()
    else window.addEventListener('load', resolve, { once: true })
  })
  const fonts = document.fonts ? document.fonts.ready : Promise.resolve()
  const timeout = new Promise((resolve) => setTimeout(resolve, MAX_WAIT * 1000))

  Promise.race([Promise.all([count.then(), loaded, fonts]), timeout]).then(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'expo.inOut' },
      onComplete() {
        pre.remove()
        lenis.start()
        onReveal(false)
      },
    })

    tl.to(['.preloader__brand', '.preloader__tagline'], {
      yPercent: -60,
      opacity: 0,
      duration: 0.55,
      ease: 'power2.in',
      stagger: 0.05,
    })
      .to(['.preloader__counter', '.preloader__bar'], { opacity: 0, duration: 0.4 }, '<')
      .to(pre, { yPercent: -100, duration: 1.05 }, '-=0.15')
  })
}
