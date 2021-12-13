export const createQueryString = (params, start = '?') => {
  if (!params || typeof params !== 'object' || !Object.keys(params).length) {
    return ''
  }
  const allowed = ['hideRating', 'showSeeMore', 'seeMoreText', 'bg']
  const keys = allowed.reduce((keys, attribute) => {
    if (params?.[attribute] !== undefined) {
      keys.push(`${attribute}=${encodeURIComponent(params[attribute])}`)
    }
    return keys
  }, [])

  if (!keys.length) {
    return ''
  }

  return `${start}${keys.join('&')}`
}
