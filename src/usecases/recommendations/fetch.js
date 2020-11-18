const matches = {
  '30ee9bef-38b1-4687-ad72-37d9b276454e':
    '54327b79-6ed0-461b-b6c3-9c0901d74937',
  'c66fa485-52f2-4b77-b042-2f50527d8123': '28646d37-7a52-4115-a85c-250f162933ff'
}

export const fetch = async transactionObject => {
  const { id } = transactionObject
  if (matches[id]) {
    return {
      productId: matches[id],
      transactionId: id
    }
  }
  return null
}
