# Gatsby Plugin for Osano

Easily add Osano script tag to your Gatsby site.

## Install

Using NPM

```
npm install --save gatsby-plugin-osano
```

Using Yarn

```
yarn add gatsby-plugin-osano
```

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-osano`,
    options: {
      customerId: 'YOUR_OSANO_CUSTOMER_ID',
      ccid: 'YOUR_OSANO_CUSTOMER_CCID',
      includeInDevelopment: false,
    },
  },
];
```

If you want to ensure that osano is loaded first of the script tags. Please put code above last in the plugins array.