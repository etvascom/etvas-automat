import { dom } from '@/lib/dom'
import { bus } from '@/lib/bus'
import { config } from '@/config'

const getSrc = (productId, options = {}, keys = []) => {
  const qs = keys
    .filter(key => options[key] !== undefined)
    .map(key => `${key}=${encodeURIComponent(options[key])}`)
    .join('&')
  return `${config.get('etvasURL')}/embed/${config.get(
    'locale',
    'en'
  )}/product/${productId}${qs ? `?${qs}` : ''}`
}

const style = 'border:none;width:480px;height:240px;display:block;'

export const open = (
  productId,
  placeholder,
  options = {
    onDetailsClick: payload => {
      console.log('Product card clicked. Received:', payload)
    },
    hidePreview: false,
    showSeeMore: 'link'
  }
) => {
  const el = dom.getElement(placeholder)
  if (!el) {
    console.error('Cannot find DOM node', placeholder)
    return
  }
  if (!options?.append) {
    dom.clearElement(el)
  }

  const id = `etvas-product-card-${productId}-iframe`
  const src = getSrc(productId, options, [
    'hideRating',
    'showSeeMore',
    'seeMoreText'
  ])
  const iframe = dom.createElement('iframe', { id, src, style })
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
