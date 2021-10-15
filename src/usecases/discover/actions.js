import { dom } from '@/lib/dom'
import { config } from '@/config'
import { bus } from '@/lib/bus'
import { ssoAppend } from '@/lib/ssoAppend'
import { handleSSO } from '@/usecases/sso/handleSSO'

const getSrc = () =>
  ssoAppend(
    `${config.get('etvasURL')}/embed/${config.get('locale', 'en')}/discover`
  )

const createIframe = id => {
  const style = 'height: 100%;width: 100%;border:none;'

  return dom.createElement('iframe', {
    id,
    style,
    src: getSrc()
  })
}

export const open = async (placeholder, params, options) => {
  await handleSSO(options)
  const container = dom.getElement(placeholder)
  if (!container) {
    console.error('Cannot find DOM element', placeholder)
  }

  const id = 'etvas-discover-iframe'
  const iframe = createIframe(id)

  if (!params?.append) {
    dom.clearElement(container)
  }

  container.appendChild(iframe)

  if (params?.onAction && typeof params.onAction === 'function') {
    bus.on('open-product-details', payload => {
      const exists = dom.getElement(`#${id}`)
      if (!exists) {
        return '#off'
      }
      params.onAction({ ...payload, action: 'openProductDetails' })
      return true
    })
    bus.on('open-product-use', payload => {
      const exists = dom.getElement(`#${id}`)
      if (!exists) {
        return '#off'
      }
      params.onAction({ ...payload, action: 'openProductUse' })
      return true
    })
    bus.on('on-product-purchase', payload => {
      const exists = dom.getElement(`#${id}`)
      if (!exists) {
        return '#off'
      }
      params.onAction({ ...payload, action: 'openProductPurchase' })
      return true
    })
  }
}
