import { dom } from '@/lib/dom'
import { bus } from '@/lib/bus'
import { config } from '@/config'
import { ssoAppend } from '@/lib/ssoAppend'
import { handleSSO } from '@/usecases/sso/handleSSO'
import { createQueryString } from '@/lib/createQueryString'

const getSrc = params => {
  return ssoAppend(
    `${config.get('etvasURL')}/embed/${config.get('locale', 'de')}/product/${
      params.productId
    }${createQueryString(params)}`
  )
}

const style = 'border:none;width:480px;height:240px;display:block;'

const _defaultParams = {
  onAction: payload => {
    console.log('Product card clicked. Received:', payload)
  },
  hideRating: false,
  showSeeMore: 'link'
}

export const open = async (placeholder, params, options) => {
  if (!params.productId) {
    throw new Error('Params must contain a productId')
  }

  await handleSSO(options)

  params = {
    ..._defaultParams,
    ...params
  }

  const el = dom.getElement(placeholder)
  if (!el) {
    console.error('Cannot find DOM node', placeholder)
    return
  }
  if (!params?.append) {
    dom.clearElement(el)
  }

  const id = `etvas-product-card-${params.productId}-iframe`
  const src = getSrc(params)
  const iframe = dom.createElement('iframe', { id, src, style })
  const wrapper = dom.createElement('div', { innerHTML: '' })
  wrapper.appendChild(iframe)
  el.innerHTML = wrapper.innerHTML

  if (params?.onAction) {
    bus.on('open-product-details', payload => {
      const exists = dom.getElement(`#${id}`)
      if (!exists) {
        return '#off'
      }
      if (payload?.productId === params.productId) {
        params.onAction({ ...payload, action: 'openProductDetails' })
      }
      return true
    })
    bus.on('open-product-use', payload => {
      const exists = dom.getElement(`#${id}`)
      if (!exists) {
        return '#off'
      }
      if (payload?.productId === params.productId) {
        params.onAction({ ...payload, action: 'openProductUse' })
      }
      return true
    })
  }

  return true
}
