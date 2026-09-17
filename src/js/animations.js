/* Nardo AR — animações de scroll (GSAP ScrollTrigger)
   Reveals, máscaras de linha, palavras scrub, contadores,
   cards empilhados, seção horizontal do grupo e parallax. */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { $, $$, splitWords, prefersReduced } from './utils.js'

gsap.registerPlugin(ScrollTrigger)

/* ── Hero: estados iniciais + intro pós-preloader ─────────── */
export function setHeroInitial() {
  if (prefersReduced) return
  gsap.set('.hero__line-inner', { yPercent: 115 })
  gsap.set(['.hero__eyebrow', '.hero__sub', '.hero__ctas'], { opacity: 0, y: 34 })
  gsap.set(['.hero__scroll', '.hero__marquee'], { opacity: 0 })
  gsap.set('.header', { opacity: 0 })
}

export function heroIntro(instant) {
  if (prefersReduced || instant) {
    gsap.set(
      [
        '.hero__line-inner',
        '.hero__eyebrow',
        '.hero__sub',
        '.hero__ctas',
        '.hero__scroll',
        '.hero__marquee',
        '.header',
      ],
      { clearProps: 'all' }
    )
    return
  }

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

  tl.to('.hero__bg-img', { scale: 1.05, duration: 2.6, ease: 'power2.out' }, 0)
    .to('.hero__line-inner', { yPercent: 0, duration: 1.35, stagger: 0.1 }, 0.1)
    .to('.header', { opacity: 1, duration: 1 }, 0.55)
    .to('.hero__eyebrow', { opacity: 1, y: 0, duration: 1 }, 0.5)
    .to('.hero__sub', { opacity: 1, y: 0, duration: 1 }, 0.85)
    .to('.hero__ctas', { opacity: 1, y: 0, duration: 1 }, 1)
    .to(['.hero__scroll', '.hero__marquee'], { opacity: 1, duration: 1.1 }, 1.2)
    .set('.header', { clearProps: 'opacity' }, 1.7)
}

/* ── Todas as animações de scroll ──────────────────────────── */
export function initScrollAnimations() {
  if (prefersReduced) return

  /* Barra de progresso */
  gsap.to('.progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
  })

  /* Hero: parallax de saída */
  gsap.to('.hero__bg', {
    yPercent: 16,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })
  gsap.to('.hero__content', {
    yPercent: -10,
    opacity: 0.25,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })

  /* Reveals genéricos (fade-up) */
  $$('[data-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { y: 42, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.15,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    )
  })

  /* Títulos com máscara de linha */
  $$('[data-lines]').forEach((el) => {
    const inners = $$('.rl__inner', el)
    if (!inners.length) return
    gsap.set(inners, { yPercent: 115 })
    ScrollTrigger.create({
      trigger: el,
      start: 'top 86%',
      once: true,
      onEnter: () =>
        gsap.to(inners, {
          yPercent: 0,
          duration: 1.25,
          ease: 'expo.out',
          stagger: 0.09,
        }),
    })
  })

  /* Manifesto: palavras que acendem conforme o scroll */
  const manifesto = $('[data-words]')
  if (manifesto) {
    const words = splitWords(manifesto)
    gsap.fromTo(
      words,
      { opacity: 0.13 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.06,
        scrollTrigger: {
          trigger: manifesto,
          start: 'top 80%',
          end: 'bottom 42%',
          scrub: true,
        },
      }
    )
  }

  /* Contadores */
  $$('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count)
    const state = { v: 0 }
    gsap.to(state, {
      v: end,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate: () => {
        el.textContent = Math.round(state.v)
      },
    })
  })

  /* Cards empilhados: o card de baixo "cobre" o de cima */
  const cards = $$('.card')
  cards.forEach((card, i) => {
    if (i === cards.length - 1) return
    const next = cards[i + 1]
    gsap.fromTo(
      card,
      { scale: 1, opacity: 1, filter: 'brightness(1)' },
      {
        scale: 0.93,
        opacity: 0.55,
        filter: 'brightness(0.55)',
        transformOrigin: 'center top',
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: next,
          start: 'top bottom',
          end: 'top top+=140',
          scrub: true,
        },
      }
    )
  })

  /* Parallax das mídias dos cards */
  $$('.card__media img').forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -7 },
      {
        yPercent: 7,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.card'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )
  })

  /* Parallax genérico [data-parallax] */
  $$('[data-parallax] img').forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('[data-parallax]'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )
  })

  /* ── Grupo: seção horizontal pinada (desktop) ── */
  const mm = gsap.matchMedia()

  mm.add('(min-width: 861px)', () => {
    const track = $('.grupo__track')
    const pin = $('.grupo__pin')
    if (!track || !pin) return

    const getAmount = () => track.scrollWidth - pin.clientWidth

    const scrollTween = gsap.to(track, {
      x: () => -getAmount(),
      ease: 'none',
      scrollTrigger: {
        trigger: '.grupo',
        start: 'top top',
        end: () => '+=' + getAmount() * 1.05,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    /* Parallax interno dos painéis durante o scroll horizontal */
    $$('.panel__media img', track).forEach((img) => {
      gsap.fromTo(
        img,
        { xPercent: -7 },
        {
          xPercent: 7,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('.panel'),
            containerAnimation: scrollTween,
            start: 'left right',
            end: 'right left',
            scrub: true,
          },
        }
      )
    })

    /* Barra de progresso do grupo */
    const progressFill = $('.grupo__progress-fill')
    if (progressFill) {
      gsap.to(progressFill, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.grupo',
          start: 'top top',
          end: () => '+=' + getAmount() * 1.05,
          scrub: true,
        },
      })
    }

    return () => {
      gsap.set(track, { clearProps: 'x' })
    }
  })

  /* Refresh após o carregamento das imagens */
  window.addEventListener('load', () => ScrollTrigger.refresh())
}
