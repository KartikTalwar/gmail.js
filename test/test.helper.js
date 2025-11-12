"use strict";
let assert = require('assert');
let Gmail = require('../src/gmail').Gmail;
let gmail = new Gmail(false);

describe("Helper array_starts_with", () => {
    it("returns true when list starts with item", () => {
        let list = ["ui", 1, 2, 3];
        let result = gmail.helper.array_starts_with(list, "ui");
        assert.equal(result, true);
    });

    it("returns false when list does not start with item", () => {
        let list = ["ui", 1, 2, 3];
        let result = gmail.helper.array_starts_with(list, "other");
        assert.equal(result, false);
    });

    it("returns false when list is empty", () => {
        let list = [];
        let result = gmail.helper.array_starts_with(list, "ui");
        assert.equal(result, false);
    });

    it("returns false when list is null", () => {
        let result = gmail.helper.array_starts_with(null, "ui");
        assert.equal(result, false);
    });

    it("returns false when list is undefined", () => {
        let result = gmail.helper.array_starts_with(undefined, "ui");
        assert.equal(result, false);
    });

    it("works with numeric items", () => {
        let list = [1, 2, 3];
        let result = gmail.helper.array_starts_with(list, 1);
        assert.equal(result, true);
    });

    it("uses strict equality check", () => {
        let list = ["1", 2, 3];
        let result = gmail.helper.array_starts_with(list, 1);
        assert.equal(result, false);
    });
});

describe("Helper array_sublist", () => {
    it("returns sublist when itemKey matches first element", () => {
        let nestedArray = [
            ["ui", 1, 2, 3],
            ["other", 4, 5, 6],
            ["data", 7, 8, 9]
        ];
        let result = gmail.helper.get.array_sublist(nestedArray, "ui");
        assert.deepEqual(result, ["ui", 1, 2, 3]);
    });

    it("returns first matching sublist when multiple matches exist", () => {
        let nestedArray = [
            ["ui", 1, 2, 3],
            ["ui", 4, 5, 6],
            ["data", 7, 8, 9]
        ];
        let result = gmail.helper.get.array_sublist(nestedArray, "ui");
        assert.deepEqual(result, ["ui", 1, 2, 3]);
    });

    it("returns null when no match is found", () => {
        let nestedArray = [
            ["ui", 1, 2, 3],
            ["other", 4, 5, 6]
        ];
        let result = gmail.helper.get.array_sublist(nestedArray, "notfound");
        assert.equal(result, null);
    });

    it("returns null when nestedArray is null", () => {
        let result = gmail.helper.get.array_sublist(null, "ui");
        assert.equal(result, null);
    });

    it("returns null when nestedArray is undefined", () => {
        let result = gmail.helper.get.array_sublist(undefined, "ui");
        assert.equal(result, null);
    });

    it("returns null when nestedArray is empty", () => {
        let result = gmail.helper.get.array_sublist([], "ui");
        assert.equal(result, null);
    });

    it("handles nested arrays with empty sublists", () => {
        let nestedArray = [
            [],
            ["ui", 1, 2, 3]
        ];
        let result = gmail.helper.get.array_sublist(nestedArray, "ui");
        assert.deepEqual(result, ["ui", 1, 2, 3]);
    });

    it("works with numeric itemKeys", () => {
        let nestedArray = [
            [1, "a", "b"],
            [2, "c", "d"]
        ];
        let result = gmail.helper.get.array_sublist(nestedArray, 1);
        assert.deepEqual(result, [1, "a", "b"]);
    });

    it("returns null when sublists contain non-arrays", () => {
        let nestedArray = [
            "not an array",
            ["ui", 1, 2, 3]
        ];
        // This should handle the case where a sublist is not an array
        // The function will try to check list[0] which will be 'n' for the string
        let result = gmail.helper.get.array_sublist(nestedArray, "ui");
        assert.deepEqual(result, ["ui", 1, 2, 3]);
    });
});

describe("Helper locale_from_url_params", () => {
    it("extracts locale from URL with hl parameter", () => {
        let url = "https://account.google.com/user/stats?hl=en";
        let result = gmail.helper.get.locale_from_url_params(url);
        assert.equal(result, "en");
    });

    it("extracts locale from URL with multiple parameters", () => {
        let url = "https://account.google.com/user/stats?foo=bar&hl=no&other=value";
        let result = gmail.helper.get.locale_from_url_params(url);
        assert.equal(result, "no");
    });

    it("returns null for URL without hl parameter", () => {
        let url = "https://account.google.com/user/stats?foo=bar";
        let result = gmail.helper.get.locale_from_url_params(url);
        assert.equal(result, null);
    });

    it("returns null for URL without query string", () => {
        let url = "https://account.google.com/user/stats";
        let result = gmail.helper.get.locale_from_url_params(url);
        assert.equal(result, null);
    });

    it("returns null for non-URL strings", () => {
        let result = gmail.helper.get.locale_from_url_params("not a url");
        assert.equal(result, null);
    });

    it("returns null for null input", () => {
        let result = gmail.helper.get.locale_from_url_params(null);
        assert.equal(result, null);
    });

    it("returns null for undefined input", () => {
        let result = gmail.helper.get.locale_from_url_params(undefined);
        assert.equal(result, null);
    });

    it("handles http URLs", () => {
        let url = "http://www.google.com/support?hl=fr";
        let result = gmail.helper.get.locale_from_url_params(url);
        assert.equal(result, "fr");
    });

    it("handles encoded URLs", () => {
        let url = "http://support.google.com/?ctx=%67mail&hl=de";
        let result = gmail.helper.get.locale_from_url_params(url);
        assert.equal(result, "de");
    });
});

describe("Helper locale_from_globals_item", () => {
    it("returns locale from URL in list", () => {
        let list = ["https://account.google.com/user/stats?hl=en"];
        let result = gmail.helper.get.locale_from_globals_item(list);
        assert.equal(result, "en");
    });

    it("returns first matching locale from multiple URLs", () => {
        let list = [
            "https://account.google.com/user/stats?hl=en",
            "https://other.com?hl=fr"
        ];
        let result = gmail.helper.get.locale_from_globals_item(list);
        assert.equal(result, "en");
    });

    it("returns list[8] when no URLs match", () => {
        let list = ["ui", 1, 2, 3, 4, 5, 6, 7, "NO"];
        let result = gmail.helper.get.locale_from_globals_item(list);
        assert.equal(result, "NO");
    });

    it("returns null for null input", () => {
        let result = gmail.helper.get.locale_from_globals_item(null);
        assert.equal(result, null);
    });

    it("returns null for undefined input", () => {
        let result = gmail.helper.get.locale_from_globals_item(undefined);
        assert.equal(result, null);
    });

    it("returns undefined for empty list", () => {
        let result = gmail.helper.get.locale_from_globals_item([]);
        assert.equal(result, undefined);
    });

    it("prefers URL locale over list[8]", () => {
        let list = [
            "not a url",
            "https://account.google.com/user/stats?hl=en",
            2, 3, 4, 5, 6, 7, "NO"
        ];
        let result = gmail.helper.get.locale_from_globals_item(list);
        assert.equal(result, "en");
    });
});
