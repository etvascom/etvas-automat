import { dom } from '@/lib/dom'
import { config } from '@/config'
import { ssoAppend } from '@/lib/ssoAppend'
import { handleSSO } from '@/usecases/sso/handleSSO'
import { createQueryString } from '@/lib/createQueryString'

export const open = async (placeholder, params, options) => {
  if (!params?.productId) {
    throw new Error('You must provide a productId in params')
  }

  const node = dom.getElement(placeholder)
  if (!node) {
    console.error('Cannot find container', placeholder)
    return
  }

  await handleSSO(options)

  const locale = config.get('locale', 'en')

  const iframe = dom.createElement('iframe', {
    style: 'width: 100%;border:none;',
    id: `etvas-product-use-${params.productId}-iframe`,
    src: ssoAppend(
      `${config.get('etvasURL')}/embed/${locale}/product/${
        params.productId
      }/use${createQueryString(params)}`
    )
  })

  if (!params?.append) {
    dom.clearElement(node)
  }
  node.appendChild(iframe)
}
