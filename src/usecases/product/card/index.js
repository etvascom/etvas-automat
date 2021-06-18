import { dom } from '@/lib/dom'
import { bus } from '@/lib/bus'
import { config } from '@/config'
import { ssoAppend } from '@/lib/ssoAppend'
import { handleSSO } from '@/usecases/sso/handleSSO'

const getSrc = (params, keys = []) => {
  const qs = keys
    .filter(key => params[key] !== undefined)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')
  return ssoAppend(
    `${config.get('etvasURL')}/embed/${config.get('locale', 'de')}/product/${
      params.productId
    }${qs ? `?${qs}` : ''}`
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
  const src = getSrc(params, ['hideRating', 'showSeeMore', 'seeMoreText'])
  const iframe = dom.createElement('iframe', { id, src, style })
  const wrapper = dom.createElement('div', { innerHTML: '' })
  wrapper.appendChild(iframe)
  el.innerHTML = wrapper.innerHTML

  if (params?.onAction) {
    bus.on('open-product-details', payload => {
      const exists = dom.getElement(`#${id}`)
      if (exists && payload?.productId === params.productId) {
        params.onAction({ ...payload, action: 'openProductDetails' })
        return true
      }
      return exists ? true : '#off'
    })
    bus.on('open-product-use', payload => {
      const exists = dom.getElement(`#${id}`)
      if (exists && payload?.productId === params.productId) {
        params.onAction({ ...payload, action: 'openProductUse' })
        return
      }
      return exists ? true : '#off'
    })
  }

  return true
}
