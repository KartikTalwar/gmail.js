"use strict";
let assert = require('assert');
let Gmail = require('../src/gmail').Gmail;
let gmail = new Gmail(false);

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

// describe("Test tools for parsing new gmail body_params", () => {
//     const gmail = new Gmail();
//     const data =  JSON.parse(testData.new_gmail_archive_action_body_params);
//     const threads = gmail.tools.extract_from_graph(data, gmail.check.data.is_thread);
//     const threadData = threads.map(thread => gmail.tools.get_thread_data(thread))[0];

//     it("get thread id", () => {
//         const thread = gmail.tools.get_thread_id(threads[0]);

//         assert.equal(thread, 'thread-f:1603171109786600032');
//     });

//     it("get thread data", () => {
//         const mockThreadData = threads[0][2][7];
//         const threadData = gmail.tools.get_thread_data(threads[0]);

//         assert.deepEqual(threadData, mockThreadData);
//     });

//     it("get messages ids", () => {
//         const mockMessageIds = ['msg-f:1603171109786600032', 'msg-f:1603245801543734539', 'msg-f:1603245862071354412', 'msg-f:1603246018478443087', 'msg-f:1603256094012730022', 'msg-f:1603256564311088576', 'msg-f:1603256665279246114', 'msg-f:1603256682384715664', 'msg-f:1603376719891477511', 'msg-f:1603376909485932601', 'msg-f:1603376994923202634', 'msg-f:1603380395240179639'];
//         const messagesIds = gmail.tools.get_message_ids(threadData);

//         assert.equal(messagesIds.length, 12);
//         assert.deepEqual(messagesIds, mockMessageIds);
//     });

//     it("apply label event", () => {
// 		const threads_apply_label_data = JSON.parse(testData.new_gmail_apply_label_action_body_params);
// 		const threads_data = gmail.tools.extract_from_graph(threads_apply_label_data, gmail.check.data.is_thread);
// 		const apply_label_event = "label";
//     	const actionType = gmail.tools.check_event_type(threads_data[0]);

//     	assert.equal(actionType, apply_label_event);
//     });
// });
