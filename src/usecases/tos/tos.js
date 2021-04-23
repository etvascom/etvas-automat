import getEtvasTOS from './etvas'
import getProductTOS from './product'

export default ({ productId }) => ({
  url: {
    etvas: getEtvasTOS(),
    product: getProductTOS(productId)
  }
})
