import { dom } from '@/lib/dom'
import { config } from '@/config'

const getSrc = () =>
  `${config.get('etvasURL')}/embed/${config.get('locale', 'en')}/settings`

export const open = (placeholder, options) => {
  const style = 'width:100%;border:none;'

  const iframe = dom.createElement('iframe', {
    id: 'etvas-settings-iframe',
    style,
    src: getSrc()
  })

  const container = dom.getElement(placeholder)

  if (!options?.append) {
    dom.clearElement(container)
  }

  container.appendChild(iframe)
}
