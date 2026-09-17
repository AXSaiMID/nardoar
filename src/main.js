/* ═══════════════════════════════════════════════════════════
   NARDO AR — main.js
   Orquestra: Lenis, preloader, cursor, header, menu,
   animações de scroll, magnéticos, âncoras e formulário
   ═══════════════════════════════════════════════════════════ */

import './css/base.css'
import './css/components.css'
import './css/sections.css'

import gsap from 'gsap'
import { $, $$, isFinePointer, prefersReduced } from './js/utils.js'
import { createLenis, scrollToTarget } from './js/smooth-scroll.js'
import { initPreloader } from './js/preloader.js'
import { initCursor } from './js/cursor.js'
import { initHeader } from './js/header.js'
import { initMenu } from './js/menu.js'
import { initScrollAnimations, setHeroInitial, heroIntro } from './js/animations.js'
import { initForm } from './js/form.js'

const lenis = createLenis()

/** Um módulo com problema não pode derrubar o site inteiro */
const safe = (label, fn) => {
  try {
    fn()
  } catch (err) {
    console.error(`[Nardo Ar] falha em ${label}:`, err)
  }
}

safe('cursor', initCursor)
safe('header', () => initHeader(lenis))
safe('menu', () => initMenu(lenis))
safe('form', initForm)
safe('hero:initial', setHeroInitial)
safe('animações', initScrollAnimations)
safe('preloader', () => initPreloader(lenis, (instant) => heroIntro(instant)))

/* ── Botões magnéticos ─────────────────────────────────────── */
if (isFinePointer && !prefersReduced) {
  $$('.magnetic').forEach((el) => {
    const strength = 0.32
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - rect.left - rect.width / 2
      const relY = e.clientY - rect.top - rect.height / 2
      gsap.to(el, {
        x: relX * strength,
        y: relY * strength,
        duration: 0.5,
        ease: 'power3.out',
      })
    })
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    })
  })
}

/* ── Âncoras suaves (menos os do menu, que têm tratamento próprio) ── */
$$('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    if (e.defaultPrevented) return
    const hash = a.getAttribute('href')
    if (hash.length > 1 && $(hash)) {
      e.preventDefault()
      scrollToTarget(lenis, hash)
    }
  })
})

/* ── Voltar ao topo ────────────────────────────────────────── */
$('#toTop')?.addEventListener('click', () => scrollToTarget(lenis, 0))

/* ── Ano dinâmico no rodapé ────────────────────────────────── */
const ano = $('#ano')
if (ano) ano.textContent = new Date().getFullYear()
