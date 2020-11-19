import { dom } from '@/lib/dom'
import { config } from '@/config'
import { bus } from '@/lib/bus'

const src = `${process.env.ETVAS_BASE_URL}/embed/${config.get(
  'locale',
  'en'
)}/discover`

const style = 'height: 100%;width: 100%;border:none;visibility:hidden";'

export const open = placeholder => {
  const iframeContainer = dom.createElement('div', { id: 'discover-iframe' })
  const iframe = dom.createElement('iframe', {
    style,
    src,
    onload: bus.on('resize-embedded-discover', payload => {
      const iframeContainer = dom.getElement('#discover-iframe')

      if (!payload?.height) {
        return
      }

      iframeContainer.style.height = payload.height
    })
  })

  const container = dom.getElement(placeholder)
  iframeContainer.appendChild(iframe)
  container.appendChild(iframeContainer)
}
