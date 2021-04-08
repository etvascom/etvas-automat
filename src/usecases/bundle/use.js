import { dom } from '@/lib/dom'
import { encode } from '@/lib/hash'

const getOriginURL = url => {
  const stripped = url.split(/[?#]/)[0]
  return stripped.endsWith('/') ? stripped.substr(0, -1) : stripped
}

export const open = (url, placeholder, options) => {
  const id = `etvas-embeddedApp-${encode(getOriginURL(url))}-iframe`
  const iframe = dom.createElement('iframe', {
    style: 'height: 100%;width: 100%;border:none;',
    id,
    src: url
  })

  const container = dom.getElement(placeholder)

  if (!options?.append) {
    dom.clearElement(container)
  }

  container.appendChild(iframe)
}
