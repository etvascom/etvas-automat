# Etvas Secure Suite API

## Introduction

This document describes the ReST API exposed by Etvas Secure Suite.

In order to call any of the following described endpoints (unless otherwise specified), you need to [authenticate](#authentication) for obtaining a bearer token, which you will use with all the other requests. Also, every request must be [signed](#signing-requests).

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
GET HTTP/1.1 /offers?pagination=1,100&sort=&filter=
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
  id: 'a4641108-cb99-4076-acf2-08508007f8ae',
  ...
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
GET HTTP/1.1 /cashbacks?pagination=1,100&sort=&filter=
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
      id: 'a4641108-cb99-4076-acf2-08508007f8ae',
      ...
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
  id: 'a4641108-cb99-4076-acf2-08508007f8ae',
  ...
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
GET HTTP/1.1 /admin/cashbacks?pagination=1,100&sort=&filter=
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
GET HTTP/1.1 /services?pagination=1,100&sort=&filter=
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
GET HTTP/1.1 /travel_deals?pagination=1,100&sort=&filter=
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

TODO: describe the query parameters

TODO: describe the response `links` format

## Filtering

TODO: describe

## Sorting

TODO: describe

## Errors

This section documents all the possible errors that the ESS API can return.

### Authentication Error

TODO: describe

### Authorization Error

TODO: describe

### Invalid Signature Error

### Action Error

TODO: describe

TODO: describe

### Resource Not Found Error

TODO: describe

### User Not Found Error

TODO: describe

### Server Error

TODO: describe
