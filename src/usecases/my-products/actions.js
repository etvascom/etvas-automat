import { dom } from '@/lib/dom'
import { config } from '@/config'
import { bus } from '@/lib/bus'

const getSrc = () =>
  `${config.get('etvasURL')}/embed/${config.get('locale', 'en')}/my-products`

const createIframe = () => {
  const style = 'width: 100%;border:none;'

  return dom.createElement('iframe', {
    id: 'etvas-my-products-iframe',
    style,
    src: getSrc()
  })
}

export const open = (placeholder, options) => {
  const container = dom.getElement(placeholder)
  if (!options?.append) {
    dom.clearElement(container)
  }
  const iframe = createIframe()
  container.appendChild(iframe)

  if (options?.productCard?.onDetailsClick) {
    bus.on('open-product-details', payload => {
      const exists = dom.getElement('#etvas-my-products-iframe')
      if (!exists) {
        throw new Error('# Discover no longer in DOM')
      }
      options.productCard.onDetailsClick(payload)
    })
  }

  if (options?.onDiscoverClick) {
    bus.on('navigate-to', payload => {
      const { destination } = payload || {}
      if (destination === 'discover') {
        options.onDiscoverClick()
      }
      return '#nonce'
    })
  }

  if (options?.actionButton?.onPurchase) {
    bus.on('on-product-purchase', payload => {
      const oidc = config.get('oidc')
      options.actionButton.onPurchase({ oidc, ...payload })
    })
  }

  if (options?.actionButton?.onUse) {
    bus.on('open-product-use', payload => {
      options.actionButton.onUse(payload)
    })
  }
}
