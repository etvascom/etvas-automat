import { config } from '@/config'
import { dom } from '@/lib/dom'

import { getIframeIdByOrigin } from './utils'

const canHandle = event => event?.data?.event === 'etvas.i18n.request'

const handle = ({ origin, _iframeSource }) => {
  const iframeId = getIframeIdByOrigin(origin, false)
  const iframe = dom.getElement(iframeId) || _iframeSource
  if (!iframe) {
    return
  }
  iframe.contentWindow.postMessage(
    {
      event: 'etvas.i18n.change',
      payload: config.get('locale')
    },
    '*'
  )
}

export const i18n = { canHandle, handle }
