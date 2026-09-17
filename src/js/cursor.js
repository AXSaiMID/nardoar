/* Nardo AR — cursor personalizado (dot + anel com rótulos) */

import gsap from 'gsap'
import { $, isFinePointer } from './utils.js'

export function initCursor() {
  const cursor = $('#cursor')
  if (!cursor || !isFinePointer) return

  const dot = $('.cursor__dot', cursor)
  const ring = $('.cursor__ring', cursor)
  const label = $('.cursor__label', cursor)

  gsap.set([dot, ring], { x: -100, y: -100 })

  const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' })
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' })

  window.addEventListener(
    'mousemove',
    (e) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY })
      ringX(e.clientX)
      ringY(e.clientY)
      cursor.classList.add('is-on')
    },
    { passive: true }
  )

  document.addEventListener('mouseleave', () => cursor.classList.remove('is-on'))
  document.addEventListener('mouseenter', () => cursor.classList.add('is-on'))

  const HOVERABLE = 'a, button, [data-cursor], input, select, textarea, .card, .panel'

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(HOVERABLE)
    if (!target) {
      cursor.classList.remove('is-hover', 'is-label')
      return
    }
    const text = target.getAttribute('data-cursor')
    if (text) {
      label.textContent = text
      cursor.classList.add('is-label')
    } else {
      cursor.classList.remove('is-label')
      label.textContent = ''
    }
    cursor.classList.add('is-hover')
  })

  document.addEventListener('mousedown', () => cursor.classList.add('is-down'))
  document.addEventListener('mouseup', () => cursor.classList.remove('is-down'))
}
