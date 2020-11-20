import { dom } from '@/lib/dom'
import { config } from '@/config'
import { bus } from '@/lib/bus'

const src = `${process.env.ETVAS_BASE_URL}/embed/${config.get(
  'locale',
  'en'
)}/discover`

export const open = placeholder => {
  const style = 'height: 100%;width: 100%;border:none;'

  const iframe = dom.createElement('iframe', {
    id: 'discover-iframe',
    style,
    src
  })

  const container = dom.getElement(placeholder)
  container.appendChild(iframe)

  bus.on('resize-embedded-discover', payload => {
    console.log('ok')
    if (!payload?.height) {
      return
    }
    iframe.style.height = payload.height
  })
}
