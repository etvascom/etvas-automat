# Etvas Secure Suite API

## Introduction

This document describes the REST API exposed by Etvas Secure Suite.

In order to call any of the following described endpoints (unless otherwise specified), you need to [authenticate](#authentication) for obtaining a bearer token, which you will use with all the other requests. Also, every request must be [signed](#signing-requests).

## Environments

Etvas Secure Suite offers two environments, paired with Etvas Cloud Structure.

1. Production (Live): real environment, used for providing our services.
2. Sandbox (Test): test environment, mirroring the logic and functionality of production. You can expect differences in data content and response times, but not in data structure and call signatures.

> **Note**: Credentials for access and permission sets are distributed per environment.

## Authentication

A `client-id` and a `client-secret` is required in order to obtain an `access_token`, used to call all other endpoints. This access token must be present in the `Authorization` header, prefixed with the word `Bearer `.

This endpoint does not require the bearer token, as it is the only point where you can obtain one.

**Request:**

```http
POST HTTP/1.1 /api/v1/authenticate
Content-Type: application/json
Accept: application/json
x-signature: <computed-signature>
--
{
  "client_id": "<your-client-id>",
  "client_secret": "<your-client-secret>",
  "grant_type": "<grant-type>"
}
```

The `<grant-type>` value can be:

- `"client_credentials"` or
- `"admin_credentials"`

Most of the endpoints will require a token with `"client_credentials"`, unless otherwise specified.

**Successful response**:

```http
HTTP/1.1 200 OK
Content-Type: application/json
--
{
  "access_token": "an-alpha-numeric-string",
  "type": "bearer",
  "expires": 5699
}
```

Possible error responses:

- [Authentication Error](#authentication-error)
- [Authorization Error](#authorization-error)
- [Invalid Signature Error](#invalid-signature-error)

## Offers

This section documents the endpoints used to manage the offers.

### List offers

This endpoint retrieves a list of offers.

**Request:**

```http
GET HTTP/1.1 /offers?from=&count=&sort=&filter=
Accept: application/json
Authorization: Bearer <access-token>
x-signature: <computed-signature>
x-user-id: <a-user-id>
```

**Successful response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json
--
{
  "nextPageToken": "generated-next-page-token",
  "items": [
    {
      "actionText": "Buy now!",
      "isDemo": false,
      "createdAt": 1648629943135,
      "name": "Product offer",
      "imageURL": "https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/offer_assets/of-07b2f14f-0133-451f-8074-07f47f11c9ce/mainImage",
      "organizationId": "be6a5228-ed2e-44f0-8851-f5f27041c459",
      "updatedAt": 1648629943135,
      "description": "Product offer",
      "id": "of-07b2f14f-0133-451f-8074-07f47f11c9ce",
      "productId": "pr-f79efb11-0cd3-4730-bdc1-eef854fd46d4",
      "title": "Product offer",
      "type": "product",
      "campaignId": "ca-71757da9-bb6d-421f-afaf-618b4d750398",
      "servicePartner": {
        "id": "be6a5228-ed2e-44f0-8851-f5f27041c459",
        "name": "EBank-Dev",
        "logo": "https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/default_branding/logo.png",
        "smallLogo": "https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/default_branding/logo-small.png"
      },
      "product": {
        "id": "pr-f79efb11-0cd3-4730-bdc1-eef854fd46d4",
        "price": 500,
        "subscriptionType": "Recurring",
        "subscriptionMonths": 3,
        "trialPeriod": 3,
        "trialUnit": "months",
        "name": "Test product n1",
        "imageURL": "https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/product_assets/pr-f79efb11-0cd3-4730-bdc1-eef854fd46d4/5a29b616-23c8-4db7-8b97-17e22fea7af9",
        "mediaURLs": [
          "https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/product_assets/pr-f79efb11-0cd3-4730-bdc1-eef854fd46d4/2d0680c8-119d-4aa0-ba32-9e107fd9365c.png"
        ],
        "category": "Security",
        "summary": "summary placeholder",
        "description": "description placeholder",
        "appURL": "https://partners.helloetvas.com/",
        "appInNewTab": false,
        "infoURL": "https://partners.helloetvas.com/",
        "taxName": "10",
        "taxRate": 10
      }
    },
    {
      "actionText": "Activate Now!",
      "createdAt": 1648468438881,
      "name": "Cashback Offer",
      "imageURL": "https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/offer_assets/of-254ef26e-1af2-487a-902d-e08f07498131/mainImage",
      "organizationId": "be6a5228-ed2e-44f0-8851-f5f27041c459",
      "updatedAt": 1648468438881,
      "description": "Reducere la snickers",
      "id": "of-254ef26e-1af2-487a-902d-e08f07498131",
      "cashbackId": "cr-5ce17661-eed4-4939-8645-259230b8fb70",
      "title": "Adidas 10%",
      "type": "cashback",
      "campaignId": "ca-f2c35b04-db72-4a13-8203-e81f6cf43280",
      "cashback": {
        "summary": "ddaaa",
        "logoURL": "https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/cashback_assets/cr-5ce17661-eed4-4939-8645-259230b8fb70/logoURL",
        "createdAt": 1635938123498,
        "discount": 10,
        "imageURL": "https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/cashback_assets/cr-5ce17661-eed4-4939-8645-259230b8fb70/imageURL",
        "organizationId": "be6a5228-ed2e-44f0-8851-f5f27041c459",
        "updatedAt": 1639042715443,
        "fixedValue": false,
        "description": "ddaaa",
        "id": "cr-5ce17661-eed4-4939-8645-259230b8fb70",
        "compute": "ceil",
        "title": "addd"
      },
      "servicePartner": {
        "id": "be6a5228-ed2e-44f0-8851-f5f27041c459",
        "name": "EBank",
        "logo": "https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/default_branding/logo.png",
        "smallLogo": "https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/default_branding/logo-small.png"
      }
    }
  ]
}

```

**Filterable fields**:

- TODO

**Sortable fields:**

- TODO

Please refer to:

- [specifying user in request](#specify-user)
- [pagination](#pagination) for how to paginate the received data.
- [offer model](#offer-model) for the complete structure for the `data` array.
- [filtering results](#filtering) for how to filter the results
- [sorting results](#sorting) for how to sort the results

Error responses:

- [Authorization Error](#authorization-error)
- [Invalid Signature Error](#invalid-signature-error)

### Get a placement offer

This endpoint retrieves an offer based on a placement id. The placement ids are provided.

> Note: the `x-user-id` header is required and cannot have _"guest"_ value.

```http
GET HTTP/1.1 /offers/next/<placement-id>
Accept: application/json
Authorization: Bearer <access-token>
x-signature: <computed-signature>
x-user-id: <a-user-id>
```

**Successful response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json
--
{
    "id": "of-254ef26e-1af2-487a-902d-e08f07498131",
    "type": "cashback",
    "actionText": "Activate Now!",
    "isDemo": false,
    "createdAt": 1648468438881,
    "name": "Cashback Offer",
    "imageURL": "https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/offer_assets/of-254ef26e-1af2-487a-902d-e08f07498131/mainImage",
    "organizationId": "be6a5228-ed2e-44f0-8851-f5f27041c459",
    "updatedAt": 1648468438881,
    "description": "Reducere la snickers",
    "cashbackId": "cr-5ce17661-eed4-4939-8645-259230b8fb70",
    "title": "Adidas 10%",
    "campaignId": "ca-f2c35b04-db72-4a13-8203-e81f6cf43280",
    "cashback": {
        "summary": "ddaaa",
        "logoURL": "https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/cashback_assets/cr-5ce17661-eed4-4939-8645-259230b8fb70/logoURL",
        "createdAt": 1635938123498,
        "discount": 10,
        "imageURL": "https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/cashback_assets/cr-5ce17661-eed4-4939-8645-259230b8fb70/imageURL",
        "organizationId": "be6a5228-ed2e-44f0-8851-f5f27041c459",
        "updatedAt": 1639042715443,
        "fixedValue": false,
        "description": "ddaaa",
        "id": "cr-5ce17661-eed4-4939-8645-259230b8fb70",
        "compute": "ceil",
        "title": "addd"
    },
    "servicePartner": {
        "id": "be6a5228-ed2e-44f0-8851-f5f27041c459",
        "name": "EBank",
        "logo": "https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/default_branding/logo.png",
        "smallLogo": "https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/default_branding/logo-small.png"
    }
}
```

Please refer to:

- [specifying user in request](#specify-user)
- [offer model](#offer-model) for the complete structure for the `data` object.

Error responses:

- [Authorization Error](#authorization-error)
- [Invalid Signature Error](#invalid-signature-error)

## Cashbacks

This section documents the management for the cashbacks.

### List all cashbacks

Get a list of all cashback objects.

> Note: this takes into account `x-user-id` header if present.

**Request:**

```http
GET HTTP/1.1 /cashbacks?from=&count=&sort=&filter=
Accept: application/json
Authorization: Bearer <access-token>
x-signature: <computed-signature>
```

**Successful response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json
--
{
  "nextPageToken": "generated-next-page-token",
  "items": [
    {
      "id":"co-dd1d38ea-c602-4fb9-95c9-c36e2034c9c3",
      "spId":"be6a5228-ed2e-44f0-8851-f5f27041c459",
      "title":"Edeka",
      "summary":"Summary about Edeka",
      "imageURL":"https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/cashback_assets/co-dd1d38ea-c602-4fb9-95c9-c36e2034c9c3/imageURL",
      "logoURL":"https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/cashback_assets/co-dd1d38ea-c602-4fb9-95c9-c36e2034c9c3/logoURL",
      "discount":40,
      "fixedValue":false,
      "localBusiness":{
          "location":{
            "latitude":52.507502,
            "longitude":13.4147385,
          }
      }
    }, {
      id: 'a4641108-cb99-4076-acf2-08508007f8ae',
      ...
    },
    ...
  ]
}
```

**Filterable fields**:

- `filter[status]` - array inclusion field, can contain one or more of the following values:
  - `activated` - include activated cashbacks
  - `awarded` - include awarded cashbacks
  - `settled` - include settled cashbacks
  - `expired` - include expired cashbacks

**Sortable fields:**

- TODO

Please refer to:

- [pagination](#pagination) for how to paginate the received data.
- [cashback model](#cashback-model) for the complete structure for the `data` array.
- [filtering results](#filtering) for how to filter the results
- [sorting results](#sorting) for how to sort the results

Error responses:

- [Authorization Error](#authorization-error)
- [Invalid Signature Error](#invalid-signature-error)

### Get cashback details

> Note: this request ignores the `x-user-id` header.

```http
GET HTTP/1.1 /cashbacks/<cashback-id>
Accept: application/json
Authorization: Bearer <access-token>
x-signature: <computed-signature>
```

**Successful response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json
--
{
  "id":"co-dd1d38ea-c602-4fb9-95c9-c36e2034c9c3",
  "spId":"be6a5228-ed2e-44f0-8851-f5f27041c459",
  "title":"Edeka",
  "summary":"Summary about Edeka",
  "imageURL":"https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/cashback_assets/co-dd1d38ea-c602-4fb9-95c9-c36e2034c9c3/imageURL",
  "logoURL":"https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/cashback_assets/co-dd1d38ea-c602-4fb9-95c9-c36e2034c9c3/logoURL",
  "discount":40,
  "fixedValue":false,
  "localBusiness":{
      "location":{
        "latitude":52.507502,
        "longitude":13.4147385,
      }
  }
}
```

Please refer to:

- [pagination](#pagination) for how to paginate the received data.
- [cashback model](#cashback-model) for the complete structure for the `data` object.

Error responses:

- [Authorization Error](#authorization-error)
- [Invalid Signature Error](#invalid-signature-error)
- [Resource Not Found Error](#resource-not-found-error)

### Get cashback history

> Note: this request requires `x-user-id` header.

```http
GET HTTP/1.1 /cashbacks/<cashback-id>/history
Accept: application/json
Authorization: Bearer <access-token>
x-signature: <computed-signature>
x-user-id: <user-id>
```

**Successful response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json
--
{
  "nextPageToken": "generated-next-page-token",
  items: [
    {
      id: 'a4641108-cb99-4076-acf2-08508007f8ae',
      ...
    },
    ...
  ]
}
```

Please refer to:

- [cashback history model](#cashback-history-model) for the complete structure for the `items` object.

Error responses:

- [Authorization Error](#authorization-error)
- [Invalid Signature Error](#invalid-signature-error)
- [Resource Not Found Error](#resource-not-found-error)
- [User Not Found Error](#user-not-found-error)

### Activate a cashback for an user

> Note: this request requires the `x-user-id` header.

```http
PUT HTTP/1.1 /cashbacks/<cashback-id>/activate
Accept: application/json
Authorization: Bearer <access-token>
x-signature: <computed-signature>
x-user-id: <user-id>
```

**Successful response:**

```http
HTTP/1.1 204 No content
```

Error responses:

- [Authorization Error](#authorization-error)
- [Invalid Signature Error](#invalid-signature-error)
- [Resource Not Found Error](#resource-not-found-error)
- [User Not Found Error](#user-not-found-error)
- [Action Error](#action-error)

### Admin: List awarded and settled cashbacks

> Note: this endpoint is available only when the token is created with a `"grant_type": "admin_credentials"` when authorizing.

> Note: this request takes into account the `x-user-id` header if present and not marked as _guest_.

```http
GET HTTP/1.1 /admin/cashbacks?from=&count=&sort=&filter=
Accept: application/json
Authorization: Bearer <access-token>
x-signature: <computed-signature>
x-user-id: <a-user-id>
```

**Successful response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json
--
{
  "nextPageToken": "generated-next-page-token",
  "items": [
    {
      id: 'a4641108-cb99-4076-acf2-08508007f8ae',
      ...
    },
    ...
  ]
}
```

**Filterable fields:**

- `filter[status]` **string**, **required**, can be one of:
  - `"awarded"` - for awarded and still unsettled cashbacks
  - `"settled"` - for settled cashbacks
- `filter[from]` **date string**, **required**,
- `filter[to]` **date string**, **required**,

Please refer to:

- [pagination](#pagination) for how to paginate the received data.
- [cashback model](#cashback-model) for the complete structure for the `data` array.
- [filtering results](#filtering) for how to filter the results
- [sorting results](#sorting) for how to sort the results

Error responses:

- [Authorization Error](#authorization-error)
- [Invalid Signature Error](#invalid-signature-error)
- [User Not Found Error](#user-not-found-error)

### Admin: Settle an awarded cashback

> Note: this endpoint is available only when the token is created with a `"grant_type": "admin_credentials"` when authorizing.

> Note: this request takes into account the `x-user-id` header if present and not marked as _guest_.

```http
PUT HTTP/1.1 /admin/cashbacks/<cashback-id>/settle
Accept: application/json
Authorization: Bearer <access-token>
x-signature: <computed-signature>
x-user-id: <a-user-id>
```

**Successful response:**

```http
HTTP/1.1 204 No content
```

Error responses:

- [Authorization Error](#authorization-error)
- [Invalid Signature Error](#invalid-signature-error)
- [Resource Not Found Error](#resource-not-found-error)
- [User Not Found Error](#user-not-found-error)
- [Action Error](#action-error)

## Services

This section documents the API endpoints for services.

### List all services

Get a list of all service objects.

> Note: this request takes into account the `x-user-id` header if present and not marked as _guest_.

If the user id is specified, the returned services array will contain details about the purchase. If the user has already purchased the service, the model will contain, for example, details about remaining trial period (if any). Please refer to [service model](#service-model) for more information.

**Request:**

```http
GET HTTP/1.1 /services?from=&count=&sort=&filter=
Accept: application/json
Authorization: Bearer <access-token>
x-signature: <computed-signature>
x-user-id: <a-user-id>
```

**Successful response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json
--
{
  "nextPageToken": "generated-next-page-token",
  "items": [
    {
      id: 'ba0db0e0-c10d-11ea-b3de-0242ac130004',
      purchaseId: 'pu-bc2ecc4b-a55a-44f9-a97e-96be46f481cb',
      purchaseStatus: 'Canceled',
      trialEndsAt: undefined,
      suspendedAt: undefined,
      price: 1300,
      subscriptionType: 'Recurring',
      subscriptionMonths: 12,
      trialPeriod: 3,
      trialUnit: 'days',
      name: 'Reachtag PHONE - Protects your phone from loss',
      imageURL: 'https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/product_assets/ba0db0e0-c10d-11ea-b3de-0242ac130004/b1bf3fb1-159a-4133-b892-824639741ee9',
      mediaURLs: [
        'https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/product_assets/ba0db0e0-c10d-11ea-b3de-0242ac130004/aa9027ec-3b1d-4629-ab0d-c5187e2304e7.mp4'
      ],
      category: 'Sicherheit',
      summary: 'If you lose your mobile phone, a finder can reach a contact person you have stored by the easiest and fastest way.',
      description: 'Smartphones are the most frequently lost item. No item is lost more often in Germany. The phones are usually handed in, as is very often the case in local lost property offices. But there is one problem: mobile phones are difficult to identify. As soon as the battery runs out, the phones are hardly distinguishable from others ...',
      appURL: 'https://brand.etvasapps-dev.xyz',
      appInNewTab: false,
      infoURL: 'https://reachtag.de/',
      demo: false,
      taxName: 'MwSt.',
      taxRate: 19,
      servicePartner: {
        id: 'c1ae5fc2-9093-40ee-92cb-e87c69073f38',
        name: 'Reachtag',
        logo: 'https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/default_branding/logo.png',
        smallLogo: 'https://etvas-public-assets-dev.s3.eu-central-1.amazonaws.com/default_branding/logo-small.png'
      }
    },
    {
      id: 'a4641108-cb99-4076-acf2-08508007f8ae',
      ...
    },
    ...
  ]
}
```

**Filterable fields**:

- TODO

**Sortable fields:**

- TODO

Please refer to:

- [pagination](#pagination) for how to paginate the received data.
- [service model](#service-model) for the complete structure for the `data` array.
- [filtering results](#filtering) for how to filter the results
- [sorting results](#sorting) for how to sort the results

Error responses:

- [Authorization Error](#authorization-error)
- [Invalid Signature Error](#invalid-signature-error)

### Get a service details

> Note: this request takes into account the `x-user-id` header if present and not marked as _guest_.

If the user id is specified, the returned service object will contain details about the purchase. If the user has already purchased the service, the model will contain, for example, details about remaining trial period (if any). Please refer to [service model](#service-model) for more information.

**Request:**

```http
GET HTTP/1.1 /services/<service-id>
Accept: application/json
Authorization: Bearer <access-token>
x-signature: <computed-signature>
x-user-id: <a-user-id>
```

**Successful response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json
--
{
  id: 'a4641108-cb99-4076-acf2-08508007f8ae',
  ...
}
```

Please refer to:

- [service model](#service-model) for the complete structure for the `data` object.

Error responses:

- [Authorization Error](#authorization-error)
- [Invalid Signature Error](#invalid-signature-error)
- [Resource Not Found Error](#resource-not-found-error)

### Purchase a service

> Note: this request requires `x-user-id` header.

```http
POST HTTP/1.1 /services/<service-id>/purchase
Accept: application/json
Authorization: Bearer <access-token>
x-signature: <computed-signature>
x-user-id: <a-user-id>
```

**Successful response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json
--
{
  "redirectURL": "redirect-url-to-purchase-web-page",
}
```

TODO: what is this redirect?

Error responses:

- [Authorization Error](#authorization-error)
- [Invalid Signature Error](#invalid-signature-error)
- [Resource Not Found Error](#resource-not-found-error)

### List all Travel deals

Get a list of all travel objects.

> Note: this request takes into account the `x-user-id` header if present and not marked as _guest_.

If the user id is specified, the returned travels array will contain details about the purchase. Please refer to [travel deal model](#travel-deal-model) for more information.

**Request:**

```http
GET HTTP/1.1 /travel_deals?from=&count=&sort=&filter=
Accept: application/json
Authorization: Bearer <access-token>
x-signature: <computed-signature>
x-user-id: <a-user-id>
```

**Successful response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json
--
{
  "nextPageToken": "generated-next-page-token",
  "items": [
    {
      id: 'a4641108-cb99-4076-acf2-08508007f8ae',
      ...
    }, {
      id: 'a4641108-cb99-4076-acf2-08508007f8af',
      ...
    },
    ...
  ]
}
```

**Filterable fields**:

- TODO

**Sortable fields:**

- TODO

Please refer to:

- [pagination](#pagination) for how to paginate the received data.
- [travel deal model](#travel-deal-model) for the complete structure for the `data` array.
- [filtering results](#filtering) for how to filter the results
- [sorting results](#sorting) for how to sort the results

Error responses:

- [Authorization Error](#authorization-error)
- [Invalid Signature Error](#invalid-signature-error)

### Get a travel deal details

> Note: this request takes into account the `x-user-id` header if present and not marked as _guest_.

If the user id is specified, the returned travel deal object will contain details about the purchase. Please refer to [travel deal model](#travel-deal-model) for more information.

**Request:**

```http
GET HTTP/1.1 /travel_deals/<travel-deal-id>
Accept: application/json
Authorization: Bearer <access-token>
x-signature: <computed-signature>
x-user-id: <a-user-id>
```

**Successful response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json
--
{
  id: 'a4641108-cb99-4076-acf2-08508007f8ae',
  ...
}
```

Please refer to:

- [travel deal model](#travel-deal-model) for the complete structure for the `data` object.

Error responses:

- [Authorization Error](#authorization-error)
- [Invalid Signature Error](#invalid-signature-error)
- [Resource Not Found Error](#resource-not-found-error)

---

## Specify user

Some endpoints allow you to customize the results based on a user id. In order to achieve this, you need to send a header named `x-user-id` with the value you want. If this is not the case and you want general information (not user specific), you can entirely omit the header or use _guest_ as the value.

If the endpoint you are calling does not allow (or makes no sense) to have this header, the system will silently ignore it.

For example, when you want to specify a user id, the request header will look like this:

```
x-user-id: 171b3486-1328-46de-9d9d-8ca874246438
```

If not, you can omit the header or write it like this:

```
x-user-id: guest
```

## Models

This section documents the models retrieved by the API. A model can be presented as an object in the response's `data` field or as an array of objects in the `data` field.

### Offer model

TODO: describe

### Cashback model

```json
{
  "id": "unique-cashback-identifier",
  "type": "cashback_type",
  "status": "cashback_status",
  ...
}
```

Where:

- `id` - **string**, unique id, `/[a-z0-9-_]{36,64}/`
- `type` - **string**, enum, one of: `"code"`, `"online"`, `"offline"`
- `status` - **string**, enum, one of: `"available"`, `"activated"`, `"awarded"`, `"settled"`
- TODO: describe

The cashback model is a representation of one of three types of cashbacks present in Etvas Platform, identifiable by the `type` field:

- **code** - an online (referral code) cashback
- **online** - an online Etvas Cashback
- **offline** an offline Etvas Cashback

> Note: The `status` field will not be present if the user id is not specified in the request header.

The `status` field ..

TODO: complete

### Cashback history model

TODO: describe

### Service model

TODO: describe

### Travel Deal model

TODO: describe

## Signing requests

TODO: describe

## Pagination

- `from` - **string**, pass last received nextPageToken
- `count` - **number**, limit the received items per page

## Filtering

TODO: describe

## Sorting

TODO: describe

## Errors

This section documents all the possible errors that the ESS API can return.

Each error follows a common JSON format and the response will have a `4xx` or `5xx` HTTP status code.

The common format for an error is:

```json
{
  "error": true,
  "status": 400,
  "type": "Error",
  "message": "Human readable message",
  "meta": {
    "reason": "Further describe the reason for which this error occurred."
  }
}
```

Field description:

- `error` - **boolean**, always true; it is present for easily identify an error response if the HTTP client does not handle the HTTP status code properly;
- `status` - **integer**, mirrors the HTTP status code sent with the response;
- `type` - **string**, determines the type (or name) of the error;
- `message` - **string**, a descriptive, human readable, English only message;
- `meta` - **mixed**, an object or array of objects, used by the specific error to relay additional information; typically it will have a `reason` message explaining the error reason.

### Authentication Error

This error occurs when the supplied `client_id`, `client_secret` and `grant_type` are missing, have invalid format or the pairing is invalid (for example, if you send a client id and secret registered for a client and you want a grant type for an admin). Also, this is the error when an invalid grant type is requested.

An authentication error will have a status of 400 and the typical response will resemble:

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json
--
{
  "error": true,
  "status": 401,
  "type": "AuthenticationError",
  "message": "Invalid credentials",
  "meta": {
    "reason": "Invalid grant type"
  }
}
```

### Authorization Error

The authorization error can occur in multiple scenarios, but all of them are linked to the `access_token` you send with your requests. For example, we will return this error when the bearer token is missing, invalid, expired, not applicable (a client token is used for an admin endpoint) or in any other way not valid for the current request. It will always have a 403 HTTP status, and a typical response is:

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json
--
{
  "error": true,
  "status": 403,
  "type": "AuthorizationError",
  "message": "Invalid token received",
  "meta": {
    "reason": "Token expired"
  }
}
```

### Invalid Signature Error

This error is related to the signature you must compute and send in `x-signature` header. This error is unlikely to have any `meta` descriptive field.

```http
HTTP/1.1 406 Not Acceptable
Content-Type: application/json
--
{
  "error": true,
  "status": 406,
  "type": "SignatureError",
  "message": "Signature invalid"
}
```

### Action Error

This error describes an exception regarding a specific action you wanted to perform by calling the API. A typical response is described next:

```http
HTTP/1.1 409 Conflict
Content-Type: application/json
--
{
  "error": true,
  "status": 409,
  "type": "ActionError",
  "message": "Cannot settle cashback",
  "meta": {
    "cashbackId": "1234",
    "status": "activated",
    "reason": "Only an awarded cashback can be settled"
  }
}
```

### Resource Not Found Error

This error describes a missing resource. You can encounter this error when yoy request a specific resource by id and that resource is nowhere to be found in the specified collection. It will always have a 404 HTTP status code:

```http
HTTP/1.1 404 Not Found
Content-Type: application/json
--
{
  "error": true,
  "status": 404,
  "type": "ResourceNotFoundError",
  "message": "Could not find specified resource",
  "meta": {
    "cashbackId": "1234",
    "reason": "Cashback id 1234 could not be found in cashbacks"
  }
}
```

### User Not Found Error

This error occurs when a `x-user-id` header is specified and it cannot be ignored by the endpoint you are calling. It will always have a 423 HTTP status code:

```http
HTTP/1.1 423 Locked
Content-Type: application/json
--
{
  "error": true,
  "status": 423,
  "type": "UserNotFoundError",
  "message": "Could not find specified user",
  "meta": {
    "userId": "1234",
    "reason": "The specified user was not found"
  }
}
```

### Server Error

> **Note**: although improbable, such server errors are possible. In this case, please provide for Etvas as much information as possible, including the context in which you encountered the error.

This error has a 500 HTTP status code and typically occurs in two scenarios: when the Etvas Secure Suite is misconfigured **or** when something went terribly wrong with a part of it. In this case, the error response behaves differently based on the environment you are calling.

For **sandbox (testing) environment**, it will contain as much information as possible in the `meta` field (even a stack trace), making the error reporting process as easy and fast as possible. For the **production** environment, the `meta` field will be likely empty.

In both cases, the logging system will log the full error details. A typical response looks like this:

```http
HTTP/1.1 500 Server Error
Content-Type: application/json
--
{
  "error": true,
  "status": 500,
  "type": "ServerError",
  "message": "The server encountered an unrecoverable error",
  "meta": {
    "reason": "Unhandled error",
    "context": {
      "endpoint": "/cashbacks/1234",
      "details": "Undefined is not a function in processCashback.ts line 21"
    }
  }
}
```
