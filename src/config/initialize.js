import { defaults } from './defaults'
import { config } from './config'
import { createModal, closeAndDeleteModal } from './modal'
import { dom } from '@lib/dom'

const createIframe = (url, styles) => {
  const iframe = document.createElement('IFRAME')
  iframe.src = url
  iframe.style = styles || {}
  return iframe
}

const getMatches = async () => {
  return [
    { productId: '0f0a9141-eca1-4314-8552-f374ff4a8e1f', transactionId: '2' },
    { productId: '54327b79-6ed0-461b-b6c3-9c0901d74937', transactionId: '4' },
    { productId: '28646d37-7a52-4115-a85c-250f162933ff', transactionId: '5' },
    { productId: '54327b79-6ed0-461b-b6c3-9c0901d74937', transactionId: '6' }
  ]
}

export const initialize = function (options = {}) {
  if (config.get('__init')) {
    return true
  }

  config.load({
    __init: true,
    ...defaults,
    ...options
  })

  // open modal and append it to body
  createModal()

  // CONNECT BUTTON PRESSED
  function connect(event) {
    event.preventDefault()
    window.open(
      'http://localhost:3000/oidc-auth',
      'etvasAuth',
      'location=no,toolbar=false,resizable=no,scrollbars=false,status=false,width=10,height=10,left:0,top:0'
    )
    closeAndDeleteModal()
  }

  document.getElementById('etvas-connect').addEventListener('click', connect)

  document.querySelectorAll('.etvas-close').forEach(function (item) {
    item.addEventListener('click', closeAndDeleteModal)
  })

  const onEtvasMessage = async event => {
    const { data } = event
    if (data?.channel !== 'etvas-channel') {
      return
    }

    if (!event.data.error) {
      const matches = await getMatches(/*transations*/)
      matches.forEach(({ productId, transactionId }, idx) => {
        const el = document.getElementById(`transaction-${transactionId}`)
        const iframe = createIframe(
          // /embed/:lang/product/:pid
          `http://localhost:3000/embed/en/product/${productId}`,
          'border:none;width:480px;height:240px;display:block;margin:10px auto;'
        )
        el.appendChild(iframe)
        if (idx === 0) {
          // first one is slided
          el.style = 'display:block'
        }
      })
    }
  }

  window.removeEventListener('message', onEtvasMessage)
  window.addEventListener('message', onEtvasMessage)
}
