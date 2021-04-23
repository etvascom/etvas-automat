import axios from 'axios'
import { config } from '@/config'

let _instance = null

const getHeaders = () => [
  { name: 'content-type', value: 'application/json' },
  { name: 'accept', value: '*/*' },
  { name: 'x-locale', value: config.get('locale') },
  {
    name: 'x-organization-id',
    value: config.get('organizationId')
  },
  { name: 'Authorization', value: config.get('accessToken') },
  { name: 'x-amz-user-agent', value: 'aws-amplify/2.0.2' },
  { name: 'x-api-key', value: config.get('etvasGraphQLApiKey') }
]

const initializeAxios = () => {
  if (_instance) {
    return _instance
  }
  _instance = axios.create({
    baseURL: config.get('etvasGraphQLUrl')
  })

  _instance.interceptors.request.use(cfg => {
    const additionalHeaders = getHeaders()
    additionalHeaders.forEach(({ name, value }) => {
      if (value !== undefined) {
        cfg.headers[name] = value
      }
    })
    return cfg
  }, Promise.reject)

  return _instance
}

// Call a GraphQL endpoint using axios
export const query = async (operationName, query, variables) => {
  const instance = initializeAxios()
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
