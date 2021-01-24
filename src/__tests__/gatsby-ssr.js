import { onPreRenderHTML, onRenderBody } from "../gatsby-ssr";

describe(`gatsby-plugin-osano`, () => {
    describe(`onPreRenderHTML`, () => {
        describe(`in development mode`, () => {
            it(`it does not replace any head components, if the includeInDevelopment option is false`, () => {
                const pluginOptions = { customerId: 1, ccid: 1, includeInDevelopment: false };
                const getHeadComponents = jest.fn();
                const replaceHeadComponents = jest.fn();

                onPreRenderHTML({ getHeadComponents, replaceHeadComponents }, pluginOptions);
                expect(getHeadComponents).not.toHaveBeenCalled();
                expect(replaceHeadComponents).not.toHaveBeenCalled();
            });

            it(`it does replace head components, if the includeInDevelopment option is true and reorders the osano script to be first`, () => {
                const pluginOptions = { customerId: 1, ccid: 1, includeInDevelopment: true };
                const components = [
                    {
                        type: "script",
                        key: `script-1234`
                    },
                    {
                        type: "script",
                        key: `gatsby-plugin-osano`
                    }
                ];
                const sortedComponents = [
                    {
                        type: "script",
                        key: `gatsby-plugin-osano`
                    },
                    {
                        type: "script",
                        key: `script-1234`
                    }
                ];
                const getHeadComponents = jest.fn(() => components);
                const replaceHeadComponents = jest.fn();

                onPreRenderHTML({ getHeadComponents, replaceHeadComponents }, pluginOptions);

                expect(getHeadComponents.mock.calls).toMatchSnapshot();
                expect(getHeadComponents).toHaveBeenCalledTimes(1);
                expect(replaceHeadComponents).toHaveBeenCalledTimes(1);
                expect(replaceHeadComponents).toHaveBeenCalledWith(sortedComponents);
            });
        });

        describe("in production mode", () => {
            let env;

            beforeAll(() => {
                env = process.env.NODE_ENV;
                process.env.NODE_ENV = `production`;
            });

            afterAll(() => {
                process.env.NODE_ENV = env;
            });

            it(`it does replace head components, in production and reorders the osano script to be first`, () => {
                const pluginOptions = { customerId: 1, ccid: 1, includeInDevelopment: true };
                const components = [
                    {
                        type: "script",
                        key: `script-1234`
                    },
                    {
                        type: "script",
                        key: `gatsby-plugin-osano`
                    }
                ];
                const sortedComponents = [
                    {
                        type: "script",
                        key: `gatsby-plugin-osano`
                    },
                    {
                        type: "script",
                        key: `script-1234`
                    }
                ];
                const getHeadComponents = jest.fn(() => components);
                const replaceHeadComponents = jest.fn();

                onPreRenderHTML({ getHeadComponents, replaceHeadComponents }, pluginOptions);

                expect(getHeadComponents.mock.calls).toMatchSnapshot();
                expect(getHeadComponents).toHaveBeenCalledTimes(1);
                expect(replaceHeadComponents).toHaveBeenCalledTimes(1);
                expect(replaceHeadComponents).toHaveBeenCalledWith(sortedComponents);
            });
        });
    });

    describe(`onRenderBody`, () => {
        describe(`in development mode`, () => {
            it(`does not set any head component, if the includeInDevelopment option is false`, () => {
                const setHeadComponents = jest.fn();
                const pluginOptions = { customerId: 1, ccid: 1, includeInDevelopment: false };

                onRenderBody({ setHeadComponents }, pluginOptions);
                expect(setHeadComponents).not.toHaveBeenCalled();
            });

            it(`does set head component, if the includeInDevelopment option is true`, () => {
                const setHeadComponents = jest.fn();
                const pluginOptions = { customerId: 1, ccid: 1, includeInDevelopment: true };

                onRenderBody({ setHeadComponents }, pluginOptions);
                expect(setHeadComponents.mock.calls).toMatchSnapshot();
                expect(setHeadComponents).toHaveBeenCalledTimes(1);
                expect(setHeadComponents).toHaveBeenCalledWith([
                    expect.objectContaining({ key: `preload-gatsby-plugin-osano` }),
                    expect.objectContaining({ key: `gatsby-plugin-osano` })
                ]);
            });
        });

        describe(`in production mode`, () => {
            let env;

            beforeAll(() => {
                env = process.env.NODE_ENV;
                process.env.NODE_ENV = `production`;
            });

            afterAll(() => {
                process.env.NODE_ENV = env;
            });

            it(`does set head component`, () => {
                const setHeadComponents = jest.fn();
                const pluginOptions = { customerId: 1, ccid: 1 };

                onRenderBody({ setHeadComponents }, pluginOptions);
                expect(setHeadComponents.mock.calls).toMatchSnapshot();
                expect(setHeadComponents).toHaveBeenCalledTimes(1);
                expect(setHeadComponents).toHaveBeenCalledWith([
                    expect.objectContaining({ key: `preload-gatsby-plugin-osano` }),
                    expect.objectContaining({ key: `gatsby-plugin-osano` })
                ]);
            });
        });
    });
});
