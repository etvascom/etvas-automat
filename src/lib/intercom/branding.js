import { config } from '@/config'
import { dom } from '@/lib/dom'
import { encode } from '@/lib/hash'

import { fetchBranding } from './fetchBranding'

const canHandle = event =>
  event?.data?.event === 'request.cssVars' && event?.data?.namespace === 'etvas'

const handle = async event => {
  let branding = config.get('branding')
  if (!branding) {
    branding = await fetchBranding()
  }

  const { origin } = event
  const iframeId = `#etvas-embeddedApp-${encode(origin)}-iframe`
  const iframe = dom.getElement(iframeId)
  if (!iframe) {
    console.error('Could not find iframe ', iframeId)
    return
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
