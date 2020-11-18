import { isArray, isObject } from '@/lib/isof'

export const clone = source => {
  if (isArray(source)) {
    return source.map(item => clone(item))
  }
  if (isObject(source)) {
    return Object.keys(source).reduce(
      (cloned, key) => ({
        ...cloned,
        [key]: clone(source[key])
      }),
      {}
    )
  }
  return source
}
