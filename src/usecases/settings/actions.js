import { dom } from '@/lib/dom'
import { config } from '@/config'
import { ssoAppend } from '@/lib/ssoAppend'

export const open = (placeholder, options) => {
  const style = 'width:100%;border:none;'

  const tileURL = options?.tile ? `/${options.tile}` : ''
  const iframeName = options?.tile ? `settings-${options.tile}` : 'settings'

  const iframe = dom.createElement('iframe', {
    id: `etvas-${iframeName}-iframe`,
    style,
    src: ssoAppend(
      `${config.get('etvasURL')}/embed/${config.get(
        'locale',
        'en'
      )}/settings${tileURL}`
    )
  })

  const container = dom.getElement(placeholder)

  if (!options?.append) {
    dom.clearElement(container)
  }

  container.appendChild(iframe)
}
