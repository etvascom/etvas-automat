import { initialize, createModal } from './config'
import { dom } from '@lib/dom'

const display = message => {
  dom.write(`Message: ${message}`)
}

export { initialize, display }
