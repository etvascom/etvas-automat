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
}
