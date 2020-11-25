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
  element,
  options = {
    onDetailsClick: payload => {
      console.log('Product card clicked. Received:', payload)
    }
  }
) => {
  const { onDetailsClick } = options
  const el = dom.getElement(element)
  if (!el) {
    console.error('Cannot find DOM node', element)
    return
  }
  const id = `product-card-${productId}-iframe`
  const iframe = dom.createElement('iframe', { id, src: src(productId), style })
  const placeholder = dom.createElement('div', { innerHTML: '' })
  placeholder.appendChild(iframe)
  el.innerHTML = placeholder.innerHTML

  if (onDetailsClick) {
    bus.on('open-product-details', payload => {
      const exists = dom.getElement(`#${id}`)
      if (!exists) {
        throw new Error('# Product card no longer in DOM')
      }
      if (payload?.productId === productId) {
        onDetailsClick(payload)
      }
    })
  }

  return true
}
