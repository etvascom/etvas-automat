import { config } from '@/config'

export default productId =>
  `${config.get('etvasURL')}/terms-and-conditions/${productId}`
