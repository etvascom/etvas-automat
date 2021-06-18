export const decodeB64 = atob
export const encodeB64 = btoa

const _safeURL = {
  encode: [
    { search: /\+/g, replace: '.' },
    { search: /\//g, replace: '_' },
    { search: /=/g, replace: '-' }
  ],
  decode: [
    { search: /\./g, replace: '+' },
    { search: /_/g, replace: '/' },
    { search: /-/g, replace: '=' }
  ]
}

const _transform = (b64str, method) =>
  _safeURL[method].reduce(
    (result, item) => result.replace(item.search, item.replace),
    b64str
  )

export const urlSafeEncodeB64 = str => _transform(encodeB64(str), 'encode')

export const urlSafeDecodeB64 = b64str =>
  decodeB64(_transform(b64str, 'decode'))
