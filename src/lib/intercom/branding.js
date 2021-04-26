import { config } from '@/config'
import { dom } from '@/lib/dom'

import { fetchBranding } from './fetchBranding'
import { getIframeIdByOrigin } from './utils'

const canHandle = event =>
  event?.data?.event === 'request.cssVars' && event?.data?.namespace === 'etvas'

const handle = async event => {
  const { origin } = event
  const iframeId = getIframeIdByOrigin(origin, false)
  const iframe = dom.getElement(iframeId)
  if (!iframe) {
    return
  }
  let branding = config.get('branding')
  if (!branding) {
    branding = await fetchBranding()
  }

  iframe.contentWindow.postMessage(
    {
      namespace: 'etvas',
      event: 'response.cssVars',
      payload: branding
    },
    '*'
  )
}

export const branding = {
  canHandle,
  handle
}
