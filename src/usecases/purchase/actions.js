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
    bus.on('on-purchase-success', payload => {
      params.onAction({ ...payload, action: 'openProductUse' })
    })
    bus.on('on-purchase-cancelled', payload => {
      params.onAction({ ...payload, action: 'purchaseCancelled' })
    })
  }

  const container = dom.getElement(placeholder)
  if (!params?.append) {
    dom.clearElement(container)
  }
  container.appendChild(iframe)
}
