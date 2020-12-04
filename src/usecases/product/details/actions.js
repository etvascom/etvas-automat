import { dom } from '@/lib/dom'
import { config } from '@/config'
import { bus } from '@/lib/bus'

export const open = (productId, placeholder, options) => {
  const { actionButton } = options
  const locale = config.get('locale', 'en')

  const iframe = dom.createElement('iframe', {
    style: 'height: 100%;width: 100%;border:none;',
    id: `etvas-product-details-${productId}-iframe`,
    src: `${config.get(
      'etvasURL'
    )}/embed/${locale}/product/${productId}/details`
  })

  const container = dom.getElement(placeholder)
  container.appendChild(iframe)

  if (actionButton?.onUse) {
    bus.on('open-product-use', payload => {
      if (payload?.productId === productId) {
        actionButton.onUse(payload)
      }
    })
  }
}
