# Gatsby Plugin for Osano

Easily add Osano script tag to your Gatsby site.

## Install

TBD

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