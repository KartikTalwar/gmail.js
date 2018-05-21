"use strict";
let assert = require('assert');
let Gmail = require('../src/gmail').Gmail;
let gmail = new Gmail();

const testData = require("./testdata-parser.js");

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
    const data =  JSON.parse(testData.new_gmail_archive_action_body_params);
    const mockMessageIds = ['msg-f:1600724307680265309', 'msg-f:1600724938213937205', 'msg-f:1600725174437456906', 'msg-f:1600725319255992336', 'msg-f:1600725448529658711'];
    const mockThreadData = data[2][7];

    it("get thread id", () => {
        const thread = gmail.tools.get_thread_id(data);

        assert.equal(thread, 'thread-f:1600724307680265309');
    });
    it("get thread data", () => {
        const threadData = gmail.tools.get_thread_data(data);

        assert.deepEqual(threadData, mockThreadData);
    });
    it("get messages ids", () => {
        const threadData = gmail.tools.get_thread_data(data);
        const messagesIds = gmail.tools.get_message_ids(threadData);

        assert.equal(messagesIds.length, 5);
        assert.deepEqual(messagesIds, mockMessageIds);
    });
    it("get action type", () => {
        const threadData = gmail.tools.get_thread_data(data);
        const action = gmail.tools.get_action_type(threadData);

        assert.equal(action, "^a");
    });
    it("is action type isset in thread object", () => {
        const threadData = gmail.tools.get_thread_data(data);
        const issetAction = gmail.check.data.is_action(threadData);

        assert.equal(issetAction, true);
    });
});
