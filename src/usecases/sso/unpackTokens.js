import { isB64, decodeB64 } from '@/lib/b64'

export const unpackTokens = async tokens => {
  if (isB64(tokens)) {
    tokens = decodeB64(tokens)
  }

  const { accessToken, refreshToken, idToken } = tokens

  if (!refreshToken) {
    throw new Error('Invalid authentication tokens')
  }

  return {
    accessToken,
    refreshToken,
    idToken
  }
}
