import { config, BRANDING_KEY } from '@/config'
import { dom } from '@/lib/dom'

import { fetchBranding } from './fetchBranding'
import { getIframeIdByOrigin } from './utils'

const canHandle = event =>
  event?.data?.event === 'request.cssVars' && event?.data?.namespace === 'etvas'

const respond = (iframe, payload) => {
  if (!iframe) {
    return
  }
  try {
    iframe.contentWindow.postMessage(
      {
        namespace: 'etvas',
        event: 'response.cssVars',
        payload
      },
      '*'
    )
  } catch (err) {
    console.warn('Iframe is invalid', iframe)
  }
}

const getIframeInfo = ({ origin, _iframeSource }) => {
  const iframeId = getIframeIdByOrigin(origin, false)
  const iframe = dom.getElement(iframeId)
  if (iframe) {
    return {
      iframe,
      isBundled: true
    }
  }
  return _iframeSource ? { iframe: _iframeSource, isBundled: false } : null
}

const handleBundledBranding = async (iframe, customBranding) => {
  const branding = customBranding || (await fetchBranding())
  if (branding) {
    config.put(BRANDING_KEY, branding)
    respond(iframe, branding)
  }
}

const handleNormalBranding = async (iframe, branding) => {
  if (!branding) {
    return
  }

  respond(iframe, branding)
  const tk = setInterval(() => {
    respond(iframe, branding)
  }, 500)
  setTimeout(() => {
    clearInterval(tk)
  }, 3000)
}

const handle = async event => {
  const info = getIframeInfo(event)
  if (!info) {
    // the iframe does not exists in DOM anymore
    return
  }

  const branding = config.get(BRANDING_KEY)
  return info.isBundled
    ? handleBundledBranding(branding, info.iframe)
    : handleNormalBranding(branding, info.iframe)
}

export const branding = {
  canHandle,
  handle
}
