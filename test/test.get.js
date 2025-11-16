"use strict";
let assert = require('assert');
let Gmail = require('../src/gmail').Gmail;

describe("Get functions", () => {
    let gmail;

    beforeEach(() => {
        // Mock XMLHttpRequest
        global.XMLHttpRequest = function() {
            this.open = function() {};
            this.send = function() {};
            this.setRequestHeader = function() {};
        };
        global.XMLHttpRequest.prototype = {
            open: function() {},
            send: function() {},
            setRequestHeader: function() {}
        };
        
        // Mock document object
        global.document = {
            getElementsByClassName: () => [],
            querySelector: () => null,
            querySelectorAll: () => [],
            getElementById: () => null
        };
        
        // Mock window object to avoid ReferenceError
        global.window = {
            GM_SPT_ENABLED: undefined,
            GM_RFT_ENABLED: undefined,
            location: {
                pathname: "/mail/u/0/",
                origin: "https://mail.google.com",
                href: "https://mail.google.com/mail/u/0/"
            },
            document: global.document,
            XMLHttpRequest: global.XMLHttpRequest
        };
        
        // Mock top object (used by xhr_watcher)
        global.top = {
            document: global.document,
            XMLHttpRequest: global.XMLHttpRequest
        };
        
        gmail = new Gmail(false);
    });

    afterEach(() => {
        delete global.XMLHttpRequest;
        delete global.window;
        delete global.document;
        delete global.top;
    });

    // Tests migrated from test.parsing.js (previously commented out)
    describe("get.current_page", () => {
        it("parses various hash values correctly", () => {
            const testCases = {
                "inbox": "inbox",
                "inbox/p2": "inbox",
                "starred": "starred",
                "sent": "sent",
                "drafts": "drafts",
                "imp": "imp",
                "chats": "chats",
                "all": "all",
                "spam": "spam",
                "trash": "trash",
                "search/test": "search/test",
                "search/test/p2": "search/test",
                "category/promotions": "category/promotions",
                "category/promotions/p2": "category/promotions",
                "category/social": "category/social",
                "category/social/p2": "category/social",
                "label/bank": "label/bank",
                "label/bank/p2": "label/bank"
            };

            for (let testCaseValue in testCases) {
                let expected = testCases[testCaseValue];
                let result = gmail.get.current_page(testCaseValue);
                assert.equal(result, expected);
            }
        });

        it("returns 'email' for hash with email ID", () => {
            let result = gmail.get.current_page("inbox/16a0d1f820d515e2");
            assert.equal(result, "email");
        });

        it("defaults to 'inbox' when no hash provided", () => {
            // Mock window.location.hash
            global.window.location.hash = "";
            let result = gmail.get.current_page();
            assert.equal(result, "inbox");
        });
    });

    describe("get.loggedin_accounts with real data", () => {
        it("handles mla data correctly", () => {
            const mlaDataJSON = require("./testdata-parser-json/testdata-parser-mla.json");
            gmail.tracker.mla = mlaDataJSON;

            const result = gmail.get.loggedin_accounts();

            assert.equal(result.length, 4);
            assert.equal(result[0].name, "Gmail Dev");
            assert.equal(result[0].email, "user2@gsuite2.com");
            assert.equal(result[0].index, 3);
            assert.equal(result[1].name, "Primary One");
            assert.equal(result[1].email, "primary@gmail.com");
            assert.equal(result[1].index, 0);
            assert.equal(result[2].name, "Стефанія Мамо");
            assert.equal(result[2].email, "mamo.stefania@gmail.com");
            assert.equal(result[2].index, 1);
            assert.equal(result[3].name, "Jack Sparrow");
            assert.equal(result[3].email, "Jack.Sparrow@gsuite1.net");
            assert.equal(result[3].index, 2);
        });
    });
});
