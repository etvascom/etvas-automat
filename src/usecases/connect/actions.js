import { config } from '@/config'
import { dom } from '@/lib/dom'

const _getProvider = () => {
  const provider = config.get('oidc')
  return provider && typeof provider === 'string' && provider.length > 0
    ? provider
    : null
}

export const etvasAuth = () => {
  const provider = _getProvider()
  const query = provider
    ? `?identity_provider=${encodeURIComponent(provider)}`
    : ''
  dom.openWindow(`${config.get('etvasURL')}/oidc-auth${query}`, {
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
