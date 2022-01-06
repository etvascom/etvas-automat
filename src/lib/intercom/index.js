import { resize } from './resize'
import { branding } from './branding'
import { i18n } from './i18n'
import { modal } from './modal'

const handlers = [resize, branding, i18n, modal]

const process = event => {
  const handler = handlers.find(handler => handler.canHandle(event))
  if (!handler) {
    return false
  }
  handler.handle(event)
  return true
}

export default {
  process
}
