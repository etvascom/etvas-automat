import { encode } from '@/lib/hash'

export const getIframeIdByOrigin = (origin, short = false) =>
  `${short ? '' : '#etvas-'}embeddedApp-${encode(origin)}${
    short ? '' : '-iframe'
  }`

export const isChild = () => window.parent !== window

export const raiseIframe = (iframe, zIndex) => {
  iframe.style.zIndex = zIndex + 1
}
export const resetIframe = iframe => {
  iframe.style.zIndex = 'revert'
}

export const getBackdropStyles = ({
  backgroundColor,
  zIndex,
  animated,
  animationName
}) => `
  position: fixed;
  inset: 0px;
  z-index: ${zIndex};
  background-color: ${backgroundColor};
  ${
    animated &&
    `animation-fill-mode: forwards;
   animation-name: ${animationName};
   animation-duration: 0.5s;`
  }
 
  `

export const sendMessage = (event, payload, namespace) => {
  const message = { namespace, event, payload }
  if (isChild()) {
    window.parent.postMessage(message, '*')
  } else {
    const iframes = document.getElementsByTagName('iframe')
    Array.from(iframes).forEach(iframe =>
      iframe.contentWindow.postMessage(message, '*')
    )
  }
}
