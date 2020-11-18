import { config } from '@/config'

import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.ETVAS_BACKEND_URL
})

const getHeaders = () => {
  const token = config.get('authToken')

  return [
    { name: 'x-api-key', value: config.get('apiKey') },
    { name: 'x-organization-id', value: config.get('organizationId') },
    { name: 'Authorization', value: `Bearer ${token}` }
  ]
}

instance.interceptors.request.use(cfg => {
  const additionalHeaders = getHeaders()
  additionalHeaders.forEach(({ name, value }) => {
    cfg.headers[name] = value
  })
  return cfg
}, Promise.reject)

// Call a GraphQL endpoint using axios
export const query = async (name, gql, variables) => {
  try {
    const { data } = await instance.post('/graphql', { query: gql, variables })
    return data[name]
  } catch (err) {
    console.error('* Error while trying to fetch graphql', { name, err })
    return null
  }
}
