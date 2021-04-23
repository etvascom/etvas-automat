import { dom } from '@/lib/dom'
import { config } from '@/config'
import { bus } from '@/lib/bus'

export const open = (productId, placeholder, options) => {
  if (!productId) {
    console.error('You must provide a product id in options')
    return
  }

  const locale = config.get('locale', 'en')

  const iframe = dom.createElement('iframe', {
    style: 'width: 100%;border:none;',
    id: `etvas-product-details-${productId}-iframe`,
    src: `${config.get(
      'etvasURL'
    )}/embed/${locale}/product/${productId}/details`
  })

  const container = dom.getElement(placeholder)

  if (!options?.append) {
    dom.clearElement(container)
  }

  container.appendChild(iframe)

  if (options?.actionButton?.onUse) {
    bus.on('open-product-use', payload => {
      if (payload?.productId === productId) {
        options.actionButton.onUse(payload)
      }
    })
  }

  if (options?.actionButton?.onPurchase) {
    bus.on('on-product-purchase', payload => {
      const oidc = config.get('oidc')
      options.actionButton.onPurchase({ oidc, ...payload })
    })
  }
}
