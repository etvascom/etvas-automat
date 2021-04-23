# etvas-automat

Etvas Automat is a script which will inject Etvas content on your website, at the place and format you decide.

Also, given a financial transaction, Etvas Automat will fire up an AI engine which will recommend a product or service from the Etvas pallette for that particular transaction. Of course, the recommendation (containing the product / service card) is to be rendered where and how you choose.

We designed the Etvas Automat using a Block Strategy. Every piece of information ready to be injected in your web application needs a place (usually a div reference) in which to be rendered (an `iframe` is injected).

**Note:** the `iframe` elements rendered by various function in the Etvas Automat have an automatic resize mechanism (implemented through `window.postMessage`) that conveniently resizes the iframe so the dreaded double-scroll does not appear in your page. You should still take this into account and permit the HTML element you are using as a container to occupy as much height as needed.

Looking for quick examples? Check the [example section](#code-example)

## Authentication and Security

We take security very seriously, so everything you can do with Etvas Automat will require an automatic authentication mechanism to be implemented on your side.

Currently, we accept the OpenID Auth Protocol to be implemented on your side so Etvas Automat can link your authenticated visitor (customer) to Etvas Infrastructure.

## Installing Etvas Automat

You can install Etvas Automat by directly referencing the script in your HTML file or, if you use a package manager (like npm or yarn) and a build system (like webpack).

#### 1. Reference it in your HTML file:

Use a `<script>` tag to reference the package. Using this method will register an object called `etvasAutomat` in the global `window` object. You can use it like this:

```
<!doctype html>
<html>
  <head>
    ...
    <script src="https://unpkg.com/@etvas/etvas-automat@latest"></script>
    ...
  </head>
  <body>
    ...
    <script>
      // in most cases you can omit window reference,
      // but we always recommend using like:
      window.etvasAutomat.initialize({ ... })
    </script>
  </body>
</html>
```

If you need a specific version of Etvas Automat (and you most likely will), you can use the version number (for example `1.3.0`) instead of `latest`:

```
  <script src="https://unpkg.com/@etvas/etvas-automat@1.3.0"></script>
```

You can read more about resolving a version (major, minor and so on) by consulting the documentation at [unpkg.com](https://unpkg.com).

In order to use Etvas Automat features, you need to initialize it. You can find the code fragment in your account on [Partners Studio](https://partners.helloetvas.com), which you must copy and paste in your HTML.

#### 2. When using a package manager

Etvas Automat is ready to be used with `npm` or `yarn`. The installation is straightforward:

```
$ npm install @etvas/etvas-automat`
```

or, if you prefer yarn:

```
$ yarn add @etvas/etvas-automat
```

You can use the package as you normally use any other package. If you are using the CommonJS syntax, you can require the package like this:

```
const etvasAutomat = require("@etvas/etvas-automat");

etvasAutomat.initialize({ ... });
```

But, as this is a Front-End SDK, you might use the `import` syntax:

```
import automat from "@etvas/etvas-automat";

automat.initialize({ ... });
```

## Initializing the library

The library needs some configuration in order to work and communicate properly with our backend services. We do that by calling a function named `initialize`. You will want to call this function as early as possible in your code, making sure it is the first one called:

```
automat.initialize({
  etvasURL: "https://unique-organization-slug.helloetvas.com",
  organizationId: "12345678-1234-1234-4123-123456789012",
  locale: "en"
})
```

Only the `etvasURL` and the `organizationId` are required. The other ones have either a default value or they are needed just in some cases. Aside the `locale` entry, everything else is provided by Etvas Support Team or you can find the values in [Etvas Partners Studio](https://partners.helloetvas.com)

#### `etvasURL`

This is the URL you can find in your account on [Etvas Partners Studio](https://partners.helloetvas.com). We call this URL the Customer Portal, the portal tailored and branded by you to show it to your customers. It is required in order to preserve the brand colors and graphics you provided, so the integration in your application is as natural as possible.

#### `organizationId`

This is an UUID that uniquely identifies your organization inside Etvas Ecosystem. Paired with the ApiKey, it provides a wide range of optimizations we provide for your network calls, in an ongoing effort to improve the response times for our API's.

#### `locale`

We support internationalization out of the box. Our I18N system will dynamically load the selected language dictionary and update the User Interface in an instant, providing for your customer the best experience available. We currently have dictionaries for `en` - English language and `de` - German language, with more coming.

## The building blocks

As mentioned before, Etvas Automat is designed as separate building blocks. This architecture allows you to take control over every rendered position, event and click the customer performs on the displayed content.

There are a number of different sections that you can display with Etvas Automat. Some of them can be displayed directly, others require intermediary steps, like, for example, in order to display the Account Settings part, you need to authenticate the user through OpenID.

We will describe the authentication mechanism first and, for each building block, we will note if it requires the authentication to be performed first or not.

### Terms and Conditions

There are two documents the user should be aware of: the Etvas Platform Terms and conditions (_Etvas T&C_) and the Product Terms and Conditions (_Product T&C_).

As you should collect this information at different steps in your flow, we recommend including the _Etvas T&C_ in your own Terms and Conditions, so the user experience is improved by agreeing only once for both your application and Etvas Platform.

However, the _Product T&C_'s are different for each product. There are two distinct cases: the first one is when the user purchases the product using the `showPurchase` flow, the second case is when the user can directly use a Bundled product by using `showBundledUse`.

In the first case (use `showPurchase` flow), we got you covered. The user implicitly agrees to _Product T&C_ when the purchase button is pressed.

The second case (directly use it through `showBundledUse`), the user does not see anywhere the _Product T&C_, which might generate problems.

Displaying the T&C's for Etvas and Product are your application responsibility, but Etvas Automat provides for you a convenient method to get the two URL's:

```
const options = {
  productId: '12345678-1234-1234-4123-123456789012'
}
// get T&C (or Terms Of Service) for Etvas and Product
const urls = automat.getTOS(options)
const agreeEtvas = confirm('Please read ' + urls.etvas + '. Do you agree?')
const agreeProduct = confirm('Please read ' + urls.product + '. Do you agree?')
```

As you can see, this is a quick way to get both URL's for _Etvas T&C_ and _Product T&C_, for one product.

If you have multiple bundled products, or if you need these URL's at different steps in your flow, you can use:

```
// get the Etvas Platform T&C (or Terms Of Service)
const etvasTOSUrl = automat.getEtvasTOS()

// get the Product T&V (or Terms Of Service)
const productId = '12345678-1234-1234-4123-123456789012'
const productTOSUrl = automat.getProductTOS(productId)
```

### Authentication (`connect` and `logout`)

When displaying the authenticated content (`showMyProducts`, `showSettings`) or when the purchase flow must happen, you must connect the Etvas Platform to your OpenID Authentication server. This means you must call the `connect` function on Etvas Automat, which will open a small popup window that gives the user the means to login (or automatically register!!) in Etvas using your authentication server.

**Please note** this flow requires additional setup both on Etvas Platform and your authentication server, which must support OpenID protocol.

The signature is:

```
automat.connect(callback)
```

where `callback` is a function that will run when successfully connected.

The function accepts a callback which will be called without any arguments but only on successful login:

```
automat.connect(function () {
  // do whatever processing must be performed after the
  // authentication in Etvas platform is successfully done.
})
```

First time the `connect` function is called for a user, the window will invite to use your server as authenticator. The mechanism is similar to Facebook authentication, where your server is Facebook and Etvas is the client. Once the user clicks the login button, the window will be automatically closed and the callback will run.

The second time the `connect` function is called for a user, the popup window will auto-close, the user is automatically authenticated in Etvas platform and the supplied callback runs.

When your user logs out from your platform, the Etvas authentication can remain active, but it's a good practice to log out. We recommend logging out first from Etvas platform and afterwards from your (main provider) authentication flow:

Before: (without Etvas Automat integration)

```
<script>
  function onLogoutClick() {
    myAuthService.logout()
  }
</script>
<button onclick="onLogoutClick()">Logout</button>
```

After Etvas automat integration:

```
<script>
  function onLogoutClick() {
    automat.logout(function () {
      myAuthService.logout()
    })
  }
</script>
<button onClick="onLogoutClick()">Logout</button>
```

### Product recommendations

You can get a product id for a specific financial transaction and display the corresponding product card in the context of that transaction. For example, if the transaction is about buying an Apple MacBook Pro, the recommended product might be an Electronics Insurance Policy that will protect the buyer's money against losing or theft. The function call involves an API call, so the function called is asynchronously.

**Important**: The tokenization process also ensures completely anonymous data, so no actor involved in this process (besides your application, of course) can link the transaction to the transaction data, both on transport (HTTP Internet calls) and Etvas storage (database).

The algorithm will tokenize the transaction parameters and, based on Artificial Intelligence / Machine Learning algorithm, will get a product recommendation for that specific transaction, being the best available match. If the matching algorithm is returning a matching score lower than an acceptable (and variable) threshold, the recommendation will have a `null` value. You should test this for each recommendation call, because not all transactions will have a recommended Etvas product.

Also, currently there is no support for multiple recommendations for a single transaction.

The signature of the function is:

```
async automat.getProductRecommendation(transaction)
```

where the transaction is an object with a structure like in the example below.

The code looks like this:

```
// Given a transaction object that looks like this:
const transaction = {
  id: '1234', // unused
  provider: 'Apple Store, California, USA', // payment receiver
  currency: 'USD', // ISO-4217 currency code
  amount: 1699, // float number
  description: 'iMac M1, 27in, 32GB RAM, 1T SSD', // as detailed as possible
  purpose: 'IT&C electronics' // as detailed as possible
}

const recommendation = await automat.getProductRecommendation(transaction)
if (!recommendation) {
  alert('There are no recommendations for this transaction')
} else {
  alert(
    'We have a recommendation with the product id ' +
    recommendation.productId
  )
}
```

The recommendation contains the `productId` which you can use to display the product's card, details page or even directly start the purchase process, for that matter.

### Display a product card

In order to display a product card, you need to provide three things: the product id, where to display the card and what happens when the user clicks on the Product details link (included inside the card).

The function signature is:

```
automat.showProductCard(productId, container, options)
```

where the `productId` is an UID of a product obtained from your account on Partner's Studio, a result of a recommendation or a specific product ID provided by Etvas, on request; the `container` can be an [HTML Node element, an ID or a class name](#some-quick-notes-about-the-examples); the `options` is an object containing how to treat the existing container contents (append or clear) and a function called when the user clicks the link inside the product card.

Please **note** the product card is a small iframe and will not take a full width container. You can, of course, control how much space will take horizontally, but we recommend an optimal size of 480&times;240 pixels.

Long story short, here's the code:

```
automat.showProductCard(
  productId,
  '#my-container',
  {
    onDetailsClick: payload => {
      alert('User clicked on the product ' + payload.productId)
    }
  }
)
```

### Display a product details page

This method will display all the product details in a page. Be prepared for a rather big content page (in height) and we recommend a full-width container. Of course, the content is designed to be responsive, so if the container has smaller width, the content will automatically be displayed to accommodate the different screens.

The signature is similar with the method for showing the product card:

```
automat.showProductDetails(productId, container, options)
```

where the `productId` is an UID of a product obtained from your account on Partner's Studio, a result of a recommendation or a specific product ID provided by Etvas, on request; the `container` can be an [HTML Node element, an ID or a class name](#some-quick-notes-about-the-examples).

The `options` object is more complex than the one provided for product card. It has the usual `append` key, but the similarity ends here. This happens because the product details page will behave differently if the user is authenticated (the `connect` process took place) and the product is purchased by the current authenticated user:

- If the user **is authenticated** and the **product is purchased**, the action button will display a `Use` label and the action will be to actually use the product.
- If the user **is authenticated** and the **product is not purchased**, the action button will display a `Purchase` label (together with a price), and you must specify the action, which will naturally be firing the purchase flow.
- If the user **is not authenticated**, the action button will still display a `Purchase` label, but the underlying action must call for `connect` prior to launching the purchase flow.

So the options must cover these three cases:

```
// define a function that launches the purchase flow
function showPurchase() {
  alert('Launch purchase for product id ', + payload.productId)
}

const productDetailsOptions = {
  append: false,
  actionButton: {
    onUse: function (payload) {
      // Etvas is connected and the product is purchased
      alert('User wants to use the purchased product ' + payload.productId)
    },
    onPurchase: function (payload) {
      if (!payload.connected) {
        // We can call connect here and on callback we launch the purchase
        etvasAutomat.connect(showPurchase)
      } else {
        showPurchase()
      }
    }
  }
}
```

### Display Discover page

The Discover page contains all the products you published in your Marketplace section of your account on [Partner's Studio](https://partners.helloetvas.com).

It shows the selected products cards and lets you control what happens when the user clicks on various buttons and links.

The signature is:

```
automat.showDiscover(container, options)
```

where the `container` can be an [HTML Node element, an ID or a class name](#some-quick-notes-about-the-examples) and the `options` is an object resembling a combination between the [product card](#display-a-product-card) and the one from [product details](#display-a-product-details-page).

In a similar process with the prior example, the actions on Discover page buttons and links (from the product cards displayed) will behave differently if the user is authenticated (the `connect` process took place) and the product is purchased by the current authenticated user:

- If the user **is authenticated** and the **product is purchased**, the action button will display a `Use` label and the action will be to actually use the product.
- If the user **is authenticated** and the **product is not purchased**, the action button will display a `Purchase` label (together with a price), and you must specify the action, which will naturally be firing the purchase flow.
- If the user **is not authenticated**, the action button will still display a `Purchase` label, but the underlying action must call for `connect` prior to launching the purchase flow.

Here is the code:

```
function showPurchase() {
  alert('Show purchase for product id ', + payload.productId)
}

automat.showDiscover(
  '#etvas-discover',
  {
    append: false,
    productCard: {
      onDetailsClick: function (payload) {
        alert('User clicked on details button for product ' + payload.productId)
      },
      actionButton: {
        onUse: function (payload) {
          alert('User clicked the Use button for product ' + payload.productId)
        },
        onPurchase: function (payload) {

          if (!payload.connected) {
            etvasAutomat.connect(showPurchase)
          } else {
            showPurchase()
          }
        }
      }
    }
  }
)
```

---

**TODO:**

- purchase
- use
- my products
- settings
- bundled product

---

## Code example

For reference, we include a short code fragment that you can use to quickly parse the functions and their signatures. The code is written in ES6 but it can easily be pasted and, with minimal effort, included directly in a `script` tag in your HTML page.

```
import automat from '@etvas/etvas-automat'

/**
 * Initialize the automat.
 */
automat.initialize({
  etvasURL: "https://appname.etvasapps.com",
  etvasApiKey: "kn0-providedapikeystring",
  organizationId: "12345678-1234-1234-4123-123456789012",
  locale: "en"
})

/****************************************/

/**
 * Connect the OpenID authentication. Accepts a callback function
 * called when the connection is done and the customer is authenticated
 * in Etvas Platform.
 *
 * Warning: requires OpenID Auth provider setup in Etvas Platform
 *
 * Requires: initialize
 */
automat.connect(callback)

/****************************************/

/**
 * Get a product recommendation based on a transaction
 *
 * Requires: connect
 */
// a transaction object
const transaction = {
  id: '1234',
  provider: 'Apple Store, New York, USA',
  currency: 'USD', // ISO-4217 currency code
  amount: 1699, // float number
  description: 'iMac M1, 27in, 32GB RAM, 1T SSD',
  purpose: 'IT&C electronics'
}

// get the recommendation
const recommendation = await automat.getProductRecommendation(transaction)
if (!recommendation) {
  alert('There are no recommendations for this transaction')
}

/****************************************/

/**
 * Shows a product card.
 *
 * Requires: initialize
 */

// Container is a div present in page
const container = '#etvas-container'
// or, directly the HTML node:
// const container = document.getElementById('etvas-container')

// The options contains the function that will run when
// the customer clicks on Product Details link inside the card
const productCardOptions = {

  // append iframe in the container instead
  // of replacing container content
  // (defaults to: false)
  append: false,

  // Details click event callback
  onDetailsClick: function (payload) {
    alert('User clicked on the product ' + payload.productId)
  }
}
// shows the product card
automat.showProductCard(recommended.productId, container, productCardOptions)

/****************************************/

/**
 * Shows the product details page
 *
 * Requires: initialize, optional connect
 */
const productDetailsOptions = {

  // append iframe in the container instead
  // of replacing container content
  // (defaults to: false)
  append: false,

  // Action Button (use or purchase) click event callback
  actionButton: {
    onUse: function (payload) {
      // Etvas is connected and the product is purchased
      alert('User wants to use the purchased product ' + payload.productId)
    },
    onPurchase: function (payload) {
      function showPurchase() {
          alert('Show purchase for product id ', + payload.productId)
      }
      if (!payload.connected) {
        // We can call connect here
        etvasAutomat.connect(showPurchase)
      } else {
        showPurchase()
      }
    }
  }
}

automat.showProductDetails(
  productId,
  '#etvas-details-container',
  productDetailsOptions
)

/****************************************/

/**
 * Show discover page
 *
 * Requires: initialize, optional connect
 */

const discoverOptions = {

  // append iframe in the container instead
  // of replacing container content
  // (defaults to: false)
  append: false,

  // options for the product card
  productCard: {
    onDetailsClick: function (payload) {
      alert('User clicked on details button for product ' + payload.productId)
    },
    actionButton: {
      // The action button can have two states:
      //  - Use (if connected and the product is purchased)
      //  - Purchase (if not connected or connected and product not purchased)
      onUse: function (payload) {
        // the Use button will show only of successfully connected
        alert('User clicked the Use button for product ' + payload.productId)
      },
      onPurchase: function (payload) {
        function showPurchase() {
          alert('Show purchase for product id ', + payload.productId)
        }
        if (!payload.connected) {
          // We can call connect here
          etvasAutomat.connect(showPurchase)
        } else {
          showPurchase()
        }
      }
    }
  }
}
// show the Discover iframe (all published products)
automat.showDiscover('#etvas-discover', discoverOptions)

/****************************************/

/**
 * Shows the Purchase wizard
 * Best rendered inside a modal
 *
 * Requires: connect
*/
automat.showPurchase(
  '#etvas-purchase-container',
  {
    // append iframe in the container instead
    // of replacing container content
    // (defaults to: false)
    append: false,

    // the obtained productId
    // for example, from a recommendation
    productId
  }
)

/**
 * Allow user to use the purchased product
 *
 * Requires: connect
 */
automat.showProductUse(
  productId,
  '#etvas-use-container',
  {
    append: false
  }
)

/****************************************/

/**
 * Show My Products section
 *
 * Requires: connect
 */
const myProductsOptions = {

  // append iframe in the container instead
  // of replacing container content
  // (defaults to: false)
  append: false,

  // productCard options
  productCard: {
    onDetailsClick: function (payload) {
      alert('User clicked on details button for product ' + payload.productId)
    }
  },

  // Discover click options
  onDiscoverClick: function () {
    alert('User clicked on Discover button')
  },

  // action button options
  actionButton: {
    onUse: function (payload) {
      alert('User wants to use the product ' + payload.productId)
    },
    onPurchase: function (payload) {
      alert('User wants to purchase the product' + payload.productId)
    }
  }
}
// Show My Products section
automat.showMyProducts('#etvas-my-products', myProductsOptions)

/****************************************/

/**
 * Show the My settings page
 *
 * Requires: connect
 */

const settingsOptions = {
  // append iframe in the container instead
  // of replacing container content
  // (defaults to: false)
  append: false,
}
automat.showSettings('#etvas-settings-container', settingsOptions)

/****************************************/

/**
 * Logout the user from Etvas
 * (usually before logging out from your platform)
 *
 * Requires optional: connect
 */
function onLogout() {
  alert('You are logged out')
}
if (isEtvasConnected) {
  automat.logout(onLogout)
} else {
  onLogout()
}

/****************************************/

/**
 * Directly use a product bought through API
 * (owned user, bundled product)
 *
 * Requires: initialize
 */

const url = await _backendServices.getBundledProductURL()
const bundledUseOptions = {
  // append iframe in the container instead
  // of replacing container content
  // (defaults to: false)
  append: false
}
automat.showBundledUse(url, '#etvas-product-use', bundledUseOptions)
```

#### Some quick notes about the examples

1. When specifying the container, you can use one of the following: a HTML node element (for example, a React `ref` or a Vue `$ref` ), an id with `#element_id` notation (to be honest, it works even without the `#`) or a class name like `.etvas-container`. If you are using jQuery, do not forget to pass the native element into automat (`const el = $('#etvas-container')[0]`).
2. The options supplied in methods that renders something accepts an optional `append` key and a boolean value, which controls how the new content will be rendered: if `append: true` is supplied, the new iframe will be appended inside the container. If `false` (the default behavior), the container will contain only the rendered iframe.
