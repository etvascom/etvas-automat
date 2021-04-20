import { resize } from './resize'
import { branding } from './branding'
import { i18n } from './i18n'

const handlers = [resize, branding, i18n]

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
