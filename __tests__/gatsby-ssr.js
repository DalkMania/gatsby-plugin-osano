"use strict";

var _gatsbySsr = require("../gatsby-ssr");

describe("gatsby-plugin-osano", function () {
  describe("onPreRenderHTML", function () {
    describe("in development mode", function () {
      it("it does not replace any head components, if the includeInDevelopment option is false", function () {
        var pluginOptions = {
          customerId: 1,
          ccid: 1,
          includeInDevelopment: false
        };
        var getHeadComponents = jest.fn();
        var replaceHeadComponents = jest.fn();
        (0, _gatsbySsr.onPreRenderHTML)({
          getHeadComponents: getHeadComponents,
          replaceHeadComponents: replaceHeadComponents
        }, pluginOptions);
        expect(getHeadComponents).not.toHaveBeenCalled();
        expect(replaceHeadComponents).not.toHaveBeenCalled();
      });
      it("it does replace head components, if the includeInDevelopment option is true and reorders the osano script to be first", function () {
        var pluginOptions = {
          customerId: 1,
          ccid: 1,
          includeInDevelopment: true
        };
        var components = [{
          type: 'script',
          key: "script-1234"
        }, {
          type: 'script',
          key: "gatsby-plugin-osano"
        }];
        var sortedComponents = [{
          type: 'script',
          key: "gatsby-plugin-osano"
        }, {
          type: 'script',
          key: "script-1234"
        }];
        var getHeadComponents = jest.fn(function () {
          return components;
        });
        var replaceHeadComponents = jest.fn();
        (0, _gatsbySsr.onPreRenderHTML)({
          getHeadComponents: getHeadComponents,
          replaceHeadComponents: replaceHeadComponents
        }, pluginOptions);
        expect(getHeadComponents.mock.calls).toMatchSnapshot();
        expect(getHeadComponents).toHaveBeenCalledTimes(1);
        expect(replaceHeadComponents).toHaveBeenCalledTimes(1);
        expect(replaceHeadComponents).toHaveBeenCalledWith(sortedComponents);
      });
    });
    describe('in production mode', function () {
      var env;
      beforeAll(function () {
        env = process.env.NODE_ENV;
        process.env.NODE_ENV = "production";
      });
      afterAll(function () {
        process.env.NODE_ENV = env;
      });
      it("it does replace head components, in production and reorders the osano script to be first", function () {
        var pluginOptions = {
          customerId: 1,
          ccid: 1,
          includeInDevelopment: true
        };
        var components = [{
          type: 'script',
          key: "script-1234"
        }, {
          type: 'script',
          key: "gatsby-plugin-osano"
        }];
        var sortedComponents = [{
          type: 'script',
          key: "gatsby-plugin-osano"
        }, {
          type: 'script',
          key: "script-1234"
        }];
        var getHeadComponents = jest.fn(function () {
          return components;
        });
        var replaceHeadComponents = jest.fn();
        (0, _gatsbySsr.onPreRenderHTML)({
          getHeadComponents: getHeadComponents,
          replaceHeadComponents: replaceHeadComponents
        }, pluginOptions);
        expect(getHeadComponents.mock.calls).toMatchSnapshot();
        expect(getHeadComponents).toHaveBeenCalledTimes(1);
        expect(replaceHeadComponents).toHaveBeenCalledTimes(1);
        expect(replaceHeadComponents).toHaveBeenCalledWith(sortedComponents);
      });
    });
  });
  describe("onRenderBody", function () {
    describe("in development mode", function () {
      it("does not set any head component, if the includeInDevelopment option is false", function () {
        var setHeadComponents = jest.fn();
        var pluginOptions = {
          customerId: 1,
          ccid: 1,
          includeInDevelopment: false
        };
        (0, _gatsbySsr.onRenderBody)({
          setHeadComponents: setHeadComponents
        }, pluginOptions);
        expect(setHeadComponents).not.toHaveBeenCalled();
      });
      it("does set head component, if the includeInDevelopment option is true", function () {
        var setHeadComponents = jest.fn();
        var pluginOptions = {
          customerId: 1,
          ccid: 1,
          includeInDevelopment: true
        };
        (0, _gatsbySsr.onRenderBody)({
          setHeadComponents: setHeadComponents
        }, pluginOptions);
        expect(setHeadComponents.mock.calls).toMatchSnapshot();
        expect(setHeadComponents).toHaveBeenCalledTimes(1);
        expect(setHeadComponents).toHaveBeenCalledWith([expect.objectContaining({
          key: "gatsby-plugin-osano"
        })]);
      });
    });
    describe("in production mode", function () {
      var env;
      beforeAll(function () {
        env = process.env.NODE_ENV;
        process.env.NODE_ENV = "production";
      });
      afterAll(function () {
        process.env.NODE_ENV = env;
      });
      it("does set head component", function () {
        var setHeadComponents = jest.fn();
        var pluginOptions = {
          customerId: 1,
          ccid: 1
        };
        (0, _gatsbySsr.onRenderBody)({
          setHeadComponents: setHeadComponents
        }, pluginOptions);
        expect(setHeadComponents.mock.calls).toMatchSnapshot();
        expect(setHeadComponents).toHaveBeenCalledTimes(1);
        expect(setHeadComponents).toHaveBeenCalledWith([expect.objectContaining({
          key: "gatsby-plugin-osano"
        })]);
      });
    });
  });
});