/* Nardo AR — header (esconde ao rolar para baixo, volta ao subir) */

import { $ } from './utils.js'

export function initHeader(lenis) {
  const header = $('#header')
  if (!header) return

  let last = 0

  lenis.on('scroll', ({ scroll }) => {
    const down = scroll > last && scroll > 160
    const menuOpen = document.documentElement.classList.contains('menu-open')

    header.classList.toggle('is-scrolled', scroll > 40)

    if (down && !menuOpen) header.classList.add('is-hidden')
    else header.classList.remove('is-hidden')

    last = scroll
  })
}
