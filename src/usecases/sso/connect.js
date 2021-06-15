import { config } from '@/config'

import { unpackTokens } from './unpackTokens'
import { obtainTokens } from './obtainTokens'

export const connect = async (
  tokens,
  options = { skipExchange: false },
  callback = null
) => {
  let { idToken, accessToken, refreshToken } = await unpackTokens(tokens)
  if (!options.skipExchange && (!idToken || !accessToken)) {
    const newTokens = obtainTokens(refreshToken)
    idToken = newTokens.idToken
    accessToken = newTokens.accessToken
  }
  if (idToken) {
    config.put('idToken', idToken)
  }
  if (accessToken) {
    config.put('accessToken', accessToken)
  }
  config.put('refreshToken', refreshToken)
  config.put('__logged', true)
  callback && callback()
}

export const logout = () => {
  config.clear('idToken')
  config.clear('accessToken')
  config.clear('refreshToken')
  config.clear('__logged')
}
