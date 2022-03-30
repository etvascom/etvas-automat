import { dom } from '@/lib/dom'
import { config } from '@/config'
import { ssoAppend } from '@/lib/ssoAppend'
import { handleSSO } from '@/usecases/sso/handleSSO'
import { createQueryString } from '@/lib/createQueryString'

const getSrc = (params = {}) => {
  return ssoAppend(
    `${config.get('etvasURL')}/embed/${config.get('locale', 'en')}/cashback/${
      params.cashbackId
    }/details${createQueryString(params)}`
  )
}

const style = 'width:100%; border:none; display:block;'

export const open = async (placeholder, params, options) => {
  if (!params?.cashbackId) {
    throw new Error('You must provide a cashback id in params')
  }
  const container = dom.getElement(placeholder)
  if (!container) {
    console.error('Cannot find container', container)
    return
  }

  await handleSSO(options)

  const id = `etvas-cashback-details-${params.cashbackId}-iframe`
  const src = getSrc(params)
  const iframe = dom.createElement('iframe', { id, src, style })

  if (!params?.append) {
    dom.clearElement(container)
  }

  container.appendChild(iframe)
}
