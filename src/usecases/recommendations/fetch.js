import { etvasQuery } from '@/lib/xhr'
import {
  knownTransformations,
  determineTransactionType
} from '@/lib/transaction-normalize'

// const matches = {
//   '30ee9bef-38b1-4687-ad72-37d9b276454e':
//     '54327b79-6ed0-461b-b6c3-9c0901d74937',
//   'c66fa485-52f2-4b77-b042-2f50527d8123': '28646d37-7a52-4115-a85c-250f162933ff'
// }

const QUERY_NAME = 'getProductRecomandation'

const query = `query ${QUERY_NAME}($input: Transaction!) {
  ${QUERY_NAME}(input: $input) {
    id
    confidence
  }
}
`

export const fetch = async (
  transaction,
  options = { type: null, minConfidence: 0 }
) => {
  // We try to determine the transformation
  let transformation = determineTransactionType(transaction)

  if (options?.type && typeof options?.type === 'function') {
    // if we have a type as function in options, we'll use that
    transformation = options.type
  } else if (
    options?.type &&
    typeof options?.type === 'string' &&
    knownTransformations[options.type]
  ) {
    // we have a type as string and we already know how to deal with it
    transformation = knownTransformations[options.type]
  }

  if (transformation === null) {
    transformation = transaction => transaction
  }

  try {
    const normalized = transformation(transaction)
    const { id, provider, amount, currency, purpose, description } = normalized

    const variables = {
      input: { provider, amount, currency, purpose, description }
    }
    const response = await etvasQuery(QUERY_NAME, query, variables)

    if (options?.minConfidence) {
      if (response.data[QUERY_NAME].confidence < options.minConfidence) {
        return null
      }
    }

    return {
      productId: response.data[QUERY_NAME].id,
      transactionId: id,
      confidence: response.data[QUERY_NAME].confidence
    }
  } catch (err) {
    console.error('* Error while trying to get transaction recommendation', err)
    return null
  }
}
