/* eslint-disable camelcase */
import axios from 'axios'

import { config } from '@/config'

export const obtainTokens = async refreshToken => {
  const region = config.get('auth.region')
  const userPoolId = config.get('auth.userPoolId')
  const webClientId = config.get('auth.webClientId')
  const url = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/openid-configuration`
  const endPoints = await axios.get(url)
  const { token_endpoint } = endPoints.data

  const params = [
    'grant_type=refresh_token',
    `client_id=${webClientId}`,
    `refresh_token=${refreshToken}`
  ].join('&')

  const tokenResponse = await axios.post(token_endpoint, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  const { id_token, access_token } = tokenResponse.data

  return {
    idToken: id_token,
    accessToken: access_token,
    refreshToken
  }
}
