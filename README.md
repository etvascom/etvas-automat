# etvas-automat

Etvas Automat is a script which will inject Etvas content on your website, at the place and format you decide.

Also, given a financial transaction, Etvas Automat will fire up an AI engine which will recommend a product or service from the Etvas pallette for that particular transaction. Of course, the recommendation (containing the product / service card) is to be rendered where and how you choose.

We designed the Etvas Automat using a Block Strategy. Every piece of information ready to be injected in your web application needs a place (usually a div reference) in which to be rendered.

## Authentication and Security

We take security very seriously, so everything you can do with Etvas Automat will require an automatic authentication mechanism to be implemented on your side.

Currently, we accept the OpenID Auth Protocol to be implemented on your side so Etvas Automat can link your authenticated visitor (customer) to Etvas Infrastructure.

## Installing Etvas Automat

You can install Etvas Automat by directly referencing the script in your HTML file or, if you use a package manager (like npm or yarn) and a build system (like webpack).

#### Reference it in your HTML file:

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

If you need a specific version of Etvas Automat (and you most likely will), you can use it instead of `latest`:

```
  <script src="https://unpkg.com/@etvas/etvas-automat@1.3.0"></script>
```

You can read more about resolving a version (major, minor and so on) by consulting the documentation at [unpkg.com](https://unpkg.com).

In order to use Etvas Automat features, you need to initialize it. You can find the code fragment in your account on [Partners Portal](https://partners.helloetvas.com), which you must copy and paste in your HTML

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
