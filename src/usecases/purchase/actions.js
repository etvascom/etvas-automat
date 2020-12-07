import { dom } from '@/lib/dom'
import { config } from '@/config'

const getSrc = pId =>
  `${config.get('etvasURL')}/embed/${config.get(
    'locale',
    'en'
  )}/purchase/${pId}`

export const open = (placeholder, options) => {
  const style = 'height: 100%;width: 100%;border:none;'

  const iframe = dom.createElement('iframe', {
    id: 'etvas-product-purchase-iframe',
    style,
    src: getSrc(options.productId)
  })

  const container = dom.getElement(placeholder)
  if (!options?.append) {
    dom.clearElement(container)
  }
  container.appendChild(iframe)
}
