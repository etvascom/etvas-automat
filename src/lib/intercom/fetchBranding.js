import { config } from '@/config'
import { etvasQuery } from '@/lib/xhr'

const QUERY_NAME = 'getPortalBrandingBySlug'

const query = `query ${QUERY_NAME}($input: SlugInput!) {
  ${QUERY_NAME}(input: $input) {
    id
    name
    logo
    logoSmall
    brandColor
    accentColor
  }
}
`

export const fetchBranding = async (slug = null) => {
  try {
    if (!slug) {
      const url = config.get('etvasURL')
      slug = url.match(/^https?:\/\/([^.]+)\./)
      if (!slug || !slug[1]) {
        console.error('Could not identify slug from', url)
        return null
      }
    }
    const input = { slug: slug[1] }
    const response = await etvasQuery(QUERY_NAME, query, { input })
    const branding = response?.data?.[QUERY_NAME]

    if (!branding) {
      return null
    }
    config.put('branding', branding)
    return branding
  } catch (err) {
    console.error('Error getting branding information', err)
    return null
  }
}