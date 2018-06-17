"use strict";
let assert = require('assert');
let Gmail = require('../src/gmail').Gmail;
let gmail = new Gmail();

const testData = require("./testdata-parser.js");

function testXhrEventParsing(jsonXhrData, eventName) {
    const api = new Gmail();
    const xhrData = JSON.parse(jsonXhrData);

    const threads = api.tools.extract_from_graph(xhrData, api.check.data.is_thread);
    const actionType = api.tools.check_event_type(threads[0]);

    assert.equal(eventName, actionType);
};

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

describe("Test tools for parsing new gmail body_params", () => {
    const gmail = new Gmail();

    it("parses archived messages", () => {
        const xhrData = testData.new_gmail_archive_action_body_params;
        testXhrEventParsing(xhrData, "archive");
    });

    it("parses deleted messages", () => {
        const xhrData = testData.new_gmail_delete_action_body_params;
        testXhrEventParsing(xhrData, "delete");
    });

    it("parses read messages", () => {
        const xhrData = testData.new_gmail_read_action_body_params;
        testXhrEventParsing(xhrData, "read");
    });

    it("parses unread messages", () => {
        const xhrData = testData.new_gmail_unread_action_body_params;
        testXhrEventParsing(xhrData, "unread");
    });

    it("parses open_email messages", () => {
        const xhrData = testData.new_gmail_open_email_action_body_params;
        testXhrEventParsing(xhrData, "open_email");
    });
});
