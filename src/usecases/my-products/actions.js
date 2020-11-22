import { dom } from '@/lib/dom'
import { config } from '@/config'
import { bus } from '@/lib/bus'

const getSrc = () =>
  `${config.get('etvasURL')}/embed/${config.get('locale', 'en')}/my-products`

export const open = (placeholder, options) => {
  const style = 'height: 100%;width: 100%;border:none;'

  const iframe = dom.createElement('iframe', {
    id: 'my-products-iframe',
    style,
    src: getSrc()
  })

  const container = dom.getElement(placeholder)
  container.appendChild(iframe)

  if (options?.onClick) {
    bus.on('open-product-details', payload => {
      const exists = dom.getElement('#my-products-iframe')
      if (!exists) {
        throw new Error('# Discover no longer in DOM')
      }
      options.onClick(payload)
    })
  }

  if (options?.onDiscover) {
    bus.on('navigate-to', payload => {
      const { destination } = payload || {}
      if (destination === 'discover') {
        options.onDiscover()
      }
      return '#nonce'
    })
  }

  bus.on('resize-embedded-my-products', payload => {
    if (!payload?.height) {
      return
    }
    iframe.style.height = payload.height
  })
}
