import { dom } from '@/lib/dom'
import { config } from '@/config'
import { bus } from '@/lib/bus'

const getSrc = () =>
  `${config.get('etvasURL')}/embed/${config.get('locale', 'en')}/discover`

const createIframe = () => {
  const style = 'height: 100%;width: 100%;border:none;'
  return dom.createElement('iframe', {
    id: 'discover-iframe',
    style,
    src: getSrc()
  })
}

export const open = (placeholder, options) => {
  const { productCard } = options

  const iframe = createIframe()
  const container = dom.getElement(placeholder)
  container.appendChild(iframe)

  if (productCard?.onDetailsClick) {
    bus.on('open-product-details', payload => {
      const exists = dom.getElement('#discover-iframe')
      if (!exists) {
        throw new Error('# Discover no longer in DOM')
      }
      productCard.onDetailsClick(payload)
    })
  }
}
