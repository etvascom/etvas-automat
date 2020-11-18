//

// const example = {
//   type: 'GiroTransaction',
//   id: '26c3642c-e4e2-4668-8678-cf7993a6eab8',
//   transactionPatternId: 'fdc4951a-b7e0-4a22-b560-eab8f668e0f7',
//   amount: {
//     value: -8900,
//     currency: 'EUR'
//   },
//   bookingDate: '2020-11-07T12:00:00Z',
//   valueDate: '2020-11-07T12:00:00Z',
//   creditor: 'E.ON Energie Deutschland',
//   creditorBankCode: 'DEUTDEDDXXX',
//   creditorAccountNumber: 'DE57300700100394036800',
//   debtor: 'Bogdan Onu',
//   debtorAccountNumber: 'DE00999940000000002518',
//   purpose:
//     'VK 242067679574 Hausstraße 99 c Musterstadt ABSCHLAG 09 Gas WIR SAGEN D ANKE',
//   cleanPurpose:
//     'VK 242067679574 Hausstraße 99 c Musterstadt ABSCHLAG 09 Gas WIR SAGEN D ANKE',
//   prebooked: false,
//   bookingKey: 'SDD LASTSCHR',
//   mandateId: '20863HM0534785',
//   endToEndId: 'B511005258924 ',
//   camtTransactionId: 'txId-1295162'
// }

const transformGiro = ({ id, creditor, amount, purpose, cleanPurpose }) => ({
  id,
  provider: creditor,
  currency: amount.currency,
  amount: amount.value,
  description: cleanPurpose,
  purpose
})

export const knownTransformations = {
  giro: transformGiro
}

export const determineTransactionType = transaction => {
  if (transaction?.type === 'GiroTransaction') {
    return knownTransformations.giro
  }

  return null
}
