import { config } from '@/config'
import { dom } from '@/lib/dom'
import {
  getIframeIdByOrigin,
  sendMessage,
  resetIframe,
  getBackdropStyles,
  raiseIframe
} from './utils'

const backdropId = 'etvas-modal-backdrop'
const backdropColors = {
  modalBackdropColor: 'rgba(32, 37, 52, 0.92)'
}
const intercomNamespace = 'etvas.modal'
const requestModalClose = 'request.modal.close'
let keyframeStyleRef = null
const keyframeName = 'etvas-modal'

const handleBackdropClick = iframe => {
  const backdrop = dom.getElement(backdropId)
  if (!backdrop) {
    return
  }
  sendMessage(requestModalClose, null, intercomNamespace)
  dom.removeElement(backdrop)
  resetIframe(iframe)
}

const showBackdrop = (iframe, payload) => {
  if (!payload?.backDrop) {
    return
  }
  const zIndexModalIframe = config.get('zIndexModalIframe')

  const animated = payload?.animated
  const backdropStyle = getBackdropStyles({
    backgroundColor: backdropColors[payload.backDrop],
    zIndex: zIndexModalIframe,
    ...(animated ? { animated, animationName: keyframeName } : {})
  })
  if (animated) {
    addModalKeyframe(keyframeName)
  }

  const backdrop = dom.createElement('div', {
    id: backdropId,
    style: backdropStyle
  })
  dom.listen(backdrop, 'click', event => {
    handleBackdropClick(iframe)
  })

  iframe.insertAdjacentElement('beforebegin', backdrop)
  iframe.style.position = 'relative'
  raiseIframe(iframe, zIndexModalIframe)
}

const addModalKeyframe = keyframeName => {
  if (!keyframeStyleRef) {
    const keyframes = `
  @keyframes ${keyframeName} {
    from { opacity: 0; }
    to { opacity: 100%; }
  }
  `
    const styleElement = document.createElement('style')
    styleElement.innerHTML = keyframes
    document.getElementsByTagName('head')[0].appendChild(styleElement)
    keyframeStyleRef = styleElement
  }
}

const canHandle = event => event?.data?.namespace === intercomNamespace
const handle = ({ origin, _iframeSource, data }) => {
  const iframeId = getIframeIdByOrigin(origin, false)
  const iframe = dom.getElement(iframeId) || _iframeSource
  if (!iframe) {
    return
  }

  const payload = data?.payload
  if (!payload) {
    const backdrop = dom.getElement(backdropId)
    if (!backdrop) {
      return
    }
    dom.removeElement(backdrop)
    resetIframe(iframe)
    return
  }
  showBackdrop(iframe, payload)
}

export const modal = { canHandle, handle }
