import { config } from '@/config'
import { dom } from '@/lib/dom'

import { getIframeIdByOrigin } from './utils'

const canHandle = event => event?.data?.event === 'etvas.i18n.request'

const handle = ({ origin }) => {
  const iframeId = getIframeIdByOrigin(origin, false)
  const iframe = dom.getElement(iframeId)
  if (!iframe) {
    console.error('Could not find iframe ', iframeId)
    return
  }
  console.info('posting message i18n.response', config.get('locale'))
  iframe.contentWindow.postMessage(
    {
      event: 'etvas.i18n.change',
      payload: config.get('locale')
    },
    '*'
  )
}

export const i18n = { canHandle, handle }
