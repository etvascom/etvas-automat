import { connect, logout } from './connect'

export const handleSSO = async options => {
  if (options?.sso === false) {
    await logout()
  } else if (options?.sso && typeof options.sso === 'string') {
    await connect(options.sso, { skipExchange: false })
  }
}
