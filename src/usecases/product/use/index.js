import { dom } from '@/lib/dom'
import { config } from '@/config'

export const open = (productId, placeholder) => {
  const locale = config.get('locale', 'en')

  const iframe = dom.createElement('iframe', {
    style: 'height: 100%;width: 100%;border:none;',
    id: `etvas-product-use-${productId}-iframe`,
    src: `${config.get('etvasURL')}/embed/${locale}/product/${productId}/use`
  })

  const container = dom.getElement(placeholder)
  container.appendChild(iframe)
}