import { dom } from '@/lib/dom'
import { config } from '@/config'
import { bus } from '@/lib/bus'
import { ssoAppend } from '@/lib/ssoAppend'
import { handleSSO } from '@/usecases/sso/handleSSO'

const getSrc = () =>
  ssoAppend(
    `${config.get('etvasURL')}/embed/${config.get('locale', 'en')}/my-products`
  )

const createIframe = () => {
  const style = 'width: 100%;border:none;'

  return dom.createElement('iframe', {
    id: 'etvas-my-products-iframe',
    style,
    src: getSrc()
  })
}

export const open = async (placeholder, params, options) => {
  await handleSSO(options)

  const container = dom.getElement(placeholder)
  if (!params?.append) {
    dom.clearElement(container)
  }
  const iframe = createIframe()
  container.appendChild(iframe)

  if (params?.onAction) {
    bus.on('open-product-details', payload => {
      const exists = dom.getElement('#etvas-my-products-iframe')
      if (exists) {
        params.onAction({ ...payload, action: 'openProductDetails' })
        return true
      }
      return '#off'
    })
    bus.on('navigate-to', payload => {
      const exists = dom.getElement('#etvas-my-products-iframe')
      if (exists) {
        const { destination } = payload || {}
        if (destination === 'discover') {
          params.onAction({ action: 'openDiscover' })
        }
        return true
      }
      return '#off'
    })
    bus.on('on-product-purchase', payload => {
      const exists = dom.getElement('#etvas-my-products-iframe')
      if (exists) {
        params.onAction({ ...payload, action: 'openProductPurchase' })
        return true
      }
      return '#off'
    })
    bus.on('open-product-use', payload => {
      const exists = dom.getElement('#etvas-my-products-iframe')
      if (exists) {
        params.onAction({ ...payload, action: 'openProductUse' })
        return true
      }
      return '#off'
    })
  }
}
