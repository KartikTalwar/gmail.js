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

    describe("get.last_active", () => {
        it("returns object with time, ip, mac_address, and time_relative", () => {
            // Mock the tracker globals
            gmail.tracker.globals = [];
            gmail.tracker.globals[17] = [];
            gmail.tracker.globals[17][15] = [
                null,
                1234567890,
                null,
                "192.168.1.1",
                null, null, null, null, null,
                "00:11:22:33:44:55",
                "2 hours ago"
            ];

            let result = gmail.get.last_active();
            
            assert.ok(result);
            assert.equal(result.time, 1234567890);
            assert.equal(result.ip, "192.168.1.1");
            assert.equal(result.mac_address, "00:11:22:33:44:55");
            assert.equal(result.time_relative, "2 hours ago");
        });
    });

    describe("get.loggedin_accounts", () => {
        it("returns array of logged in accounts", () => {
            // Mock the tracker mla
            gmail.tracker.mla = [
                null,
                [
                    ["user1@gmail.com", null, null, 0, "User One"],
                    ["user2@company.com", null, null, 1, "User Two"]
                ]
            ];

            let result = gmail.get.loggedin_accounts();
            
            assert.ok(Array.isArray(result));
            assert.equal(result.length, 2);
            assert.equal(result[0].email, "user1@gmail.com");
            assert.equal(result[0].name, "User One");
            assert.equal(result[0].index, 0);
            assert.equal(result[1].email, "user2@company.com");
            assert.equal(result[1].name, "User Two");
            assert.equal(result[1].index, 1);
        });

        it("returns empty array when mla is not an array", () => {
            gmail.tracker.mla = null;
            
            let result = gmail.get.loggedin_accounts();
            
            assert.ok(Array.isArray(result));
            assert.equal(result.length, 0);
        });

        it("returns empty array when mla is undefined", () => {
            gmail.tracker.mla = undefined;
            
            let result = gmail.get.loggedin_accounts();
            
            assert.ok(Array.isArray(result));
            assert.equal(result.length, 0);
        });
    });

    describe("get.user_email", () => {
        it("returns email from tracker globals", () => {
            gmail.tracker.globals = [];
            gmail.tracker.globals[10] = "user@gmail.com";

            let result = gmail.get.user_email();
            
            assert.equal(result, "user@gmail.com");
        });

        it("returns null when no email found in globals and no DOM elements", () => {
            gmail.tracker.globals = [];

            let result = gmail.get.user_email();
            
            assert.equal(result, null);
        });

        it("returns email from DOM when not in globals", () => {
            gmail.tracker.globals = [];
            
            // Override document.getElementsByClassName temporarily
            const originalGetElementsByClassName = global.document.getElementsByClassName;
            global.document.getElementsByClassName = (className) => {
                if (className === "eYSAde") {
                    // Return an iterable array-like object
                    // Note: the code looks for innerHTML WITHOUT "@" symbol
                    const elements = [{ innerHTML: "userexample" }];
                    elements[Symbol.iterator] = Array.prototype[Symbol.iterator];
                    return elements;
                }
                return [];
            };

            let result = gmail.get.user_email();
            
            assert.equal(result, "userexample");
            
            // Restore original
            global.document.getElementsByClassName = originalGetElementsByClassName;
        });
    });

    describe("get.manager_email", () => {
        it("returns user email when not delegated inbox", () => {
            gmail.tracker.globals = [];
            gmail.tracker.globals[10] = "manager@gmail.com";
            
            // Mock is_delegated_inbox to return false
            gmail.helper.get.is_delegated_inbox = () => false;

            let result = gmail.get.manager_email();
            
            assert.equal(result, "manager@gmail.com");
        });

        it("returns delegated email when in delegated inbox", () => {
            // Mock is_delegated_inbox to return true
            gmail.helper.get.is_delegated_inbox = () => true;
            
            // Mock delegated_to_email
            gmail.get.delegated_to_email = () => "delegated@company.com";

            let result = gmail.get.manager_email();
            
            assert.equal(result, "delegated@company.com");
        });
    });

    describe("get.delegated_to_email", () => {
        it("returns null when not in delegated inbox", () => {
            gmail.helper.get.is_delegated_inbox = () => false;

            let result = gmail.get.delegated_to_email();
            
            assert.equal(result, null);
        });

        it("returns delegated user email when in delegated inbox", () => {
            gmail.helper.get.is_delegated_inbox = () => true;
            
            // Override window.location.pathname
            global.window.location.pathname = "/mail/u/1/";
            
            // Mock loggedin_accounts
            gmail.tracker.mla = [
                null,
                [
                    ["user1@gmail.com", null, null, 0, "User One"],
                    ["user2@company.com", null, null, 1, "User Two"]
                ]
            ];

            let result = gmail.get.delegated_to_email();
            
            assert.equal(result, "user2@company.com");
        });

        it("returns null when delegated user not found in accounts", () => {
            gmail.helper.get.is_delegated_inbox = () => true;
            
            // Override window.location.pathname
            global.window.location.pathname = "/mail/u/5/";
            
            // Mock loggedin_accounts
            gmail.tracker.mla = [
                null,
                [
                    ["user1@gmail.com", null, null, 0, "User One"],
                    ["user2@company.com", null, null, 1, "User Two"]
                ]
            ];

            let result = gmail.get.delegated_to_email();
            
            assert.equal(result, null);
        });
    });

    describe("get.localization", () => {
        it("returns locale from globals[17] ui subarray with URL", () => {
            gmail.tracker.globals = [];
            gmail.tracker.globals[17] = [
                ["ui", "https://example.com?hl=en-US", null, null, null, null, null, null, "de", null]
            ];

            let result = gmail.get.localization();
            
            // filter_locale strips region and returns only first 2 chars lowercase
            assert.equal(result, "en");
        });

        it("returns locale from globals[17] ui subarray fallback to index 8", () => {
            gmail.tracker.globals = [];
            gmail.tracker.globals[17] = [
                ["ui", null, null, null, null, null, null, null, "en", null]
            ];

            let result = gmail.get.localization();
            
            assert.equal(result, "en");
        });

        it("returns locale from globals[12] help article link", () => {
            gmail.tracker.globals = [];
            gmail.tracker.globals[17] = [];
            gmail.tracker.globals[12] = "https://support.google.com/mail?hl=fr";

            let result = gmail.get.localization();
            
            assert.equal(result, "fr");
        });

        it("returns locale from globals[4]", () => {
            gmail.tracker.globals = [];
            gmail.tracker.globals[17] = [];
            gmail.tracker.globals[12] = null;
            gmail.tracker.globals[4] = "something.de.something";

            let result = gmail.get.localization();
            
            assert.equal(result, "de");
        });

        it("returns null when no locale found", () => {
            gmail.tracker.globals = [];

            let result = gmail.get.localization();
            
            assert.equal(result, null);
        });
    });

    // Tests migrated from test.parsing.js
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
