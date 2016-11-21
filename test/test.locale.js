"use strict";
let assert = require('assert');
let Gmail = require('../src/gmail').Gmail;

describe("Locale-parsing", () => {
    it("Recognizes consistently cased locales", () => {
        let gmail = new Gmail();
        let locales = ["EN","NO", "en", "no"];

        locales.forEach((locale) => {
            let result = gmail.helper.get.is_locale(locale);
            assert.ok(result);
        });
    });

    it("Rejects inconsistently cased locales", () => {
        let gmail = new Gmail();
        let locales = ["En","No", "eN", "nO"];

        locales.forEach((locale) => {
            let result = gmail.helper.get.is_locale(locale);
            assert.ok(!result);
        });
    });
});
