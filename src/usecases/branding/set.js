import { config, BRANDING_KEY } from '@/config'

const requiredBranding = ['accentColor', 'brandColor']

export default branding => {
  if (!branding) {
    config.clear(BRANDING_KEY)
    return true
  }
  const missingKey = requiredBranding.find(key => !!branding[key])
  if (missingKey) {
    console.error(`Invalid branding (${missingKey} is required)`)
    return false
  }

  config.put(BRANDING_KEY, branding)
  return true
}
