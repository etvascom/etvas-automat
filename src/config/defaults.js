export const defaults = {
  locale: process.env.ETVAS_DEFAULT_LOCALE || 'en',
  etvasGraphQLUrl: process.env.ETVAS_GRAPHQL_URL,
  etvasGraphQLApiKey: process.env.ETVAS_GRAPHQL_API_KEY,
  'auth.region': process.env.ETVAS_REGION,
  'auth.userPoolId': process.env.ETVAS_USERPOOL_ID,
  'auth.webClientId': process.env.ETVAS_WEBCLIENT_ID
}
