import { config, BRANDING_KEY } from '@/config'

export default branding => {
  if (!branding) {
    config.clear(BRANDING_KEY)
    return true
  }
  if (!branding.accentColor) {
    console.error('Invalid branding (accentColor is required)')
    return false
  }
  config.put(BRANDING_KEY, branding)
  return true
}
