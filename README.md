# Gatsby Plugin for Osano

Easily add Osano script tag to your Gatsby site.

## Install

For now this plugin can only be installed locally. Create a `plugins` directory in your gatsby site root and clone this repo into it.

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: require.resolve(`./plugins/gatsby-plugin-osano`),
    options: {
      customerId: 'YOUR_OSANO_CUSTOMER_ID',
      ccid: 'YOUR_OSANO_CUSTOMER_CCID',
      includeInDevelopment: false,
    },
  },
];
```

If you want osano to be loaded first. Please put code above last in the plugins array.