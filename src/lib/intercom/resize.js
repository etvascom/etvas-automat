import { dom } from '@/lib/dom'
import { encode } from '@/lib/hash'

const canHandle = event =>
  event?.data?.namespace === 'etvas.embededApp' &&
  event?.data?.event === 'response.size' &&
  event?.data?.payload?.height !== undefined

const handle = ({ origin, data }) => {
  const name = `embeddedApp-${encode(origin)}`
  dom.window.postMessage(
    {
      channel: 'etvas-channel',
      action: 'etvas-resize',
      payload: {
        height: data.payload.height,
        width: data.payload.width,
        name
      }
    },
    '*'
  )
}

export const resize = { canHandle, handle }
