import { encode } from '@/lib/hash'

export const getIframeIdByOrigin = (origin, short = false) =>
  `${short ? '' : '#etvas-'}embeddedApp-${encode(origin)}${
    short ? '' : '-iframe'
  }`
