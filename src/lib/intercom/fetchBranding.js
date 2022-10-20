import { config } from '@/config'
import { etvasQuery } from '@/lib/xhr'

const QUERY_NAME = 'getPortalBranding'

const query = `query ${QUERY_NAME}($input: IDOrSlugInput!) {
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
      slug = slug[1]
    }
    const input = { slug }
    const response = await etvasQuery(QUERY_NAME, query, { input })
    const branding = response?.data?.[QUERY_NAME]

    if (!branding) {
      return null
    }
    return branding
  } catch (err) {
    console.error('Error getting branding information', err)
    return null
  }
}
