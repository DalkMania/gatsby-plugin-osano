import { onRenderBody } from "../gatsby-ssr"

describe(`gatsby-plugin-osano`, () => {
    describe(`onRenderBody`, () => {
        describe(`in development mode`, () => {
            it(`does not set any head component, if the includeInDevelopment option is false`, () => {
                const setHeadComponents = jest.fn()
                const pluginOptions = { customerId:1, ccid:1,includeInDevelopment: false }

                onRenderBody({ setHeadComponents }, pluginOptions)
                expect(setHeadComponents).not.toHaveBeenCalled()
            })

            it(`does set head component, if the includeInDevelopment option is true`, () => {
                const setHeadComponents = jest.fn()
                const pluginOptions = { customerId:1, ccid:1,includeInDevelopment: true }

                onRenderBody({ setHeadComponents }, pluginOptions)
                expect(setHeadComponents.mock.calls).toMatchSnapshot()
            })
        })

        describe(`in production mode`, () => {
            let env

            beforeAll(() => {
                env = process.env.NODE_ENV
                process.env.NODE_ENV = `production`
            })

            afterAll(() => {
                process.env.NODE_ENV = env
            })

            it(`does set head component`, () => {
                const setHeadComponents = jest.fn()
                const pluginOptions = { customerId:1, ccid:1 }

                onRenderBody({ setHeadComponents }, pluginOptions)
                expect(setHeadComponents.mock.calls).toMatchSnapshot()
            })


        })
    })
})