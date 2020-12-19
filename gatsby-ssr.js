import React from "react"

// Ensure that the Osano script gets loaded as early as it can. To comply with GDPR Rules
export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  if (
    process.env.NODE_ENV === `production` ||
    pluginOptions.includeInDevelopment
  ) {
    const headComponents = getHeadComponents()
    headComponents.sort((x, y) => {
      if (x.key === 'gatsby-plugin-osano') {
        return -1
      } else if (y.key === 'gatsby-plugin-osano') {
        return 1
      }
      return 0
    })
    replaceHeadComponents(headComponents)
  }
}

export const onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  if (
    process.env.NODE_ENV === `production` ||
    pluginOptions.includeInDevelopment
  ) {
    return setHeadComponents([
      <script
        key={`gatsby-plugin-osano`}
        src={`https://cmp.osano.com/${pluginOptions.customerId}/${pluginOptions.ccid}/osano.js`}
      />,
    ])
  }
}