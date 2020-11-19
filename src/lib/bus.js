import { dom } from '@/lib/dom'

const listeners = {}

// Each event must have a data member with the following structure:
// { channel: 'etvas-channel', action: 'the-action-name', payload: 'anything' }
const onMessage = event => {
  const { data } = event
  if (data?.channel !== 'etvas-channel') {
    return
  }
  if (!data?.action) {
    console.error('Received message on etvas channel without an action: ', data)
    return
  }

  const { action } = data

  if (!listeners[action]) {
    return
  }

  listeners[action].forEach(handler => {
    try {
      const result = handler(data.payload)
      if (result === '#nonce') {
        off(action, handler)
      }
    } catch (err) {
      if (err.message && err.message.substr(0, 1) !== '#') {
        console.error('* Error while handling bus event', err)
      }
      // remove the handler in case of error
      off(action, handler)
    }
  })
}

// Add a listener for an event
const on = (action, handler, avoidDuplicateRegister = true) => {
  if (!listeners[action]) {
    listeners[action] = []
  }
  if (avoidDuplicateRegister && has(action, handler)) {
    return true
  }
  listeners[action].push(handler)
  return true
}

const has = (action, handler) => {
  if (!listeners[action]) {
    return false
  }
  const found = listeners[action].find(func => func === handler)
  return !!found
}

// Remove a listener for an event
const off = (action, handler) => {
  if (!listeners[action]) {
    return false
  }
  const idx = listeners[action].find(func => func === handler)
  if (idx === -1) {
    return false
  }
  listeners[action].splice(idx, 1)
  return true
}

const fire = (action, payload) => {
  dom.window.postMessage({ channel: 'etvas-channel', action, payload })
}

// Install global listener
dom.listen(dom.window, 'message', onMessage)

export const bus = {
  on,
  off,
  has,
  fire
}
