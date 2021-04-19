import { resize } from './resize'
import { branding } from './branding'

const process = event => {
  if (resize.canHandle(event)) {
    resize.handle(event)
    return true
  }

  if (branding.canHandle(event)) {
    branding.handle(event)
    return true
  }

  return false
}

export default {
  process
}
