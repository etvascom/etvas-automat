import { defaults } from './defaults'
import { config } from './config'

// install the listeners
import '@/lib/bus'

export const initialize = function (options = {}) {
  if (config.get('__init')) {
    return true
  }

  config.load({
    __init: true,
    ...defaults,
    ...options
  })

<<<<<<< HEAD
  // const onEtvasMessage = async event => {
  //   const { data } = event
  //   if (data?.channel !== 'etvas-channel') {
  //     return
  //   }

  //   if (event.data.action === 'open-details') {
  //     openDetails(event.data.pId)
  //     return
  //   }

  //   if (!event.data.error) {
  //     const matches = await getMatches(/*transations*/)
  //     matches.forEach(({ productId, transactionId }, idx) => {
  //       const el = dom.getElement(`#transaction-${transactionId}`)
  //       const locale = config.get('locale', 'en')
  //       const iframe = dom.createElement('iframe', {
  //         src: `${process.env.ETVAS_BASE_URL}/embed/${locale}/product/${productId}`,
  //         style:
  //           'border:none;width:480px;height:240px;display:block;margin:10px auto;'
  //       })
  //       el.appendChild(iframe)
  //       if (idx === 0) {
  //         // first one is slided
  //         el.style = 'display:block'
  //       }
  //     })
  //   }
  // }
=======
  // open modal and append it to body
  createModal()

  // CONNECT BUTTON PRESSED
  function connect(event) {
    event.preventDefault()
    window.open(
      `${process.env.ETVAS_BASE_URL}/oidc-auth`,
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

    if (event.data.action === 'open-details') {
      openDetails(event.data.pId)
      return
    }

    if (!event.data.error) {
      const matches = await getMatches(/*transations*/)
      matches.forEach(({ productId, transactionId }, idx) => {
        const el = document.getElementById(`transaction-${transactionId}`)
        const locale = config.get('locale', 'en')
        const iframe = createIframe(
          // /embed/:lang/product/:pid
          `${process.env.ETVAS_BASE_URL}/embed/${locale}/product/${productId}/?cache=${Date.now()}`,
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
>>>>>>> 8895e8344d2ee80c4609210972af45cc77a90ebb
}
