"use strict";
let assert = require('assert');
let Gmail = require('../src/gmail').Gmail;
let gmail = new Gmail(false);

describe("Locale-parsing", () => {
    it("Recognizes consistently cased locales", () => {
        let locales = ["EN","NO", "en", "no"];

        locales.forEach((locale) => {
            let result = gmail.helper.get.is_locale(locale);
            assert.ok(result);
        });
    });

    it("Rejects inconsistently cased locales", () => {
        let locales = ["En","No", "eN", "nO"];

        locales.forEach((locale) => {
            let result = gmail.helper.get.is_locale(locale);
            assert.ok(!result);
        });
    });

    it("Rejects badly formatted string", () => {
        let junk = ["12", "12-23", "a3", "a45b4"];
        junk.forEach((junkValue) => {
            let result = gmail.helper.get.is_locale(junkValue);
            assert.ok(!result);
        });
    });
});

describe("Locale URL-parsing", () => {
    let testCase = function(url, expected) {
        const result = gmail.helper.get.locale_from_url_params(url);
        assert.equal(expected, result);
    };

    it("returns null from empty or null", () => {
        testCase(null, null);
        testCase("", null);
    });

    it("returns null from URLs with no language-code", () => {
        testCase("https://boo/hiss", null);
        testCase("https://account.google.com/user/stats?show=true", null);
    });

    it("returns language-codes embedded in URLs", () => {
        testCase("https://account.google.com/user/stats?hl=en", "en");
        testCase("https://account.google.com/user/stats?firstParam=value&hl=en", "en");
        testCase("https://account.google.com/user/stats?foo=bar&hl=no&someMoreStuff", "no");
        testCase("http://www.google.com/support/a/cedpta.com/bin/topic.py?topic=10100&hl=en", "en");
        testCase("http://support.google.com/?ctx=%67mail&hl=no", "no");
    });
});

describe("Globals local-list parsing", () => {
    let testCase = function(listlist, expected) {
        const result = gmail.helper.get.locale_from_globals_item(listlist);
        assert.deepEqual(expected, result);
    };

    it("returns null for null or empty list", () => {
        testCase(null, null);
        testCase([], null);
    });

    it("returns null for no match", () => {
        testCase(["uiv"], null);
    });

    it("returns ui[8] when no URLs match", () => {
        testCase(["ui", 1, 2, 3, 4, 5, 6, 7, "NO"], "NO");
    });

    it("returns hl-value when URLs match", () => {
        testCase(["https://account.google.com/user/stats?firstParam=value&hl=en"], "en");
    });
});

describe("Locale-filtering", () => {
    let testCase = function(locale, expected) {
        const result = gmail.helper.filter_locale(locale);
        assert.equal(expected, result);
    };

    it("filters junk values", () => {
        testCase(null, null);
        testCase("", null);
        testCase("12-23", null);
        testCase("eN", null);
    });

    it("returned value is always lower-case", () => {
        testCase("EN", "en");
        testCase("en", "en");
    });

    it("returned value does not contain region-denomination", () => {
        testCase("EN-GB", "en");
        testCase("NO-NB", "no");
    });
});
