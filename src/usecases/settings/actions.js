import { dom } from '@/lib/dom'
import { config } from '@/config'
import { bus } from '@/lib/bus'

const getSrc = () =>
  `${config.get('etvasURL')}/embed/${config.get('locale', 'en')}/settings`

export const open = placeholder => {
  const style = 'height: 100%;width: 100%;border:none;'

  const iframe = dom.createElement('iframe', {
    id: 'settings-iframe',
    style,
    src: getSrc()
  })

  const container = dom.getElement(placeholder)
  container.appendChild(iframe)

  bus.on('resize-embedded-settings', payload => {
    if (!payload?.height) {
      return
    }
    console.info('payload height', payload)
    iframe.style.height = payload.height
  })
}
