import { dom } from '@/lib/dom'
import { config } from '@/config'
import { bus } from '@/lib/bus'

const getSrc = () =>
  `${config.get('etvasURL')}/embed/${config.get('locale', 'en')}/discover`

const createIframe = () => {
  const style = 'height: 100%;width: 100%;border:none;'

  return dom.createElement('iframe', {
    id: 'etvas-discover-iframe',
    style,
    src: getSrc()
  })
}

export const open = (placeholder, options) => {
  const { productCard, actionButton } = options

  const iframe = createIframe()
  const container = dom.getElement(placeholder)
  container.appendChild(iframe)

  if (productCard?.onDetailsClick) {
    bus.on('open-product-details', payload => {
      const exists = dom.getElement('#etvas-discover-iframe')
      if (!exists) {
        throw new Error('# Discover no longer in DOM')
      }
      productCard.onDetailsClick(payload)
    })
  }

  if (actionButton?.onUse) {
    bus.on('open-product-use', payload => {
      actionButton.onUse(payload)
    })
  }

  if (actionButton?.onPurchase) {
    bus.on('on-product-purchase', payload => {
      actionButton.onPurchase(payload)
    })
  }
}
