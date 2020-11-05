import { defaults } from './defaults'
import { config } from './config'

export const init = options => {
  config.load({
    ...defaults,
    ...options
  })
}
