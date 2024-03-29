import { dom } from '@/lib/dom'
import { bus } from '@/lib/bus'
import { config } from '@/config'
import { ssoAppend } from '@/lib/ssoAppend'
import { handleSSO } from '@/usecases/sso/handleSSO'
import { createQueryString } from '@/lib/createQueryString'

const getSrc = params =>
  ssoAppend(
    `${config.get('etvasURL')}/embed/${config.get('locale', 'en')}/purchase/${
      params.productId
    }${createQueryString(params)}`
  )

export const open = async (placeholder, params, options) => {
  await handleSSO(options)

  const style = 'width: 100%;border:none;'

  const id = 'etvas-product-purchase-iframe'
  const iframe = dom.createElement('iframe', {
    id,
    style,
    src: getSrc(params)
  })

  if (params.onAction) {
    bus.on('open-product-use', payload => {
      const exists = dom.getElement(`#${id}`)
      if (!exists) {
        return '#off'
      }
      params.onAction({ ...payload, action: 'openProductUse' })
      return true
    })
    bus.on('on-purchase-cancelled', payload => {
      const exists = dom.getElement(`#${id}`)
      if (!exists) {
        return '#off'
      }
      params.onAction({ ...payload, action: 'purchaseCancelled' })
      return true
    })
  }

  const container = dom.getElement(placeholder)
  if (!params?.append) {
    dom.clearElement(container)
  }
  container.appendChild(iframe)
}
