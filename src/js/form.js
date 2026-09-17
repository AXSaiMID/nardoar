/* Nardo AR — formulário que abre o WhatsApp com a mensagem pronta */

import { $ } from './utils.js'

const WHATSAPP = '5544991082460'

export function initForm() {
  const form = $('#form')
  if (!form) return

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const nome = $('#f-nome', form).value.trim()
    const servico = $('#f-servico', form).value
    const mensagem = $('#f-msg', form).value.trim()

    if (!nome) {
      $('#f-nome', form).focus()
      return
    }

    const linhas = [
      `Olá! Meu nome é ${nome}.`,
      `Tenho interesse em: ${servico}.`,
    ]
    if (mensagem) linhas.push(mensagem)
    linhas.push('— Mensagem enviada pelo site Nardo Ar')

    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
      linhas.join('\n')
    )}`

    window.open(url, '_blank', 'noopener')
  })
}
