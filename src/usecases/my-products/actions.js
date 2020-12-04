import { dom } from '@/lib/dom'
import { config } from '@/config'
import { bus } from '@/lib/bus'

const getSrc = () =>
  `${config.get('etvasURL')}/embed/${config.get('locale', 'en')}/my-products`

const createIframe = () => {
  const style = 'height: 100%;width: 100%;border:none;'

  return dom.createElement('iframe', {
    id: 'etvas-my-products-iframe',
    style,
    src: getSrc()
  })
}

export const open = (placeholder, options) => {
  const { productCard, onDiscoverClick, actionButton } = options

  const container = dom.getElement(placeholder)
  const iframe = createIframe()
  container.appendChild(iframe)

  if (productCard?.onDetailsClick) {
    bus.on('open-product-details', payload => {
      const exists = dom.getElement('#etvas-my-products-iframe')
      if (!exists) {
        throw new Error('# Discover no longer in DOM')
      }
      productCard.onDetailsClick(payload)
    })
  }

  if (onDiscoverClick) {
    bus.on('navigate-to', payload => {
      const { destination } = payload || {}
      if (destination === 'discover') {
        onDiscoverClick()
      }
      return '#nonce'
    })
  }

  if (actionButton?.onPurchase) {
    bus.on('on-product-purchase', payload => {
      actionButton.onPurchase(payload)
    })
  }

  if (actionButton?.onUse) {
    bus.on('open-product-use', payload => {
      actionButton.onUse(payload)
    })
  }
}
