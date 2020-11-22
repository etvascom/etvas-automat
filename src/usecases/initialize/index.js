import { config } from '@/config'
import { defaults } from '@/config/defaults'

export const initialize = function (options = {}) {
  if (config.get('__init')) {
    return true
  }

  if (!options?.etvasURL) {
    alert('Incorrect Etvas initialization, must specify etvasURL')
    throw new Error('You must specify Etvas URL!')
  }

  if (!options?.organizationId) {
    alert('Incorrect Etvas initialization, must specify organizationId')
    throw new Error('You must specify Organization ID!')
  }

  config.seed({
    ...defaults,
    ...options,
    __init: true
  })
}
