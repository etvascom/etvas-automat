import { open } from './actions'
import { config } from '@/config'
import { bus } from '@/lib/bus'

bus.on('oidc-auth', payload => {
  if (payload?.result) {
    config.put('accessToken', payload.result.accessToken.jwtToken)
    config.put('refreshToken', payload.result.refreshToken.refreshToken)
    config.put('__logged', true)
  }
})

/**
 * Displays the connect markup with button
 */
export const showConnect = () => {
  open()
}
