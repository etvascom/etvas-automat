const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined'

const isNode =
  typeof process !== 'undefined' &&
  process.versions !== null &&
  process.versions.node !== null

const polyfill = new Proxy({}, () => {
  console.error('Node Environment detected')
})

const createElement = (tag, { options, innerHTML, ...attributes }) => {
  if (!isBrowser) {
    throw new Error('Cannot create HTML element in NodeJS environment')
  }
  const tagName = tag.toUpperCase()
  const element = document.createElement(tagName, options)
  if (attributes) {
    Object.keys(attributes).forEach(attribute => {
      element.setAttribute(attribute, attributes[attribute])
    })
  }
  if (innerHTML) {
    element.innerHTML = innerHTML
  }
  return element
}

const appendChild = node => {
  document.body.appendChild(node)
}

const removeElement = element => {
  if (typeof element === 'string' && element.substr(0, 1) === '#') {
    const el = document.getElementById(element.substr(1))
    el.parentNode.removeChild(el)
    return
  }
  if (typeof element === 'string' && element.substr(0, 1) === '.') {
    const els = document.querySelectorAll(element)
    els.forEach(el => {
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      }
    })
    return
  }
  return element.parentNode.removeChild(element)
}

const openWindow = (url, { target, features, replace = false }) => {
  if (!isBrowser) {
    throw new Error('Cannot open window on NodeJS environment')
  }
  return window.open(url, target, features, replace)
}

const getElement = element => {
  if (element instanceof Node || element instanceof HTMLElement) {
    return element
  }
  if (element.substr(0, 1) === '#') {
    return document.getElementById(element.substr(1))
  }
  if (typeof element === 'string') {
    return document.getElementById(element)
  }
  return document.querySelectorAll(element)
}

const _installListener = (element, event, handler) => {
  element.removeEventListener(event, handler)
  element.addEventListener(event, handler)
}

const listen = (element, eventName, handler) => {
  if (typeof element === 'string' && element.substr(0, 1) === '#') {
    const el = window.document.getElementById(element.substr(1))
    _installListener(el, eventName, handler)
    return
  }
  if (typeof element === 'string' && element.substr(0, 1) === '.') {
    document.querySelectorAll(element).forEach(function (el) {
      _installListener(el, eventName, handler)
    })
    return
  }
  _installListener(element, eventName, handler)
}

export const dom = {
  isBrowser,
  isNode,
  window: isBrowser ? window : polyfill,
  document: isBrowser ? window.document : polyfill,
  createElement,
  getElement,
  appendChild,
  removeElement,
  openWindow,
  listen
}
