export const isArray = inspect => (inspect ? Array.isArray(inspect) : false)
export const isObject = inspect =>
  inspect ? !isArray(inspect) && typeof inspect === 'object' : false
