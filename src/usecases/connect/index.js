import { etvasAuth, disconnect } from './actions'
import { config } from '@/config'
import { bus } from '@/lib/bus'

bus.on('oidc-auth', payload => {
  if (payload?.result) {
    config.put('accessToken', payload.result.accessToken.jwtToken)
    config.put('refreshToken', payload.result.refreshToken.refreshToken)
    config.put('__logged', true)
  }
})

bus.on('oidc-unauth', () => {
  config.clear('accessToken')
  config.clear('refreshToken')
  config.clear('__logged')
})

/**
 * Displays the connect markup with button
 */
export const connect = (callback = null) => {
  bus.on('oidc-auth', () => {
    if (callback) {
      callback()
    }
    return '#nonce'
  })

  etvasAuth()
}

export const logout = (callback = null) => {
  bus.on('oidc-unauth', () => {
    if (callback) {
      callback()
    }
    return '#nonce'
  })
  disconnect()
}
