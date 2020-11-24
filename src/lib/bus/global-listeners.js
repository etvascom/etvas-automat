import { dom } from '@/lib/dom'
import { bus } from './bus'

bus.on('etvas-resize', payload => {
  if (payload?.height !== undefined && payload?.name !== undefined) {
    const targetIframe = dom.getElement(`${payload.name}-iframe`)
    if (!targetIframe) {
      return
    }
    targetIframe.style.height = `${payload.height + 32}px`
  }
})
