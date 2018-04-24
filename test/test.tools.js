"use strict";
let assert = require('assert');
let Gmail = require('../src/gmail').Gmail;
let gmail = new Gmail();

describe("Monkeypatching", () => {
    it("patching functions works", () => {
        var ns = {};
        ns.func = function() {
            return "orig";
        };

        gmail.tools.patch(ns.func, (orig) => {
            ns.func = () => {
                return "patched " + orig();
            };
            return ns.func;
        });

        var result = ns.func();

        assert.equal("patched orig", result);
    });

    it("functions support nested patching", () => {
        var ns = {};
        ns.func = function() {
            return "orig";
        };

        gmail.tools.patch(ns.func, (orig) => {
            ns.func = () => {
                return "patched " + orig();
            };
        });

        gmail.tools.patch(ns.func, (orig) => {
            ns.func = () => {
                return "nested " + orig();
            };
        });

        var result = ns.func();

        assert.equal("nested patched orig", result);
    });
});
