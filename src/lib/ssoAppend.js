import { config } from '@/config'
import { urlSafeEncodeB64 } from './b64'

const SSO_QUERY_VAR = '_sso'

export const ssoAppend = url => {
  const refreshToken = config.get('refreshToken')
  if (!refreshToken) {
    return url
  }
  const separator = url.indexOf('?') >= 0 ? '&' : '?'
  const queryValue = urlSafeEncodeB64(refreshToken)
  return `${url}${separator}${SSO_QUERY_VAR}=${queryValue}`
}
