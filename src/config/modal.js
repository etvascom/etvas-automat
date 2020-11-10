import { modal, css } from './modalHTML'
import { dom } from '@lib/dom'
import { config } from './config'

export const createModal = () => {
  if (document.getElementById('etvas_modal')) {
    return
  }
  const etvas_modal = document.createElement('DIV')

  etvas_modal.id = 'etvas-link'
  etvas_modal.style = css.cardLink
  etvas_modal.innerHTML = modal

  dom.body.appendChild(etvas_modal)
}

export const closeAndDeleteModal = () => {
  config.clear('__init')

  const elem = document.getElementById('etvas-link')
  elem.parentNode.removeChild(elem)
}
