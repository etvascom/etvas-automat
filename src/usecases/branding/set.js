import { config, BRANDING_KEY } from '@/config'

const requiredBrandingKeys = ['accentColor', 'brandColor']

export default branding => {
  if (!branding) {
    config.clear(BRANDING_KEY)
    return true
  }
  const missingKey = requiredBrandingKeys.find(key => !branding[key])
  if (missingKey) {
    console.error(
      `Invalid branding (${missingKey} is required). Branding not set.`
    )
    return false
  }

  config.put(BRANDING_KEY, branding)
  return true
}
