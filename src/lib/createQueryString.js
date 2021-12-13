export const createQueryString = (params, start = '?') => {
  if (!params || typeof params !== 'object' || !Object.keys(params).length) {
    return ''
  }
  const allowed = ['hideRating', 'showSeeMore', 'seeMoreText', 'bg']
  const keys = Object.keys(params).reduce((keys, attribute) => {
    if (allowed.includes(attribute) && params[attribute] !== undefined) {
      keys.push(`${attribute}=${encodeURIComponent(params[attribute])}`)
    }
    return keys
  }, [])

  if (!keys.length) {
    return ''
  }

  return `${start}${keys.join('&')}`
}
