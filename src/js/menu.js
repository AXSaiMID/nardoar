/* Nardo AR — menu fullscreen com links gigantes */

import gsap from 'gsap'
import { $, $$, prefersReduced } from './utils.js'
import { scrollToTarget } from './smooth-scroll.js'

export function initMenu(lenis) {
  const root = document.documentElement
  const menu = $('#menu')
  const burger = $('#burger')
  if (!menu || !burger) return { close: () => {} }

  const links = $$('.menu__link-txt', menu)
  const nums = $$('.menu__link-num', menu)
  let open = false

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'expo.out' },
  })

  if (prefersReduced) {
    tl.set(menu, { clipPath: 'inset(0% 0% 0% 0%)' })
      .set(links, { yPercent: 0 })
      .set([...nums, ...$$('.menu__meta > *', menu)], { opacity: 1 })
  } else {
    tl.set(menu, { pointerEvents: 'auto' })
      .fromTo(
        menu,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85, ease: 'expo.inOut' }
      )
      .fromTo(
        links,
        { yPercent: 140 },
        { yPercent: 0, duration: 0.9, stagger: 0.06 },
        '-=0.4'
      )
      .fromTo(
        nums,
        { opacity: 0, x: -14 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.06 },
        '-=0.75'
      )
      .fromTo(
        $$('.menu__meta > *', menu),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 },
        '-=0.7'
      )
  }

  function toggle(force) {
    open = typeof force === 'boolean' ? force : !open
    root.classList.toggle('menu-open', open)
    burger.classList.toggle('is-active', open)
    burger.setAttribute('aria-expanded', String(open))
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu')
    menu.setAttribute('aria-hidden', String(!open))

    if (open) {
      tl.timeScale(1).play()
      lenis.stop()
    } else {
      tl.timeScale(1.5).reverse()
      lenis.start()
    }
  }

  burger.addEventListener('click', () => toggle())

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) toggle(false)
  })

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const hash = link.getAttribute('href')
      const wasOpen = open
      if (wasOpen) toggle(false)
      gsap.delayedCall(wasOpen ? 0.65 : 0, () => scrollToTarget(lenis, hash))
    })
  })

  return { close: () => open && toggle(false) }
}
