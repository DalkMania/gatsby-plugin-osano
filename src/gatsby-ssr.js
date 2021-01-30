import React from "react";

// Ensure that the Osano script gets loaded as early as it can. To comply with GDPR Rules
export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }, pluginOptions) => {
    if (process.env.NODE_ENV === `production` || pluginOptions.includeInDevelopment) {
        let headComponents = getHeadComponents();
        let scripts = headComponents.filter((el) => el.type === "script");
        const osano = scripts.find((el) => el.key === "gatsby-plugin-osano");
        scripts = scripts.filter((el) => el !== osano);
        headComponents = headComponents.filter((el) => el.type !== "script");
        scripts.unshift(osano);
        headComponents = headComponents.concat(scripts);

        replaceHeadComponents(headComponents);
    }
};

export const onRenderBody = ({ setHeadComponents }, pluginOptions) => {
    if (process.env.NODE_ENV === `production` || pluginOptions.includeInDevelopment) {
        return setHeadComponents([
            <link
                key={`preload-gatsby-plugin-osano`}
                rel="preload"
                as="script"
                href={`https://cmp.osano.com/${pluginOptions.customerId}/${pluginOptions.ccid}/osano.js`}
            />,
            <script
                key={`gatsby-plugin-osano`}
                src={`https://cmp.osano.com/${pluginOptions.customerId}/${pluginOptions.ccid}/osano.js`}
            />
        ]);
    }
};
