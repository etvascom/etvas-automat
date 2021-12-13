import { dom } from '@/lib/dom'
import { config } from '@/config'
import { ssoAppend } from '@/lib/ssoAppend'
import { createQueryString } from '@/lib/createQueryString'

export const open = (placeholder, params) => {
  const style = 'width:100%;border:none;'

  const tileURL = params?.tile ? `/${params.tile}` : ''
  const iframeName = params?.tile ? `settings-${params.tile}` : 'settings'

  const iframe = dom.createElement('iframe', {
    id: `etvas-${iframeName}-iframe`,
    style,
    src: ssoAppend(
      `${config.get('etvasURL')}/embed/${config.get(
        'locale',
        'en'
      )}/settings${tileURL}${createQueryString(params)}`
    )
  })

  const container = dom.getElement(placeholder)

  if (!params?.append) {
    dom.clearElement(container)
  }

  container.appendChild(iframe)
}
