# etvas-automat

## Building blocks

We designed the Automat with a block strategy, so you can use and customize every aspect of how the Etvas content is displayed in your application.

For every of the following functions to be successfully called and the content injected, the customer must be logged in using OpenID and Etvas Connect to be successfully called

Each of these function will accept as first parameter a `destination` and as second parameter the display / behavior `options`.

#### The destination

As this field is available for all our display blocks, it is worth to note what you can specify for the `destination` parameter.

You can specify an ID of a HTML element which is present in your DOM:

```
etvasAutomat.showProductCard('#my-placeholder-div', options)
```

Also, you can directly specify the JS DOM element:

```
const el = document.getElementById('my-placeholder-div')
etvasAutomat.showProductCard(el, options)
```

Although not recommended, if you need to display it in multiple div's, identified by a common class, you can use:

```
etvasAutomat.showProductCard('.etvas-placeholders`)
```

Please note, if you are using jQuery, please use the following syntax, in order to have the native JS DOM element and not a jQuery wrapper:

```
const $element = $('#etvas-placeholder')
etvasAutomat.showProductCard($element.first()[0], options)
```

### Show discover page

This page allows you to display all products and services currently published in your account on Partners Portal.

The general syntax is:

```
etvasAutomat.showDiscover(destination, {
  productCard: {
    onClickDetails: function(payload) {
      console.log('We need to show the product details for ', payload.productId)
    }
  }
})
```
