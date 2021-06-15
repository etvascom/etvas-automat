import { dom } from '@/lib/dom'
import { config } from '@/config'
import { bus } from '@/lib/bus'
import { ssoAppend } from '@/lib/ssoAppend'
import { handleSSO } from '@/usecases/sso/handleSSO'

const getSrc = (params = {}, keys = []) => {
  const qs = keys
    .filter(key => params[key] !== undefined)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')
  return ssoAppend(
    `${config.get('etvasURL')}/embed/${config.get('locale', 'en')}/product/${
      params.productId
    }/details${qs ? `?${qs}` : ''}`
  )
}

const style = 'width:100%; border:none; display:block;'

export const open = async (placeholder, params, options) => {
  if (!params?.productId) {
    throw new Error('You must provide a product id in params')
  }
  const container = dom.getElement(placeholder)
  if (!container) {
    console.error('Cannot find container', container)
    return
  }

  await handleSSO(options)

  const id = `etvas-product-details-${params.productId}-iframe`
  const src = getSrc(params.productId, params, ['hideRating'])
  const iframe = dom.createElement('iframe', { id, src, style })

  if (!params?.append) {
    dom.clearElement(container)
  }

  container.appendChild(iframe)

  if (params.onAction && typeof params.onAction === 'function') {
    bus.on('open-product-use', payload => {
      if (payload?.productId === params.productId) {
        params.onAction({ ...payload, action: 'showProductUse' })
      }
      const exists = dom.getElement(`#${id}`)
      return exists ? true : '#off'
    })
    bus.on('on-product-purchase', payload => {
      if (payload?.productId === params.productId) {
        params.onAction({
          ...payload,
          action: 'showProductPurchase'
        })
      }
      const exists = dom.getElement(`#${id}`)
      return exists ? true : '#off'
    })
  }
}
