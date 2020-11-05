import { clone } from '@lib/clone'

export default () => {
  let repo = {}
  return {
    load: options => (repo = clone(options)),
    get: (key, defaultValue) =>
      repo[key] !== undefined ? clone(repo[key]) : defaultValue,
    put: (key, value) => (repo[key] = clone(value)),
    clear: key => (key ? delete repo[key] : (repo = {}))
  }
}
