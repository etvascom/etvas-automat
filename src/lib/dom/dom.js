export const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined'

export const isNode =
  typeof process !== 'undefined' &&
  process.versions !== null &&
  process.versions.node !== null

const polyfill = new Proxy({}, () => {
  console.info('Node Environment detected, no document')
})

export const dom = isBrowser ? window.document : polyfill
