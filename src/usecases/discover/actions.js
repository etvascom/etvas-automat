import { dom } from '@/lib/dom'
import { config } from '@/config'
import { bus } from '@/lib/bus'
import { showPurchase } from '../purchase'

const getSrc = () =>
  `${config.get('etvasURL')}/embed/${config.get('locale', 'en')}/discover`

export const open = (placeholder, options) => {
  const style = 'height: 100%;width: 100%;border:none;'

  const iframe = dom.createElement('iframe', {
    id: 'etvas-discover-iframe',
    style,
    src: getSrc()
  })

  const container = dom.getElement(placeholder)
  container.appendChild(iframe)

  if (options?.onClick) {
    bus.on('open-product-details', payload => {
      const exists = dom.getElement('#etvas-discover-iframe')
      if (!exists) {
        throw new Error('# Discover no longer in DOM')
      }
      options.onClick(payload)
    })
  }

  if (options?.onUse) {
    bus.on('open-product-use', payload => {
      options.onUse(payload)
    })
  }

  if (options?.onPurchase) {
    bus.on('on-product-purchase', payload => {
      options.onPurchase(payload)
    })
  }
}
