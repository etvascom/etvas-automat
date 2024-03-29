import { dom } from '@/lib/dom'
import { config } from '@/config'
import { bus } from '@/lib/bus'
import { ssoAppend } from '@/lib/ssoAppend'
import { handleSSO } from '@/usecases/sso/handleSSO'
import { createQueryString } from '@/lib/createQueryString'

const getSrc = (params = {}) => {
  return ssoAppend(
    `${config.get('etvasURL')}/embed/${config.get('locale', 'en')}/product/${
      params.productId
    }/details${createQueryString(params)}`
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
  const src = getSrc(params)
  const iframe = dom.createElement('iframe', { id, src, style })

  if (!params?.append) {
    dom.clearElement(container)
  }

  container.appendChild(iframe)

  if (params.onAction && typeof params.onAction === 'function') {
    bus.on('open-product-use', payload => {
      const exists = dom.getElement(`#${id}`)
      if (!exists) {
        return '#off'
      }
      if (payload?.productId === params.productId) {
        params.onAction({ ...payload, action: 'showProductUse' })
      }
      return true
    })
    bus.on('on-product-purchase', payload => {
      const exists = dom.getElement(`#${id}`)
      if (!exists) {
        return '#off'
      }
      if (payload?.productId === params.productId) {
        params.onAction({
          ...payload,
          action: 'showProductPurchase'
        })
      }
      return true
    })
  }
}
