// Groups of 4 hex digits followed by two with 2 padding chars (=) or a 3 with one padding char (=)
const _re = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/

export const isB64 = _re.test
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

export const urlSafeEncodeB64 = str =>
  _transform(isB64(str) ? str : encodeB64(str), 'encode')

export const urlSafeDecodeB64 = b64str =>
  decodeB64(_transform(b64str, 'decode'))
