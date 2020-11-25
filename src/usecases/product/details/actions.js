import { dom } from '@/lib/dom'
import { config } from '@/config'

export const open = (placeholder, options) => {
  const { productId } = options

  const locale = config.get('locale', 'en')

  const iframe = dom.createElement('iframe', {
    style: 'height: 100%;width: 100%;border:none;',
    id: `product-details-${productId}-iframe`,
    src: `${config.get(
      'etvasURL'
    )}/embed/${locale}/product/${productId}/details`
  })

  const container = dom.getElement(placeholder)
  container.appendChild(iframe)
}
