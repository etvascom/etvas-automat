import { dom } from '@/lib/dom'
import { config } from '@/config'

const getSrc = () =>
  `${config.get('etvasURL')}/embed/${config.get('locale', 'en')}/my-products`

export const open = placeholder => {
  const style = 'height: 100%;width: 100%;border:none;'

  const iframe = dom.createElement('iframe', {
    id: 'my-products-iframe',
    style,
    src: getSrc()
  })

  const container = dom.getElement(placeholder)
  container.appendChild(iframe)
}
