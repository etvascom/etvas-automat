export const encode = string => {
  if (!string || string.length === 0) {
    return 0
  }
  return string
    .split('')
    .map(ch => ch.charCodeAt(0))
    .reduce((hash, code) => {
      hash = (hash << 5) - hash + code
      return hash & hash
    }, 0)
}
