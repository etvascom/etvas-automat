import { defaults } from './defaults'
import { config } from './config'

export const initialize = function (options = {}) {
  config.load({
    ...defaults,
    ...options
  })

  window.open(
    'http://localhost:3001/auth',
    'etvasAuth',
    'location=false,toolbar=false,resizable=false,scrollbars=false,status=false,width=600,height=600,left:100,top:100'
  )

  window.addEventListener('message', function (event) {
    console.info('WE GOT RESPONSE', event)
  })
}
