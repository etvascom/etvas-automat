import { config } from '@/config'

import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.ETVAS_GRAPHQL_URL
})

const getHeaders = () => {
  const token = config.get('accessToken')

  return [
    { name: 'content-type', value: 'application/json' },
    { name: 'accept', value: '*/*' },
    { name: 'x-locale', value: config.get('locale') },
    {
      name: 'x-organization-id',
      value: config.get('organizationId')
    },
    { name: 'Authorization', value: token },
    { name: 'x-amz-user-agent', value: 'aws-amplify/2.0.2' }
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
export const query = async (operationName, query, variables) => {
  try {
    const { data } = await instance.post('/graphql', {
      operationName,
      query,
      variables
    })
    return data
  } catch (err) {
    console.error('* Error while trying to fetch graphql', {
      operationName,
      query,
      err
    })
    return null
  }
}
