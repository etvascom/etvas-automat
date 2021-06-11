import { dom } from '@/lib/dom'
import { config } from '@/config'
import { bus } from '@/lib/bus'
import { ssoAppend } from '@/lib/ssoAppend'

const getSrc = (productId, options = {}, keys = []) => {
  const qs = keys
    .filter(key => options[key] !== undefined)
    .map(key => `${key}=${encodeURIComponent(options[key])}`)
    .join('&')
  return ssoAppend(
    `${config.get('etvasURL')}/embed/${config.get(
      'locale',
      'en'
    )}/product/${productId}/details${qs ? `?${qs}` : ''}`
  )
}

const style = 'width:100%; border:none; display:block;'

export const open = (productId, placeholder, options) => {
  if (!productId) {
    console.error('You must provide a product id in options')
    return
  }

  const id = `etvas-product-details-${productId}-iframe`
  const src = getSrc(productId, options, ['hideRating'])
  const iframe = dom.createElement('iframe', { id, src, style })
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
    bus.on('on-product-purchase', payload =>
      options.actionButton.onPurchase(payload)
    )
  }
}
