import { dom } from '@/lib/dom'
import { bus } from '@/lib/bus'
import { config } from '@/config'
import { ssoAppend } from '@/lib/ssoAppend'
import { handleSSO } from '@/usecases/sso/handleSSO'

const getSrc = pId =>
  ssoAppend(
    `${config.get('etvasURL')}/embed/${config.get(
      'locale',
      'en'
    )}/purchase/${pId}`
  )

export const open = async (placeholder, params, options) => {
  await handleSSO(options)

  const style = 'width: 100%;border:none;'

  const id = 'etvas-product-purchase-iframe'
  const iframe = dom.createElement('iframe', {
    id,
    style,
    src: getSrc(params.productId)
  })

  if (params.onAction) {
    bus.on('open-product-use', payload => {
      const exists = dom.getElement(`#${id}`)
      if (exists) {
        params.onAction({ ...payload, action: 'openProductUse' })
        return true
      }
      return '#off'
    })
    bus.on('on-purchase-cancelled', payload => {
      const exists = dom.getElement(`#${id}`)
      if (exists) {
        params.onAction({ ...payload, action: 'purchaseCancelled' })
        return true
      }
      return '#off'
    })
  }

  const container = dom.getElement(placeholder)
  if (!params?.append) {
    dom.clearElement(container)
  }
  container.appendChild(iframe)
}
