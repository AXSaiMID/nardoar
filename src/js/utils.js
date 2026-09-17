/* Nardo AR — utilitários */

export const prefersReduced =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isFinePointer =
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

export const $ = (sel, ctx = document) => ctx.querySelector(sel)
export const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)]

/** Divide o texto de um elemento em palavras envoltas em <span class="w"> */
export function splitWords(el) {
  const text = el.textContent.trim().replace(/\s+/g, ' ')
  el.textContent = ''
  const frag = document.createDocumentFragment()
  const words = text.split(' ')
  words.forEach((word, i) => {
    const span = document.createElement('span')
    span.className = 'w'
    span.textContent = word
    frag.appendChild(span)
    if (i < words.length - 1) frag.appendChild(document.createTextNode(' '))
  })
  el.appendChild(frag)
  return $$('.w', el)
}
