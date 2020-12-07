import { config } from '@/config'
import { dom } from '@/lib/dom'

export const openConnect = () => {
  dom.openWindow(`${config.get('etvasURL')}/oidc-auth`, {
    target: 'etvasAuth',
    features:
      'location=no,toolbar=false,resizable=no,scrollbars=false,status=false,width=10,height=10,left:0,top:0'
  })
}

const etvasLogout = () => {
  dom.openWindow(`${config.get('etvasURL')}/oidc-auth?logout=1`, {
    target: 'etvasAuth',
    features:
      'location=no,toolbar=false,resizable=no,scrollbars=false,status=false,width=10,height=10,left:0,top:0'
  })
}

export const disconnect = () => {
  if (!config.get('__logged')) {
    return
  }
  etvasLogout()
}
