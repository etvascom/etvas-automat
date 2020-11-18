import { open } from './actions'
// import { config } from '@/config'
// import { bus } from '@/lib/bus'

// bus.on('oidc-auth', payload => {
//   if (payload?.result) {
//     config.put('authToken', payload.result)
//   }
// })

/**
 * Displays the connect markup with button
 */
export const showConnect = () => {
  open()
}
