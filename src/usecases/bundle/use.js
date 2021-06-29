import { dom } from '@/lib/dom'
import { encode } from '@/lib/hash'

const getOriginURL = url => {
  const stripped = url.split(/[?#]/)[0]
  return stripped.endsWith('/') ? stripped.substr(0, -1) : stripped
}

export const open = (container, params) => {
  if (!params?.url) {
    throw new Error('Params must contain the URL')
  }
  const node = dom.getElement(container)
  if (!node) {
    console.error('Error: cannot find node', container)
    return
  }
  const id = `etvas-embeddedApp-${encode(getOriginURL(params.url))}-iframe`
  const iframe = dom.createElement('iframe', {
    style: 'height: 100%;width: 100%;border:none;',
    id,
    src: params.url
  })

  if (!params?.append) {
    dom.clearElement(node)
  }

  node.appendChild(iframe)
}
