import { config } from '@/config'
import { defaults } from '@/config/defaults'

export const initialize = function (options = {}) {
  if (config.get('__init')) {
    return true
  }

  config.seed({
    ...defaults,
    ...options,
    __init: true
  })
}
