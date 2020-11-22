import { config } from '@/config'
import { dom } from '@/lib/dom'

import { css, contents } from './ui/html'

const ID = 'etvas-modal-connect'

const etvasAuth = () => {
  dom.openWindow(`${config.get('etvasURL')}/oidc-auth`, {
    target: 'etvasAuth',
    features:
      'location=no,toolbar=false,resizable=no,scrollbars=false,status=false,width=10,height=10,left:0,top:0'
  })
  dom.removeElement(`#${ID}`)
}

const etvasLogout = () => {
  dom.openWindow(`${config.get('etvasURL')}/oidc-auth?logout=1`, {
    target: 'etvasAuth',
    features:
      'location=no,toolbar=false,resizable=no,scrollbars=false,status=false,width=10,height=10,left:0,top:0'
  })
}

const destroy = () => {
  config.clear('__init')
  dom.removeElement(`#${ID}`)
}

export const open = () => {
  if (dom.getElement(`#${ID}`)) {
    return
  }
  const modal = dom.createElement('div', {
    id: ID,
    style: css.card,
    innerHTML: contents
  })

  dom.appendChild(modal)

  dom.listen('.etvas-connect-close', 'click', event => {
    event.preventDefault()
    destroy()
  })

  dom.listen('#etvas-connect', 'click', event => {
    event.preventDefault()
    etvasAuth()
  })

  return modal
}

export const disconnect = () => {
  if (!config.get('__logged')) {
    return
  }
  etvasLogout()
}
