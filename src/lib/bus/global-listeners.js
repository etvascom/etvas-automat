import { dom } from '@/lib/dom'
import { config } from '@/config'
import { bus } from './bus'

bus.on('etvas-resize', payload => {
  if (config.get('skipIntercomResizeEvents')) {
    return
  }

  if (payload?.height !== undefined && payload?.name !== undefined) {
    const targetIframe = dom.getElement(`etvas-${payload.name}-iframe`)
    if (!targetIframe) {
      return
    }
    targetIframe.style.height = `${payload.height + 32}px`
  }
})
