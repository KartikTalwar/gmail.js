"use strict";

let assert = require("assert");
let Gmail = require("../src/gmail").Gmail;

let testData = require("./testdata-parser.js");

describe("Response-parsing", () => {

    it("Handles JSON-responses consistently", () => {
        var gmail = new Gmail();
        var parsed = gmail.tools.parse_response(testData.parse_response_json_data);

        assert.equal(2, parsed.length);
        assert.equal(8, parsed[0].length);
        assert.equal(8, parsed[1].length);
    });

    it("Handles visible_emails_post consistently", () => {
        var gmail = new Gmail();
        var emails = gmail.helper.get.visible_emails_post(testData.visible_emails_post_data);

        assert.equal(17, emails.length);
        assert.equal("Selfie", emails[0].title);
    });

    it("Handles email_data_post consistently", () => {
        var gmail = new Gmail();
        var email = gmail.helper.get.email_data_post(testData.email_data_post_data);

        assert.equal("156559dc1867409f", email.first_email);
        assert.equal("156559dc1867409f", email.thread_id);
        assert.equal("Ny pålogging fra Chrome på Windows", email.subject);
        assert.equal(2, email.people_involved.length);
        assert.equal(1, email.total_emails);
    });
});

describe("Attachment-parsing", () => {

    var email_attachment_url_png = "";
    var email_attachment_url_pdf = "";

    it("Handles attachments URLs consistently", () => {
        var gmail = new Gmail();

        var testCases = [
            {
                value: "image/png:typescript.png:https://mail.google.com/mail/u/0/?ui=2&ik=4b86ba4469&view=att&th=158de724051f63cf&attid=0.1&disp=safe&zw",
                type: "image/png",
                url: "https://mail.google.com/mail/u/0/?ui=2&ik=4b86ba4469&view=att&th=158de724051f63cf&attid=0.1&disp=safe&zw"
            },
            {
                value: "application/pdf:image2016-11-15-132610.pdf:https://mail.google.com/mail/u/0/?ui=2&ik=4b86ba4469&view=att&th=158de724051f63cf&attid=0.3&disp=safe&zw",
                type: "application/pdf",
                url: "https://mail.google.com/mail/u/0/?ui=2&ik=4b86ba4469&view=att&th=158de724051f63cf&attid=0.3&disp=safe&zw"
            }
        ];

        for (var i=0; i < testCases.length; i++) {
            var testCase = testCases[i];

            var result = gmail.tools.parse_attachment_url(testCase.value);
            assert.equal(result.type, testCase.type);
            assert.equal(result.url, testCase.url);
        }
    });

});

describe("Current-page parsing", () => {
    it("detects known pages", () => {
        const gmail = new Gmail();
        const testCases = {
            "inbox": "inbox",
            "inbox/14c313949290f26d": "email",
            "inbox/14c313949290f26d?compose=new": "email",
            "inbox/14c313949290f26d?compose=24c313949290f26d": "email",
            "inbox/p2": "inbox",
            "starred": "starred",
            "sent": "sent",
            "sent/14c313949290f26d": "email",
            "sent/p2": "sent",
            "drafts": "drafts",
            "search/test": "search/test",
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
});

describe("Name-parsing", () => {

    const gmail = new Gmail();
    const testName = function(source) {
        const result = gmail.tools.extract_name(source + " <>");
        assert.deepEqual(result, source);
    };

    it("handles no spaces in name", () => {
        testName("Burt");
    });

    it("handles spaces in name", () => {
        testName("Curt Cobain");
    });

    it("handles vikings", () => {
        testName("Jostein Kjønigsen");
    });

    it("handles zeh germans", () => {
        testName("Frunk Münster");
    });

    it("handles le frenchies", () => {
        testName("Madamoselle Emálie");
    });

    it("handles mexicans", () => {
        testName("Senõr Alapenõ on a stick");
    });
});

describe("List-prefix checking", () => {
    const gmail = new Gmail();

    const testCase = function(list, searchee, expected) {
        const result = gmail.helper.array_starts_with(list, searchee);
        assert.equal(expected, result);
    };

    it("returns false for null or empty list", () => {
        testCase(null, "key", false);
        testCase([], "key", false);
    });

    it("returns false for miss", () => {
        testCase(["ui", "yes"], "uiv", false);
    });

    it("returns true for exact hit", () => {
        testCase(["ui", "yes"], "ui", true);
    });
});

describe("Sub-list extraction", () => {
    const gmail = new Gmail();

    const testCase = function(listlist, prefix, expected) {
        const result = gmail.helper.get.array_sublist(listlist, prefix);
        assert.deepEqual(expected, result);
    };

    it("returns null for null or empty list", () => {
        testCase(null, "ui", null);
        testCase([], "ui", null);
    });

    it("returns null for no match", () => {
        testCase([["uiv", "a"]], "ui", null);
    });

    it("returns the full matching list on match", () => {
        testCase([
            ["a", "b", "c"],
            ["ui", "yeah"],
            ["d", "e", "f"]
        ], "ui", ["ui", "yeah"]);
    });
});

describe("New Gmail data-format", () => {
    const gmail = new Gmail();

    it("Detects thread-id", () => {
        assert.ok(gmail.check.data.is_thread_id("thread-a:r266633262821436756"));
        assert.ok(!gmail.check.data.is_thread_id("^smartlabel_notification"));
        assert.ok(!gmail.check.data.is_thread_id("something with thread-a:r266633262821436756"));
        assert.ok(!gmail.check.data.is_thread_id("msg-a:r6431891629648253702"));
    });

    it("Detects thread-objects", () => {
        assert.ok(gmail.check.data.is_thread({
            "1": "thread-a:r266633262821436756"
        }));
        assert.ok(!gmail.check.data.is_thread({
            "1": "msg-a:r6431891629648253702"
        }));

        assert.ok(!gmail.check.data.is_thread(null));
        assert.ok(!gmail.check.data.is_thread({}));
        assert.ok(!gmail.check.data.is_thread({
            "1": "string"
        }));
        assert.ok(!gmail.check.data.is_thread({
            "1": [
                "thread-a:r266633262821436756"
            ]
        }));
    });

    it("Detects email-id", () => {
        assert.ok(gmail.check.data.is_email_id("msg-a:r6431891629648253702"));
        assert.ok(!gmail.check.data.is_email_id("^smartlabel_notification"));
        assert.ok(!gmail.check.data.is_email_id("something with msg-a:r64318916296482537026"));
        assert.ok(!gmail.check.data.is_email_id("thread-a:r266633262821436756"));
    });

    it("Detects email-objects", () => {
        assert.ok(gmail.check.data.is_email({
            "1": "msg-a:r6431891629648253702"
        }));
        assert.ok(gmail.check.data.is_email({
            "1": "msg-f:6431891629648253702"
        }));
        assert.ok(!gmail.check.data.is_email({
            "1": "thread-a:r266633262821436756"
        }));
        assert.ok(!gmail.check.data.is_email({
            "1": "msg-a:bump-r266633262821436756"
        }));

        assert.ok(!gmail.check.data.is_email(null));
        assert.ok(!gmail.check.data.is_email({}));
        assert.ok(!gmail.check.data.is_email({
            "1": "string"
        }));
        assert.ok(!gmail.check.data.is_email({
            "1": [
                "msg-a:r6431891629648253702"
            ]
        }));
        assert.ok(!gmail.check.data.is_email({
            "1": [
                "msg-a:bump-r6431891629648253702"
            ]
        }));
    });

    it("Detects smart-label arrays", () => {
        const testee = gmail.check.data.is_smartlabels_array;
        assert.ok(testee(["^a", "^pfg", "^woo"]));
        assert.ok(!testee(["a", "pfg", "woo"]));
        assert.ok(!testee([1, 2, 3, 4]));
    });

    it ("Detects JSON-strings", () => {
        const testee = gmail.check.data.is_json_string;
        assert.ok(testee("{\"a\": 1}"));
        assert.ok(testee("[1, 2, 3]"));

        assert.ok(!testee("{abc"));
        assert.ok(!testee("[1, 2, 3"));
        assert.ok(!testee("{1, 2, 3"));
        assert.ok(!testee("[1, 2, 3}"));
        assert.ok(!testee("{1, 2, 3]"));

        assert.ok(testee("{\"a\": 1}\n"));
        assert.ok(testee("[1, 2, 3]\n"));
    });
});

describe("Graph-traversal", () => {
    const gmail = new Gmail();
    const testee = gmail.tools.extract_from_graph;

    it("Does not crash on null-object", () => {
        testee(null, () => true);
    });

    it("Does not crash on empty object", () => {
        testee({}, () => true);
    });

    it("Crashes on null-predicate.", () => {
        try {
            testee({}, null);
            testee({a: "a"}, null);
            testee({}, undefined);
            testee({a: "a"}, undefined);
            assert.fail("Should have failed!");
        } catch(err) {
            assert.ok(true);
        }
    });

    it("Can extract from root-node based on criteria", () => {
        let result = testee({
            "1": "identifier"
        }, (item) => { return item["1"] === "identifier";});
        assert.equal(1, result.length);
    });

    it("Can extract from direct child-node(s) based on criteria", () => {
        const testObj = {
            child1: {
                "1": "identifier",
                "id": "child1"
            },
            child2: {
                "1": "identifier",
                "id": "child2"
            }
        };
        let result = testee(testObj, (item) => { return item["1"] === "identifier";});
        assert.equal(2, result.length);

        assert.equal("child1", result[0].id);
        assert.equal("child2", result[1].id);
    });

    it("Can extract from deep child-node(s) based on criteria", () => {
        const testObj = {
            child1: {
                "1": "identifier",
                "id": "child1"
            },
            nested: {
                nesteder: {
                    child2: {
                        "1": "identifier",
                        "id": "child2"
                    }
                }
            }
        };
        let result = testee(testObj, (item) => { return item["1"] === "identifier";});
        assert.equal(2, result.length);

        assert.equal("child1", result[0].id);
        assert.equal("child2", result[1].id);
    });

    it("Can extract from arrays in the graph based on criteria", () => {
        const testObj = {
            nested: {
                nesteder: {
                    children: [
                        {
                            "1": "identifier",
                            "id": "child1"
                        },
                        {
                            "1": "identifier",
                            "id": "child2"
                        }
                    ]
                }
            }
        };
        let result = testee(testObj, (item) => { return item["1"] === "identifier";});
        assert.equal(2, result.length);

        assert.equal("child1", result[0].id);
        assert.equal("child2", result[1].id);
    });

    it("Masks failure in probing function, when accesing non-existant data", () => {
        const testObj = {
            "a": "a"
        };
        let result = testee(testObj, (item) => {
            return item[0]["a"].substring(5) === "z";
        });
        assert.equal(0, result.length);
    });

    it("Can extract arrays when predicate matches", () => {
        const expected = [1,2,3];
        const testObj = {
            "a": expected
        };
        let result = testee(testObj, Array.isArray);
        assert.equal(1, result.length);
        assert.equal(expected, result[0]);
    });

    it("Can extract node when root-object is array", () => {
        const testObj = [ "boo", "abc" ];
        let result = testee(testObj, (item) => { return item === "abc"; });
        assert.equal(1, result.length);
        assert.equal("abc", result[0]);
    });
});

describe("New Gmail event-triggering", () => {
    const gmail = new Gmail();
    const testCase = (data, asserts) => {
        const events = {};
        const params = {
            body_params: JSON.parse(data)
        };
        // we must force, because requset_payload tries to do URL detection
        gmail.tools.parse_request_payload(params, events, true);
        asserts(events);
    };

    // TODO: refactor these tests into the same form as those below.
    it("Triggers for send_email", () => {
        testCase(testData.new_gmail_send_email_data, (events) => {
            assert.ok(events.send_message);
        });
    });
    it("Triggers for archive", () => {
        testCase(testData.new_gmail_archive_action_body_params, (events) => {
            assert.ok(events.archive);
        });
    });
    it("Triggers for new_email", () => {
        testCase(testData.new_gmail_new_email_body_params, (events) => {
            assert.ok(events.new_email);
        });
    });

    // it("Extracts compose-id", () => {

    // });
});

describe("New Gmail event-parsing", () => {
    const gmail = new Gmail();
    const data = JSON.parse(testData.new_gmail_archive_action_body_params);
    const threads = gmail.tools.extract_from_graph(data, gmail.check.data.is_thread);
    const threadData = threads.map(thread => gmail.tools.get_thread_data(thread))[0];

    let testXhrEventParsing = function (jsonXhrData, eventName) {
        const api = new Gmail();
        const xhrData = JSON.parse(jsonXhrData);

        const threads = api.tools.extract_from_graph(xhrData, api.check.data.is_thread);
        const actionType = api.tools.check_event_type(threads[0]);

        assert.equal(eventName, actionType);
    };

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

    it("parses new_email message", () => {
        const xhrData = testData.new_gmail_new_email_body_params;
        testXhrEventParsing(xhrData, "new_email");
    });
});
