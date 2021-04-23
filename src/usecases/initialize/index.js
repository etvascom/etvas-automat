import { config } from '@/config'
import { defaults } from '@/config/defaults'

const requiredKeys = ['etvasURL', 'organizationId']

export const initialize = function (options = {}) {
  if (config.get('__init')) {
    return true
  }

  requiredKeys.forEach(key => {
    if (!options?.[key]) {
      throw new Error(`[Initialize] You must specify ${key}.`)
    }
  })

  config.seed({
    ...defaults,
    ...options,
    __init: true
  })
}

export const configure = function (key, value) {
  if (value === undefined) {
    return config.get(key)
  }
  if (!value && requiredKeys.includes(key)) {
    throw new Error(`[Configure] You must specify a value for ${key}`)
  }
  config.put(key, value)
}
