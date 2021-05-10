import getBranding from './get'
import setBranding from './set'
import fetchBranding from './fetch'

export default async (
  options = { fetchIfNeeded: true, storeResult: true, custom: {} }
) => {
  let branding = getBranding()
  if (!branding && options.fetchIfNeeded) {
    branding = await fetchBranding()
    if (branding && options.storeResult) {
      setBranding({ ...branding, ...options.custom })
    }
  }
  return { ...branding, ...options.custom }
}
