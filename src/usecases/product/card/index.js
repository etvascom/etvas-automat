import { dom } from '@/lib/dom'
import { bus } from '@/lib/bus'
import { config } from '@/config'

const src = (productId, queryString = null) =>
  `${config.get('etvasURL')}/embed/${config.get(
    'locale',
    'en'
  )}/product/${productId}${
    queryString
      ? `?${Object.keys(queryString)
          .map(key => `${key}=${queryString[key]}`)
          .join('&')}`
      : ''
  }`

const style = 'border:none;width:480px;height:240px;display:block;'

export const open = (
  productId,
  placeholder,
  options = {
    onDetailsClick: payload => {
      console.log('Product card clicked. Received:', payload)
    }
  }
) => {
  const el = dom.getElement(placeholder)
  if (!el) {
    console.error('Cannot find DOM node', placeholder)
    return
  }
  const id = `etvas-product-card-${productId}-iframe`
  const iframe = dom.createElement('iframe', { id, src: src(productId), style })
  const wrapper = dom.createElement('div', { innerHTML: '' })
  wrapper.appendChild(iframe)
  el.innerHTML = wrapper.innerHTML

  if (options?.onDetailsClick) {
    bus.on('open-product-details', payload => {
      const exists = dom.getElement(`#${id}`)
      if (!exists) {
        throw new Error('# Product card no longer in DOM')
      }
      if (payload?.productId === productId) {
        options.onDetailsClick(payload)
      }
    })
  }

  if (options?.onUse) {
    bus.on('open-product-use', payload => {
      if (payload?.productId === productId) {
        options.onUse(payload)
      }
    })
  }

  return true
}
