import { dom } from '../../usecases/connect/ui/node_modules/@/lib/dom'
import { css } from './html'

const ID = 'etvas-product-details'

export const open = productId => {
  const container = dom.createElement('div', {
    style: css.container,
    id: ID
  })

  const heading = dom.createElement('a', {
    href: '#',
    id: `${ID}-close`,
    innerHTML: '<i class="fas fa-times"></i>'
  })

  dom.listen(heading, 'click', e => {
    dom.removeElement(container)
  })

  const locale = config.get('locale', 'en')

  const iframe = dom.createElement('iframe', {
    style: css.iframe,
    src: `${process.env.ETVAS_BASE_URL}/embed/${locale}/product/${productId}/details`
  })

  container.appendChild(heading)
  container.appendChild(iframe)
  dom.appendChild(container)
}
