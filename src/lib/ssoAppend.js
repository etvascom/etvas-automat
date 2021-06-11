import { config } from '@/config'
import { encodeB64 } from './b64'

const SSO_QUERY_VAR = '_sso'

export const ssoAppend = url => {
  const refreshToken = config.get('refreshToken')
  if (!refreshToken) {
    return url
  }
  const separator = url.indexOf('?') >= 0 ? '&' : '?'
  const queryValue = encodeB64(refreshToken, { urlSafe: true })
  return `${url}${separator}${SSO_QUERY_VAR}=${queryValue}`
}
