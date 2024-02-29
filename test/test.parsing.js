"use strict";

let assert = require("assert");
let Gmail = require("../src/gmail").Gmail;

// let testData = require("./testdata-parser.js");

// let jsdom = require('jsdom');
// let jquery = require('jquery')(new jsdom.JSDOM().window);

// describe("Response-parsing", () => {

//     it("Handles JSON-responses consistently", () => {
//         var gmail = new Gmail();
//         var parsed = gmail.tools.parse_response(testData.parse_response_json_data);

//         assert.equal(2, parsed.length);
//         assert.equal(8, parsed[0].length);
//         assert.equal(8, parsed[1].length);
//     });

//     it("Handles visible_emails_post consistently", () => {
//         var gmail = new Gmail();
//         var emails = gmail.helper.get.visible_emails_post(testData.visible_emails_post_data);

//         assert.equal(17, emails.length);
//         assert.equal("Selfie", emails[0].title);
//     });

//     it("Handles email_data_post consistently", () => {
//         var gmail = new Gmail();
//         var email = gmail.helper.get.email_data_post(testData.email_data_post_data);

//         assert.equal("156559dc1867409f", email.first_email);
//         assert.equal("156559dc1867409f", email.thread_id);
//         assert.equal("Ny pålogging fra Chrome på Windows", email.subject);
//         assert.equal(2, email.people_involved.length);
//         assert.equal(1, email.total_emails);
//     });
// });

// describe("Attachment-parsing", () => {

//     var email_attachment_url_png = "";
//     var email_attachment_url_pdf = "";

//     it("Handles attachments URLs consistently", () => {
//         var gmail = new Gmail();

//         var testCases = [
//             {
//                 value: "image/png:typescript.png:https://mail.google.com/mail/u/0/?ui=2&ik=4b86ba4469&view=att&th=158de724051f63cf&attid=0.1&disp=safe&zw",
//                 type: "image/png",
//                 url: "https://mail.google.com/mail/u/0/?ui=2&ik=4b86ba4469&view=att&th=158de724051f63cf&attid=0.1&disp=safe&zw"
//             },
//             {
//                 value: "application/pdf:image2016-11-15-132610.pdf:https://mail.google.com/mail/u/0/?ui=2&ik=4b86ba4469&view=att&th=158de724051f63cf&attid=0.3&disp=safe&zw",
//                 type: "application/pdf",
//                 url: "https://mail.google.com/mail/u/0/?ui=2&ik=4b86ba4469&view=att&th=158de724051f63cf&attid=0.3&disp=safe&zw"
//             }
//         ];

//         for (var i=0; i < testCases.length; i++) {
//             var testCase = testCases[i];

//             var result = gmail.tools.parse_attachment_url(testCase.value);
//             assert.equal(result.type, testCase.type);
//             assert.equal(result.url, testCase.url);
//         }
//     });

// });

// describe("Sent-mail-parsing", () => {
//     it("Handles sent email JSON consistently", () => {
//         var gmail = new Gmail();
//         var data = JSON.parse(testData.new_gmail_sent_email_json);
//         var parsed = gmail.tools.parse_sent_message_payload(data);

//         assert.equal(parsed["1"], "msg-a:r1280593055912233690");
//         assert.equal(parsed.id, "msg-a:r1280593055912233690");
//         assert.equal(parsed.subject, "Test Parse Sent");
//         assert.equal(parsed.timestamp, "1562634059674");
//         assert.equal(parsed.content_html, "<div dir=\"ltr\">Test <a href=\"https://www.google.com\">Link </a>Test<br clear=\"all\"><div><br></div>-- <br><div dir=\"ltr\" class=\"gmail_signature\" data-smartmail=\"gmail_signature\"><div dir=\"ltr\"><div><div dir=\"ltr\"><div><div dir=\"ltr\">Thanks,<div><font size=\"4\" style=\"background-color:rgb(0,0,255)\" color=\"#3d85c6\"><br></font></div><div><font style=\"background-color:rgb(255,255,255)\" size=\"4\" color=\"#3d85c6\"><b>Eric Karlsson</b></font></div><div><font color=\"#cccccc\">Product Development</font></div><div><font color=\"#cccccc\">+1 240.688.9219&nbsp;<span></span><span></span></font></div><div><font color=\"#cccccc\"><br></font></div><div><br></div></div></div></div></div></div></div></div>");
//         assert.equal(parsed.ishtml, 1);
//         assert.deepStrictEqual(parsed.date, new Date("2019-07-09T01:00:59.674Z"));

//         assert.equal(parsed.from.name, "Eric Karlsson1");
//         assert.equal(parsed.from.address, "eric.karlsson1@gmail.com");

//         assert.equal(parsed.to.length, 2);
//         assert.equal(parsed.to[0].name, "Eric Karlsson2");
//         assert.equal(parsed.to[0].address, "eric.karlsson2@gmail.com");
//         assert.equal(parsed.to[1].name, undefined);
//         assert.equal(parsed.to[1].address, "eric.karlsson3@gmail.com");

//         assert.equal(parsed.cc.length, 2);
//         assert.equal(parsed.cc[0].name, undefined);
//         assert.equal(parsed.cc[0].address, "eric.karlsson4@gmail.com");
//         assert.equal(parsed.cc[1].name, undefined);
//         assert.equal(parsed.cc[1].address, "eric.karlsson5@gmail.com");

//         assert.equal(parsed.bcc.length, 2);
//         assert.equal(parsed.bcc[0].name, "Eric Karlsson6");
//         assert.equal(parsed.bcc[0].address, "eric.karlsson6@gmail.com");
//         assert.equal(parsed.bcc[1].name, "Eric Karlsson7");
//         assert.equal(parsed.bcc[1].address, "eric.karlsson7@gmail.com");

//         assert.equal(parsed.attachments.length, 2);
//         assert.equal(parsed.attachments[0].id, "f_jxv3xqgb1");
//         assert.equal(parsed.attachments[0].name, "Socket Error.PNG");
//         assert.equal(parsed.attachments[0].type, "image/png");
//         assert.equal(parsed.attachments[0].url, "https://mail.google.com/mail/?ui=2&ik=5a14ab333d&attid=0.1&permmsgid=msg-a:r1280593055912233690&view=att&realattid=f_jxv3xqgb1&zw");
//         assert.equal(parsed.attachments[0].size, 108256);
//         assert.equal(parsed.attachments[1].id, "f_jxv3xqg00");
//         assert.equal(parsed.attachments[1].name, "8002291_3.jpg");
//         assert.equal(parsed.attachments[1].type, "image/jpeg");
//         assert.equal(parsed.attachments[1].url, "https://mail.google.com/mail/?ui=2&ik=5a14ab333d&attid=0.2&permmsgid=msg-a:r1280593055912233690&view=att&realattid=f_jxv3xqg00&zw");
//         assert.equal(parsed.attachments[1].size, 2312479);

//         assert.ok(parsed.email_node);
//     });
// });

// describe("Current-page parsing", () => {
//     it("detects known pages", () => {
//         const gmail = new Gmail();
//         const testCases = {
//             "inbox": "inbox",
//             "inbox/14c313949290f26d": "email",
//             "inbox/14c313949290f26d?compose=new": "email",
//             "inbox/14c313949290f26d?compose=24c313949290f26d": "email",
//             "inbox/p2": "inbox",
//             "starred": "starred",
//             "sent": "sent",
//             "sent/14c313949290f26d": "email",
//             "sent/p2": "sent",
//             "drafts": "drafts",
//             "search/test": "search/test",
//             "category/social": "category/social",
//             "category/social/p2": "category/social",
//             "label/bank": "label/bank",
//             "label/bank/p2": "label/bank"
//         };

//         for (let testCaseValue in testCases) {
//             let expected = testCases[testCaseValue];

//             let result = gmail.get.current_page(testCaseValue);
//             assert.equal(result, expected);
//         }
//     });
// });

// describe("Name-parsing", () => {

//     const gmail = new Gmail();
//     const testName = function(source) {
//         const result = gmail.tools.extract_name(source + " <>");
//         assert.deepEqual(result, source);
//     };

//     it("handles no spaces in name", () => {
//         testName("Burt");
//     });

//     it("handles spaces in name", () => {
//         testName("Curt Cobain");
//     });

//     it("handles vikings", () => {
//         testName("Jostein Kjønigsen");
//     });

//     it("handles zeh germans", () => {
//         testName("Frunk Münster");
//     });

//     it("handles le frenchies", () => {
//         testName("Madamoselle Emálie");
//     });

//     it("handles mexicans", () => {
//         testName("Senõr Alapenõ on a stick");
//     });
// });

// describe("List-prefix checking", () => {
//     const gmail = new Gmail();

//     const testCase = function(list, searchee, expected) {
//         const result = gmail.helper.array_starts_with(list, searchee);
//         assert.equal(expected, result);
//     };

//     it("returns false for null or empty list", () => {
//         testCase(null, "key", false);
//         testCase([], "key", false);
//     });

//     it("returns false for miss", () => {
//         testCase(["ui", "yes"], "uiv", false);
//     });

//     it("returns true for exact hit", () => {
//         testCase(["ui", "yes"], "ui", true);
//     });
// });

// describe("Sub-list extraction", () => {
//     const gmail = new Gmail();

//     const testCase = function(listlist, prefix, expected) {
//         const result = gmail.helper.get.array_sublist(listlist, prefix);
//         assert.deepEqual(expected, result);
//     };

//     it("returns null for null or empty list", () => {
//         testCase(null, "ui", null);
//         testCase([], "ui", null);
//     });

//     it("returns null for no match", () => {
//         testCase([["uiv", "a"]], "ui", null);
//     });

//     it("returns the full matching list on match", () => {
//         testCase([
//             ["a", "b", "c"],
//             ["ui", "yeah"],
//             ["d", "e", "f"]
//         ], "ui", ["ui", "yeah"]);
//     });
// });

// describe("New Gmail data-format", () => {
//     const gmail = new Gmail();

//     it("Detects thread-id", () => {
//         assert.ok(gmail.check.data.is_thread_id("thread-a:r266633262821436756"));
//         assert.ok(!gmail.check.data.is_thread_id("^smartlabel_notification"));
//         assert.ok(!gmail.check.data.is_thread_id("something with thread-a:r266633262821436756"));
//         assert.ok(!gmail.check.data.is_thread_id("msg-a:r6431891629648253702"));
//     });

//     it("Detects thread-objects", () => {
//         assert.ok(gmail.check.data.is_thread({
//             "1": "thread-a:r266633262821436756"
//         }));
//         assert.ok(!gmail.check.data.is_thread({
//             "1": "msg-a:r6431891629648253702"
//         }));

//         assert.ok(!gmail.check.data.is_thread(null));
//         assert.ok(!gmail.check.data.is_thread({}));
//         assert.ok(!gmail.check.data.is_thread({
//             "1": "string"
//         }));
//         assert.ok(!gmail.check.data.is_thread({
//             "1": [
//                 "thread-a:r266633262821436756"
//             ]
//         }));
//     });

//     it("Detects new-style email-id", () => {
//         assert.ok(gmail.check.data.is_email_id("msg-a:r6431891629648253702"));
//         assert.ok(!gmail.check.data.is_email_id("^smartlabel_notification"));
//         assert.ok(!gmail.check.data.is_email_id("something with msg-a:r64318916296482537026"));
//         assert.ok(!gmail.check.data.is_email_id("thread-a:r266633262821436756"));
//         assert.ok(!gmail.check.data.is_email_id("16a0d1f820d515e3"));
//     });

//     it("Detects legacy-style email-id", () => {
//         assert.ok(gmail.check.data.is_legacy_email_id("16a0d1f820d515e3"));
//         assert.ok(!gmail.check.data.is_legacy_email_id("msg-a:r6431891629648253702"));
//     });

//     it("Detects email-objects", () => {
//         assert.ok(gmail.check.data.is_email({
//             "1": "msg-a:r6431891629648253702"
//         }));
//         assert.ok(gmail.check.data.is_email({
//             "1": "msg-f:6431891629648253702"
//         }));
//         assert.ok(!gmail.check.data.is_email({
//             "1": "thread-a:r266633262821436756"
//         }));
//         assert.ok(!gmail.check.data.is_email({
//             "1": "msg-a:bump-r266633262821436756"
//         }));

//         assert.ok(!gmail.check.data.is_email(null));
//         assert.ok(!gmail.check.data.is_email({}));
//         assert.ok(!gmail.check.data.is_email({
//             "1": "string"
//         }));
//         assert.ok(!gmail.check.data.is_email({
//             "1": [
//                 "msg-a:r6431891629648253702"
//             ]
//         }));
//         assert.ok(!gmail.check.data.is_email({
//             "1": [
//                 "msg-a:bump-r6431891629648253702"
//             ]
//         }));
//     });

//     it("Detects smart-label arrays", () => {
//         const testee = gmail.check.data.is_smartlabels_array;
//         assert.ok(testee(["^a", "^pfg", "^woo"]));
//         assert.ok(!testee(["a", "pfg", "woo"]));
//         assert.ok(!testee([1, 2, 3, 4]));
//     });

//     it ("Detects JSON-strings", () => {
//         const testee = gmail.check.data.is_json_string;
//         assert.ok(testee("{\"a\": 1}"));
//         assert.ok(testee("[1, 2, 3]"));

//         assert.ok(!testee("{abc"));
//         assert.ok(!testee("[1, 2, 3"));
//         assert.ok(!testee("{1, 2, 3"));
//         assert.ok(!testee("[1, 2, 3}"));
//         assert.ok(!testee("{1, 2, 3]"));

//         assert.ok(testee("{\"a\": 1}\n"));
//         assert.ok(testee("[1, 2, 3]\n"));
//     });
// });

// describe("Graph-traversal", () => {
//     const gmail = new Gmail();
//     const testee = gmail.tools.extract_from_graph;

//     it("Does not crash on null-object", () => {
//         testee(null, () => true);
//     });

//     it("Does not crash on empty object", () => {
//         testee({}, () => true);
//     });

//     it("Crashes on null-predicate.", () => {
//         try {
//             testee({}, null);
//             testee({a: "a"}, null);
//             testee({}, undefined);
//             testee({a: "a"}, undefined);
//             assert.fail("Should have failed!");
//         } catch(err) {
//             assert.ok(true);
//         }
//     });

//     it("Can extract from root-node based on criteria", () => {
//         let result = testee({
//             "1": "identifier"
//         }, (item) => { return item["1"] === "identifier";});
//         assert.equal(1, result.length);
//     });

//     it("Can extract from direct child-node(s) based on criteria", () => {
//         const testObj = {
//             child1: {
//                 "1": "identifier",
//                 "id": "child1"
//             },
//             child2: {
//                 "1": "identifier",
//                 "id": "child2"
//             }
//         };
//         let result = testee(testObj, (item) => { return item["1"] === "identifier";});
//         assert.equal(2, result.length);

//         assert.equal("child1", result[0].id);
//         assert.equal("child2", result[1].id);
//     });

//     it("Can extract from deep child-node(s) based on criteria", () => {
//         const testObj = {
//             child1: {
//                 "1": "identifier",
//                 "id": "child1"
//             },
//             nested: {
//                 nesteder: {
//                     child2: {
//                         "1": "identifier",
//                         "id": "child2"
//                     }
//                 }
//             }
//         };
//         let result = testee(testObj, (item) => { return item["1"] === "identifier";});
//         assert.equal(2, result.length);

//         assert.equal("child1", result[0].id);
//         assert.equal("child2", result[1].id);
//     });

//     it("Can extract from arrays in the graph based on criteria", () => {
//         const testObj = {
//             nested: {
//                 nesteder: {
//                     children: [
//                         {
//                             "1": "identifier",
//                             "id": "child1"
//                         },
//                         {
//                             "1": "identifier",
//                             "id": "child2"
//                         }
//                     ]
//                 }
//             }
//         };
//         let result = testee(testObj, (item) => { return item["1"] === "identifier";});
//         assert.equal(2, result.length);

//         assert.equal("child1", result[0].id);
//         assert.equal("child2", result[1].id);
//     });

//     it("Masks failure in probing function, when accesing non-existant data", () => {
//         const testObj = {
//             "a": "a"
//         };
//         let result = testee(testObj, (item) => {
//             return item[0]["a"].substring(5) === "z";
//         });
//         assert.equal(0, result.length);
//     });

//     it("Can extract arrays when predicate matches", () => {
//         const expected = [1,2,3];
//         const testObj = {
//             "a": expected
//         };
//         let result = testee(testObj, Array.isArray);
//         assert.equal(1, result.length);
//         assert.equal(expected, result[0]);
//     });

//     it("Can extract node when root-object is array", () => {
//         const testObj = [ "boo", "abc" ];
//         let result = testee(testObj, (item) => { return item === "abc"; });
//         assert.equal(1, result.length);
//         assert.equal("abc", result[0]);
//     });
// });

// describe("New Gmail event-triggering", () => {
//     const gmail = new Gmail();
//     const testCase = (data, asserts) => {
//         const events = {};
//         const params = {
//             body_params: JSON.parse(data)
//         };
//         // we must force, because request_payload tries to do URL detection
//         gmail.tools.parse_request_payload(params, events, true);
//         asserts(events);
//     };

//     // TODO: refactor these tests into the same form as those below.
//     it("Triggers for send_email", () => {
//         testCase(testData.new_gmail_send_email_data, (events) => {
//             assert.ok(events.send_message);
//         });
//     });
//     it("Triggers for archive", () => {
//         testCase(testData.new_gmail_archive_action_body_params, (events) => {
//             assert.ok(events.archive);
//         });
//     });
//     it("Triggers for new_email", () => {
//         testCase(testData.new_gmail_new_email_body_params, (events) => {
//             assert.ok(events.new_email);
//         });
//     });

//     // it("Extracts compose-id", () => {

//     // });
// });

// describe("New Gmail event-parsing", () => {
//     const gmail = new Gmail();
//     const data = JSON.parse(testData.new_gmail_archive_action_body_params);
//     const threads = gmail.tools.extract_from_graph(data, gmail.check.data.is_thread);
//     const threadData = threads.map(thread => gmail.tools.get_thread_data(thread))[0];

//     let testXhrEventParsing = function (jsonXhrData, eventName) {
//         const api = new Gmail();
//         const xhrData = JSON.parse(jsonXhrData);

//         const threads = api.tools.extract_from_graph(xhrData, api.check.data.is_thread);
//         const actionType = api.tools.check_event_type(threads[0]);

//         assert.equal(eventName, actionType);
//     };

//     it("parses archived messages", () => {
//         const xhrData = testData.new_gmail_archive_action_body_params;
//         testXhrEventParsing(xhrData, "archive");
//     });

//     it("parses deleted messages", () => {
//         const xhrData = testData.new_gmail_delete_action_body_params;
//         testXhrEventParsing(xhrData, "delete");
//     });

//     it("parses read messages", () => {
//         const xhrData = testData.new_gmail_read_action_body_params;
//         testXhrEventParsing(xhrData, "read");
//     });

//     it("parses unread messages", () => {
//         const xhrData = testData.new_gmail_unread_action_body_params;
//         testXhrEventParsing(xhrData, "unread");
//     });

//     it("parses open_email messages", () => {
//         const xhrData = testData.new_gmail_open_email_action_body_params;
//         testXhrEventParsing(xhrData, "open_email");
//     });

//     it("parses new_email message", () => {
//         const xhrData = testData.new_gmail_new_email_body_params;
//         testXhrEventParsing(xhrData, "new_email");
//     });
// });

// describe("ID-compatibility (new->old)", () => {
//     const gmail = new Gmail();
//     const validEmailLegacyId = "16a0d1f820d515e2";
//     const validEmailNewId = "msg-a:12345";
//     const invalidEmailNewId = "msg-a:12346";

//     const email = { foo: "bar" };
//     email.id = validEmailNewId;
//     email.legacy_email_id = validEmailLegacyId;
//     gmail.cache.emailIdCache[validEmailNewId] = email;
//     gmail.cache.emailLegacyIdCache[validEmailLegacyId] = email;

//     const elem = {
//         dataset: {
//             "messageId": "#" + validEmailNewId,
//             legacyMessageId: validEmailLegacyId
//         }
//     };
//     const domEmail = {
//         id: validEmailLegacyId,
//         $el: [ elem ]
//     };


//     it("Provides null from null-valued legacy ID", () => {
//         const res = gmail.helper.get.legacy_email_id(null);
//         assert.equal(null, res);
//     });

//     it("Provides legacy ID from legacy ID", () => {
//         const res = gmail.helper.get.legacy_email_id(validEmailLegacyId);
//         assert.equal(res, validEmailLegacyId);
//     });

//     it("Provides legacy ID from emailData object", () => {
//         const res = gmail.helper.get.legacy_email_id(email);
//         assert.equal(res, validEmailLegacyId);
//     });

//     it("Provides legacy ID from HTML element", () => {
//         const res = gmail.helper.get.legacy_email_id(elem);
//         assert.equal(res, validEmailLegacyId);
//     });

//     it("Provides legacy ID from DomEmail object", () => {
//         const res = gmail.helper.get.legacy_email_id(domEmail);
//         assert.equal(res, validEmailLegacyId);
//     });

//     it("Provides legacy ID from valid new-style ID", () => {
//         const res = gmail.helper.get.legacy_email_id(validEmailNewId);
//         assert.equal(res, validEmailLegacyId);
//     });

//     it("Returns null from invalid new-style ID (doesn't crash!)", () => {
//         const res = gmail.helper.get.legacy_email_id(invalidEmailNewId);
//         assert.equal(res, null);
//     });

//     it("Shows warning when provided new but expecting old", () => {
//         let warnInvoked = false;
//         let origWarnFunc = console.warn;
//         console.warn = () => {
//             warnInvoked = true;
//         };

//         let res = gmail.helper.get.legacy_email_id(validEmailNewId);

//         console.warn = origWarnFunc;
//         assert.equal(true, warnInvoked);
//     });
// });

// describe("ID-compatibility (old->new)", () => {
//     const gmail = new Gmail();
//     const validEmailLegacyId = "16a0d1f820d515e2";
//     const validEmailNewId = "msg-a:12345";
//     const invalidEmailLegacyid = "16a0d1f820d515e3";

//     const email = { foo: "bar" };
//     email.id = validEmailNewId;
//     email.legacy_email_id = validEmailLegacyId;
//     gmail.cache.emailIdCache[validEmailNewId] = email;
//     gmail.cache.emailLegacyIdCache[validEmailLegacyId] = email;

//     const elem = {
//         dataset: {
//             "messageId": "#" + validEmailNewId,
//             "legacyMessageId": validEmailLegacyId
//         }
//     };
//     const domEmail = {
//         id: validEmailLegacyId,
//         $el: [ elem ]
//     };

//     it("Provides null from null-valued ID", () => {
//         const res = gmail.helper.get.new_email_id(null);
//         assert.equal(null, res);
//     });

//     it("Provides new ID from new ID", () => {
//         const res = gmail.helper.get.new_email_id(validEmailNewId);
//         assert.equal(res, validEmailNewId);
//     });

//     it("Provides new ID from emailData object", () => {
//         const res = gmail.helper.get.new_email_id(email);
//         assert.equal(res, validEmailNewId);
//     });

//     it("Provides new ID from HTML element", () => {
//         const res = gmail.helper.get.new_email_id(elem);
//         assert.equal(res, validEmailNewId);
//     });

//     it("Provides new ID from DomEmail object", () => {
//         const res = gmail.helper.get.new_email_id(domEmail);
//         assert.equal(res, validEmailNewId);
//     });

//     it("Provides new ID from valid legacy-style ID", () => {
//         const res = gmail.helper.get.new_email_id(validEmailLegacyId);
//         assert.equal(res, validEmailNewId);
//     });

//     it("Returns null from invalid legacy-style ID (doesn't crash!)", () => {
//         const res = gmail.helper.get.new_email_id(invalidEmailLegacyid);
//         assert.equal(res, null);
//     });

//     it("Returns null on unrecognized input", () => {
//         const res = gmail.helper.get.new_email_id("jgkldfjgdfkljgdfkl");
//         assert.equal(null, res);
//     });

//     it("Shows warning when provided old but expecting new", () => {
//         let warnInvoked = false;
//         let origWarnFunc = console.warn;
//         console.warn = () => {
//             warnInvoked = true;
//         };

//         let res = gmail.helper.get.new_email_id(validEmailLegacyId);

//         console.warn = origWarnFunc;
//         assert.equal(true, warnInvoked);
//     });
// });

// describe("ID-compatibility (old->thread)", () => {
//     const gmail = new Gmail();
//     const validThreadId = "thread-a:r266633262821436756";
//     const validEmailNewId = "msg-a:12345";
//     const validEmailLegacyId = "16a0d1f820d515e2";

//     const email = {
//         thread_id: validThreadId,
//         id: validEmailNewId,
//         legacy_email_id: validEmailLegacyId
//     };
//     gmail.cache.emailIdCache[validEmailNewId] = email;
//     gmail.cache.emailLegacyIdCache[validEmailLegacyId] = email;

//     const emailElem = {
//         dataset: {
//             "messageId": "#" + validEmailNewId,
//             "legacyMessageId": validEmailLegacyId
//         }
//     };
//     const domEmail = {
//         id: validEmailLegacyId,
//         $el: [ emailElem ]
//     };

//     const threadElem = {
//         dataset: {
//             threadPermId: "#" + validThreadId
//         }
//     };
//     const domThread = {
//         $el: [ threadElem ]
//     };

//     it("Provides null from null-valued ID", () => {
//         const res = gmail.helper.get.thread_id(null);
//         assert.equal(null, res);
//     });

//     it("Provides thread ID from thread ID", () => {
//         const res = gmail.helper.get.thread_id(validThreadId);
//         assert.equal(res, validThreadId);
//     });

//     it("Provides thread ID from emailData", () => {
//         const res = gmail.helper.get.thread_id(email);
//         assert.equal(res, validThreadId);
//     });

//     it("Provides thread ID from new email ID", () => {
//         const res = gmail.helper.get.thread_id(validEmailNewId);
//         assert.equal(res, validThreadId);
//     });

//     it("Provides thread ID from legacy email ID", () => {
//         const res = gmail.helper.get.thread_id(validEmailLegacyId);
//         assert.equal(res, validThreadId);
//     });

//     it("Provides thread ID from DomThread object", () => {
//         const res = gmail.helper.get.thread_id(domThread);
//         assert.equal(res, validThreadId);
//     });

//     it("Provides thread ID from DomEmail object", () => {
//         const res = gmail.helper.get.thread_id(domEmail);
//         assert.equal(res, validThreadId);
//     });

//     it("Returns null on unrecognized input", () => {
//         const res = gmail.helper.get.thread_id("u8gjkldejgkldfjklgdfjkl");
//         assert.equal(res, null);
//     });

//     it("Shows warning when provided email-id instead of thread-id", () => {
//         let warnInvoked = false;
//         let origWarnFunc = console.warn;
//         console.warn = () => {
//             warnInvoked = true;
//         };

//         let res = gmail.helper.get.thread_id(validEmailNewId);

//         console.warn = origWarnFunc;
//         assert.equal(true, warnInvoked);
//     });

//     it("Shows warning when provided legacy email-id instead of thread-id", () => {
//         let warnInvoked = false;
//         let origWarnFunc = console.warn;
//         console.warn = () => {
//             warnInvoked = true;
//         };

//         let res = gmail.helper.get.thread_id(validEmailLegacyId);

//         console.warn = origWarnFunc;
//         assert.equal(true, warnInvoked);
//     });
// });

// describe("Compose-email-parsing", () => {

//     it("Handles single thread id", () => {
//         var gmail = new Gmail(jquery);

//         var element = jquery('<div><div class="M9 AD"><input name="rt" value="#thread-f:1610056787031797158"/></div></div>').find(".M9");
//         var compose = new gmail.dom.compose(element);

//         assert.equal(compose.thread_id(), "thread-f:1610056787031797158");
//     });

//     it("Handles thread id joined with message id", () => {
//         var gmail = new Gmail(jquery);

//         var element = jquery('<div><div class="M9 AD"><input name="rt" value="thread-f:1610056787031797155|msg-f:1610056787031797158"/></div></div>').find(".M9");
//         var compose = new gmail.dom.compose(element);

//         assert.equal(compose.thread_id(), "thread-f:1610056787031797155|msg-f:1610056787031797158");
//     });
// });

// describe("Test tools for parsing XHR bv-request-payload-response", () => {

//     var xhrDataJSON = require("./testdata-parser-json/testdata-parser-bv-request-payload.json");
//     var gmail = new Gmail();
//     var parsed = gmail.tools.parse_bv_request_payload(xhrDataJSON);

//     it("Response is an array of 5 elements", () => {
//         assert.equal(Array.isArray(parsed),true);
//         assert.equal(parsed.length,5);
//     });

//     it("Handles Thread-1 Email-1 JSON consistently", () => {
//         assert.equal(parsed[0].id, "msg-a:r-5459297729901660292");
//         assert.equal(parsed[0].legacy_email_id, "171bb0399636172e");
//         assert.equal(parsed[0].thread_id, "thread-a:r873907427374440696");
//         assert.equal(parsed[0].smtp_id, "");
//         assert.equal(parsed[0].is_draft, false);
//         assert.equal(parsed[0].subject, "Working from home: The future of business is remote");
//         assert.equal(parsed[0].timestamp, 1587980507491);
//         assert.equal(parsed[0].content_html, "");
//         assert.deepStrictEqual(parsed[0].date, new Date("2020-04-27T09:41:47.491Z"));
//         assert.equal(parsed[0].from.address, 'elonm@gmail.com');
//         assert.equal(parsed[0].from.name, 'Elon' );
//         assert.equal((parsed[0].to).length, 0);
//         assert.equal((parsed[0].cc).length, 0);
//         assert.equal((parsed[0].bcc).length, 0);
//         assert.equal((parsed[0].attachments).length, 0);
//     });
//     it("Handles Thread-1 Email-2 JSON consistently", () => {
//         assert.equal(parsed[1].id, "msg-f:1665118316230599953");
//         assert.equal(parsed[1].legacy_email_id, "171bb04953ebe511");
//         assert.equal(parsed[1].thread_id, "thread-a:r873907427374440696");
//         assert.equal(parsed[1].smtp_id, "");
//         assert.equal(parsed[1].is_draft, false);
//         assert.equal(parsed[1].subject, "Working from home: The future of business is remote");
//         assert.equal(parsed[1].timestamp, 1587980571966);
//         assert.equal(parsed[1].content_html, "");
//         assert.deepStrictEqual(parsed[1].date, new Date("2020-04-27T09:42:51.966Z"));
//         assert.equal(parsed[1].from.address, 'Eric@gmail.com');
//         assert.equal(parsed[1].from.name, 'Eric');
//         assert.equal((parsed[1].to).length, 0);
//         assert.equal((parsed[1].cc).length, 0);
//         assert.equal((parsed[1].bcc).length, 0);
//         assert.equal((parsed[1].attachments).length, 0);
//     });
//     it("Handles Thread-2 Email-1 JSON consistently", () => {
//         assert.equal(parsed[2].id, "msg-a:r-7004022322083187773");
//         assert.equal(parsed[2].legacy_email_id, "171bafdd8d3f48bb");
//         assert.equal(parsed[2].thread_id, "thread-a:r-7005674805299871901");
//         assert.equal(parsed[2].smtp_id, "");
//         assert.equal(parsed[2].is_draft, false);
//         assert.equal(parsed[2].subject, "Ubuntu 20.04 Download Link & New Features (Updated)");
//         assert.equal(parsed[2].timestamp, 1587980130515);
//         assert.equal(parsed[2].content_html, "");
//         assert.deepStrictEqual(parsed[2].date, new Date("2020-04-27T09:35:30.515Z"));
//         assert.equal(parsed[2].from.address, 'elonm@gmail.com');
//         assert.equal(parsed[2].from.name, 'Elon' );
//         assert.equal((parsed[2].to).length, 0);
//         assert.equal((parsed[2].cc).length, 0);
//         assert.equal((parsed[2].bcc).length, 0);
//         assert.equal((parsed[2].attachments).length, 0);
//     });
//     it("Handles Thread-2 Email-2 JSON consistently", () => {
//         assert.equal(parsed[3].id, "msg-f:1665117937823393243");
//         assert.equal(parsed[3].legacy_email_id, "171baff1391825db");
//         assert.equal(parsed[3].thread_id, "thread-a:r-7005674805299871901");
//         assert.equal(parsed[3].smtp_id, "");
//         assert.equal(parsed[3].is_draft, false);
//         assert.equal(parsed[3].subject, "Ubuntu 20.04 Download Link & New Features (Updated)");
//         assert.equal(parsed[3].timestamp, 1587980211089);
//         assert.equal(parsed[3].content_html, "");
//         assert.deepStrictEqual(parsed[3].date, new Date("2020-04-27T09:36:51.089Z"));
//         assert.equal(parsed[3].from.address, 'Eric@gmail.com');
//         assert.equal(parsed[3].from.name, 'Eric' );
//         assert.equal((parsed[3].to).length, 0);
//         assert.equal((parsed[3].cc).length, 0);
//         assert.equal((parsed[3].bcc).length, 0);
//         assert.equal((parsed[3].attachments).length, 0);
//     });
//     it("Handles Thread-2 Email-3 JSON consistently", () => {
//         assert.equal(parsed[4].id, "msg-f:1665118117266291066");
//         assert.equal(parsed[4].legacy_email_id, "171bb01b00b9797a");
//         assert.equal(parsed[4].thread_id, "thread-a:r-7005674805299871901");
//         assert.equal(parsed[4].smtp_id, "");
//         assert.equal(parsed[4].is_draft, false);
//         assert.equal(parsed[4].subject, "Ubuntu 20.04 Download Link & New Features (Updated)");
//         assert.equal(parsed[4].timestamp, 1587980382219);
//         assert.equal(parsed[4].content_html, "");
//         assert.deepStrictEqual(parsed[4].date, new Date("2020-04-27T09:39:42.219Z"));
//         assert.equal(parsed[4].from.address, 'Eric@gmail.com');
//         assert.equal(parsed[4].from.name, 'Eric' );
//         assert.equal((parsed[4].to).length, 0);
//         assert.equal((parsed[4].cc).length, 0);
//         assert.equal((parsed[4].bcc).length, 0);
//         assert.equal((parsed[4].attachments).length, 0);
//     });
// });

// describe("Test tools for parsing bv-embedded-data", () => {

//     var xhrDataJSON = require("./testdata-parser-json/testdata-parser-bv-embedded.json");
//     var gmail = new Gmail();
//     var parsed = gmail.tools.parse_bv_embedded_json(xhrDataJSON);

//     it("JSON Data is an array of 5 elements", () => {
//         assert.equal(Array.isArray(parsed),true);
//         assert.equal(parsed.length,5);
//     });

//     it("Handles Thread-1 Email-1 JSON consistently", () => {
//         assert.equal(parsed[0].id, "msg-a:r-5459297729901660292");
//         assert.equal(parsed[0].legacy_email_id, "171bb0399636172e");
//         assert.equal(parsed[0].thread_id, "thread-a:r873907427374440696");
//         assert.equal(parsed[0].smtp_id, "");
//         assert.equal(parsed[0].is_draft, false);
//         assert.equal(parsed[0].subject, "Working from home: The future of business is remote");
//         assert.equal(parsed[0].timestamp, 1587980507491);
//         assert.equal(parsed[0].content_html, "");
//         assert.deepStrictEqual(parsed[0].date, new Date("2020-04-27T09:41:47.491Z"));
//         assert.equal(parsed[0].from.address, 'elonm@gmail.com');
//         assert.equal(parsed[0].from.name, 'Elon' );
//         assert.equal((parsed[0].to).length, 0);
//         assert.equal((parsed[0].cc).length, 0);
//         assert.equal((parsed[0].bcc).length, 0);
//         assert.equal((parsed[0].attachments).length, 0);
//     });
//     it("Handles Thread-1 Email-2 JSON consistently", () => {
//         assert.equal(parsed[1].id, "msg-f:1665118316230599953");
//         assert.equal(parsed[1].legacy_email_id, "171bb04953ebe511");
//         assert.equal(parsed[1].thread_id, "thread-a:r873907427374440696");
//         assert.equal(parsed[1].smtp_id, "");
//         assert.equal(parsed[1].is_draft, false);
//         assert.equal(parsed[1].subject, "Working from home: The future of business is remote");
//         assert.equal(parsed[1].timestamp, 1587980571966);
//         assert.equal(parsed[1].content_html, "");
//         assert.deepStrictEqual(parsed[1].date, new Date("2020-04-27T09:42:51.966Z"));
//         assert.equal(parsed[1].from.address, 'Eric@gmail.com');
//         assert.equal(parsed[1].from.name, 'Eric');
//         assert.equal((parsed[1].to).length, 0);
//         assert.equal((parsed[1].cc).length, 0);
//         assert.equal((parsed[1].bcc).length, 0);
//         assert.equal((parsed[1].attachments).length, 0);
//     });
//     it("Handles Thread-2 Email-1 JSON consistently", () => {
//         assert.equal(parsed[2].id, "msg-a:r-7004022322083187773");
//         assert.equal(parsed[2].legacy_email_id, "171bafdd8d3f48bb");
//         assert.equal(parsed[2].thread_id, "thread-a:r-7005674805299871901");
//         assert.equal(parsed[2].smtp_id, "");
//         assert.equal(parsed[2].is_draft, false);
//         assert.equal(parsed[2].subject, "Ubuntu 20.04 Download Link & New Features (Updated)");
//         assert.equal(parsed[2].timestamp, 1587980130515);
//         assert.equal(parsed[2].content_html, "");
//         assert.deepStrictEqual(parsed[2].date, new Date("2020-04-27T09:35:30.515Z"));
//         assert.equal(parsed[2].from.address, 'elonm@gmail.com');
//         assert.equal(parsed[2].from.name, 'Elon' );
//         assert.equal((parsed[2].to).length, 0);
//         assert.equal((parsed[2].cc).length, 0);
//         assert.equal((parsed[2].bcc).length, 0);
//         assert.equal((parsed[2].attachments).length, 0);
//     });
//     it("Handles Thread-2 Email-2 JSON consistently", () => {
//         assert.equal(parsed[3].id, "msg-f:1665117937823393243");
//         assert.equal(parsed[3].legacy_email_id, "171baff1391825db");
//         assert.equal(parsed[3].thread_id, "thread-a:r-7005674805299871901");
//         assert.equal(parsed[3].smtp_id, "");
//         assert.equal(parsed[3].is_draft, false);
//         assert.equal(parsed[3].subject, "Ubuntu 20.04 Download Link & New Features (Updated)");
//         assert.equal(parsed[3].timestamp, 1587980211089);
//         assert.equal(parsed[3].content_html, "");
//         assert.deepStrictEqual(parsed[3].date, new Date("2020-04-27T09:36:51.089Z"));
//         assert.equal(parsed[3].from.address, 'Eric@gmail.com');
//         assert.equal(parsed[3].from.name, 'Eric' );
//         assert.equal((parsed[3].to).length, 0);
//         assert.equal((parsed[3].cc).length, 0);
//         assert.equal((parsed[3].bcc).length, 0);
//         assert.equal((parsed[3].attachments).length, 0);
//     });
//     it("Handles Thread-2 Email-3 JSON consistently", () => {
//         assert.equal(parsed[4].id, "msg-f:1665118117266291066");
//         assert.equal(parsed[4].legacy_email_id, "171bb01b00b9797a");
//         assert.equal(parsed[4].thread_id, "thread-a:r-7005674805299871901");
//         assert.equal(parsed[4].smtp_id, "");
//         assert.equal(parsed[4].subject, "Ubuntu 20.04 Download Link & New Features (Updated)");
//         assert.equal(parsed[4].timestamp, 1587980382219);
//         assert.equal(parsed[4].content_html, "");
//         assert.deepStrictEqual(parsed[4].date, new Date("2020-04-27T09:39:42.219Z"));
//         assert.equal(parsed[4].from.address, 'Eric@gmail.com');
//         assert.equal(parsed[4].from.name, 'Eric' );
//         assert.equal((parsed[4].to).length, 0);
//         assert.equal((parsed[4].cc).length, 0);
//         assert.equal((parsed[4].bcc).length, 0);
//         assert.equal((parsed[4].attachments).length, 0);
//     });

// });

describe("Test tools for parsing fd-embedded-data", () => {

    var xhrDataJSON = require("./testdata-parser-json/testdata-parser-fd-embedded.json");
    var gmail = new Gmail(false);
    var parsed = gmail.tools.parse_fd_embedded_json(xhrDataJSON);

    it("JSON Data is an array of 5 elements", () => {
        assert.equal(Array.isArray(parsed),true);
        assert.equal(parsed.length,5);
    });

    it("Handles Thread-1 Email-1 JSON consistently", () => {
        assert.equal(parsed[0].id, "msg-f:1743836977043622489");
        assert.equal(parsed[0].legacy_email_id, "18335a7dcae04a59");
        assert.equal(parsed[0].thread_id, "thread-f:1743836977043622489|msg-f:1743836977043622489");
        assert.equal(parsed[0].smtp_id, "<491e0008-2936-f0e2-171a-3d696268b5b7@secure.kjonigsen.net>");
        assert.equal(parsed[0].is_draft, false);
        assert.equal(parsed[0].subject, "Test email 4");
        assert.equal(parsed[0].timestamp, 1663052537006);
        assert.equal(parsed[0].content_html, "\r\n  \r\n\r\n    \r\n  \r\n  <div text=\"#000000\" bgcolor=\"#FFFFFF\">\r\n    <p><br>\r\n    </p>\r\n    <div>-- <br>\r\n      Vennlig hilsen<br>\r\n      <b>Jostein Kjønigsen</b><br>\r\n      <br>\r\n      <a href=\"mailto:jostein@kjonigsen.net\" target=\"_blank\">jostein@kjonigsen.net</a> 🍵 <a href=\"mailto:jostein@gmail.com\" target=\"_blank\">jostein@gmail.com</a><br>\r\n      <a href=\"https://jostein.kjønigsen.no\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://jostein.kj%C3%B8nigsen.no&amp;source=gmail&amp;ust=1663141446701000&amp;usg=AOvVaw2SHvrfYqS0EavwByBx-sPx\">https://jostein.kjønigsen.no</a></div>\r\n  </div>\r\n\r\n");
        assert.deepStrictEqual(parsed[0].date, new Date("2022-09-13T07:02:17.006Z"));
        assert.equal(parsed[0].from.address, 'jostein@secure.kjonigsen.net');
        assert.equal(parsed[0].from.name, 'Jostein Kjønigsen' );
        assert.equal((parsed[0].to).length, 1);
        assert.equal((parsed[0].cc).length, 0);
        assert.equal((parsed[0].bcc).length, 0);

        assert.equal((parsed[0].attachments).length, 1);
        assert.equal((parsed[0].attachments[0].attachment_id), "0.0.2");
        assert.equal((parsed[0].attachments[0].name), "invite.ics");
        assert.equal((parsed[0].attachments[0].type), "application/ics");
        assert.equal((parsed[0].attachments[0].url), "https://mail.google.com/mail/?ui=0&ik=99e3eb73b5&attid=0.0.2&permmsgid=msg-f:1743836977043622489&th=18335a7f90a24d19&view=att&zw");
        assert.equal((parsed[0].attachments[0].size), 1564);
    });
//     it("Handles Thread-1 Email-2 JSON consistently", () => {
//         assert.equal(parsed[1].id, "msg-f:1665117937823393243");
//         assert.equal(parsed[1].legacy_email_id, "171baff1391825db");
//         assert.equal(parsed[1].thread_id, "thread-a:r-7005674805299871901");
//         assert.equal(parsed[1].smtp_id, "<5b58a962565085f4c392f5efdc8e14c6@gmail.com>");
//         assert.equal(parsed[1].is_draft, false);
//         assert.equal(parsed[1].subject, "Re: Ubuntu 20.04 Download Link & New Features (Updated)");
//         assert.equal(parsed[1].timestamp, 1587980211089);
//         assert.equal(parsed[1].content_html, "<div style=\"font-size:10pt;font-family:Verdana,Geneva,sans-serif\">\r\n<p>Le 27.04.2020 11:35, Elon a écrit :</p>\r\n<blockquote type=\"cite\" style=\"padding:0 0.4em;border-left:#1010ff 2px solid;margin:0\">\r\n<div style=\"margin:0;padding:0;font-family:monospace\">Six months of blood, sweat and development tears have gone in Ubuntu<br> 20.04 LTS (which is codenamed &quot;Focal Fossa&quot;) resulting in substantial<br> set of improvements that improve just about every part of the OS, from<br> boot speed to app appearance to bundled software.</div>\r\n</blockquote>\r\n<p>What a good news !!</p>\r\n<div> </div>\r\n<div id=\"m_-5081263041899088781gtx-anchor\" style=\"width:32px;height:15px\"> </div>\r\n<div style=\"opacity:1\"> </div>\r\n</div>\r\n");
//         assert.deepStrictEqual(parsed[1].date, new Date("2020-04-27T09:36:51.089Z"));
//         assert.equal(parsed[1].from.address, 'billg@gmail.com');
//         assert.equal(parsed[1].from.name, 'Bill' );
//         assert.equal((parsed[1].to).length, 1);
//         assert.equal((parsed[1].cc).length, 0);
//         assert.equal((parsed[1].bcc).length, 0);

//         assert.equal((parsed[1].attachments).length, 1);
//         assert.equal((parsed[1].attachments[0].attachment_id), "0.1");
//         assert.equal((parsed[1].attachments[0].name), "Ubuntu_20.04.txt");
//         assert.equal((parsed[1].attachments[0].type), "text/plain");
//         assert.equal((parsed[1].attachments[0].url), "https://mail.google.com/mail/?ui=2&ik=74384930e0&attid=0.1&permmsgid=msg-f:1665117937823393243&th=171baff1391825db&view=att&zw");
//         assert.equal((parsed[1].attachments[0].size), 1017);
//     });
//     it("Handles Thread-1 Email-3 JSON consistently", () => {
//         assert.equal(parsed[2].id, "msg-f:1665118117266291066");
//         assert.equal(parsed[2].legacy_email_id, "171bb01b00b9797a");
//         assert.equal(parsed[2].thread_id, "thread-a:r-7005674805299871901");
//         assert.equal(parsed[2].smtp_id, "<c96c9295f5c709a52a93c77cb0c79414@gmail.com>");
//         assert.equal(parsed[2].is_draft, false);
//         assert.equal(parsed[2].subject, "Re: Ubuntu 20.04 Download Link & New Features (Updated)");
//         assert.equal(parsed[2].timestamp, 1587980382219);
//         assert.equal(parsed[2].content_html, "<div style=\"font-size:10pt;font-family:Verdana,Geneva,sans-serif\">\r\n<p>Le 27.04.2020 11:35, Elon a écrit :</p>\r\n<blockquote type=\"cite\" style=\"padding:0 0.4em;border-left:#1010ff 2px solid;margin:0\">\r\n<div style=\"margin:0;padding:0;font-family:monospace\">Six months of blood, sweat and development tears have gone in Ubuntu<br> 20.04 LTS (which is codenamed &quot;Focal Fossa&quot;) resulting in substantial<br> set of improvements that improve just about every part of the OS, from<br> boot speed to app appearance to bundled software.</div>\r\n</blockquote>\r\n<p>What a good news !!</p>\r\n<p><br></p>\r\n\r\n</div>\r\n");
//         assert.deepStrictEqual(parsed[2].date, new Date("2020-04-27T09:39:42.219Z"));
//         assert.equal(parsed[2].from.address, 'billg@gmail.com');
//         assert.equal(parsed[2].from.name, 'Bill' );
//         assert.equal((parsed[2].to).length, 1);
//         assert.equal((parsed[2].cc).length, 4);
//         assert.equal((parsed[2].bcc).length, 0);

//         assert.equal((parsed[2].attachments).length, 1);
//         assert.equal((parsed[2].attachments[0].attachment_id), "0.1");
//         assert.equal((parsed[2].attachments[0].name), "Ubuntu_20.04.txt");
//         assert.equal((parsed[2].attachments[0].type), "text/plain");
//         assert.equal((parsed[2].attachments[0].url), "https://mail.google.com/mail/?ui=2&ik=74384930e0&attid=0.1&permmsgid=msg-f:1665118117266291066&th=171bb01b00b9797a&view=att&zw");
//         assert.equal((parsed[2].attachments[0].size), 1017);
//     });

//     it("Handles Thread-2 Email-1 JSON consistently", () => {
//         assert.equal(parsed[3].id, "msg-a:r-5459297729901660292");
//         assert.equal(parsed[3].legacy_email_id, "171bb0399636172e");
//         assert.equal(parsed[3].thread_id, "thread-a:r873907427374440696");
//         assert.equal(parsed[3].smtp_id, "<CAHqB=tDjJtq9QsjipXxqx4UE07nmSkDib1XqH0Wi0R7JU8vEmg@mail.gmail.com>");
//         assert.equal(parsed[3].is_draft, false);
//         assert.equal(parsed[3].subject, "Working from home: The future of business is remote");
//         assert.equal(parsed[3].timestamp, 1587980507491);
//         assert.equal(parsed[3].content_html, 'Look at that :<br>\n<br>\n<a href="https://www.zdnet.com/topic/working-from-home-the-future-of-business-is-remote/" rel="noreferrer" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.zdnet.com/topic/working-from-home-the-future-of-business-is-remote/&amp;source=gmail&amp;ust=1588080055397000&amp;usg=AFQjCNFw4ieC-R6dtbDTR40ZenLfL7nBEQ">https://www.zdnet.com/topic/wo<wbr>rking-from-home-the-future-of-<wbr>business-is-remote/</a><br>\n');
//         assert.deepStrictEqual(parsed[3].date, new Date("2020-04-27T09:41:47.491Z"));
//         assert.equal(parsed[3].from.address, 'elonm@gmail.com');
//         assert.equal(parsed[3].from.name, 'Elon' );
//         assert.equal((parsed[3].to).length, 2);
//         assert.equal((parsed[3].cc).length, 2);
//         assert.equal((parsed[3].bcc).length,2);

//         assert.equal((parsed[3].attachments).length, 1);
//         assert.equal((parsed[3].attachments[0].attachment_id), "0.1");
//         assert.equal((parsed[3].attachments[0].name), "work.txt");
//         assert.equal((parsed[3].attachments[0].type), "text/plain");
//         assert.equal((parsed[3].attachments[0].url), "https://mail.google.com/mail/?ui=2&ik=74384930e0&attid=0.1&permmsgid=msg-a:r-5459297729901660292&th=171bb0399636172e&view=att&realattid=f_k9ial9ll0&zw");
//         assert.equal((parsed[3].attachments[0].size), 278);
//     });
//     it("Handles Thread-2 Email-2 JSON consistently", () => {
//         assert.equal(parsed[4].id, "msg-f:1665118316230599953");
//         assert.equal(parsed[4].legacy_email_id, "171bb04953ebe511");
//         assert.equal(parsed[4].thread_id, "thread-a:r873907427374440696");
//         assert.equal(parsed[4].smtp_id, "<9d1446ea46e626b2fb391c5a3e047b17@gmail.com>");
//         assert.equal(parsed[4].is_draft, false);
//         assert.equal(parsed[4].subject, "Re: Working from home: The future of business is remote");
//         assert.equal(parsed[4].timestamp, 1587980571966);
//         assert.equal(parsed[4].content_html, "<div style=\"font-size:10pt;font-family:Verdana,Geneva,sans-serif\">\r\n<p>Le 27.04.2020 11:41, Elon a écrit :</p>\r\n<blockquote type=\"cite\" style=\"padding:0 0.4em;border-left:#1010ff 2px solid;margin:0\">\r\n<div style=\"margin:0;padding:0;font-family:monospace\">Look at that :<br> <br> <a href=\"https://www.zdnet.com/topic/working-from-home-the-future-of-business-is-remote/\" rel=\"noopener noreferrer\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://www.zdnet.com/topic/working-from-home-the-future-of-business-is-remote/&amp;source=gmail&amp;ust=1588080055401000&amp;usg=AFQjCNG_krhm2eOEABPFDZaVWRr3Ay1WXQ\">https://www.zdnet.com/topic/<wbr>working-from-home-the-future-<wbr>of-business-is-remote/</a></div>\r\n</blockquote>\r\n<p>Sure</p>\r\n<p><br></p>\r\n\r\n</div>\r\n");
//         assert.deepStrictEqual(parsed[4].date, new Date("2020-04-27T09:42:51.966Z"));
//         assert.equal(parsed[4].from.address, 'billg@gmail.com');
//         assert.equal(parsed[4].from.name, 'Bill');
//         assert.equal((parsed[4].to).length, 1);
//         assert.equal((parsed[4].cc).length, 4);
//         assert.equal((parsed[4].bcc).length, 0);

//         assert.equal((parsed[4].attachments).length, 1);
//         assert.equal((parsed[4].attachments[0].attachment_id), "0.1");
//         assert.equal((parsed[4].attachments[0].name), "work.txt");
//         assert.equal((parsed[4].attachments[0].type), "text/plain");
//         assert.equal((parsed[4].attachments[0].url), "https://mail.google.com/mail/?ui=2&ik=74384930e0&attid=0.1&permmsgid=msg-f:1665118316230599953&th=171bb04953ebe511&view=att&zw");
//         assert.equal((parsed[4].attachments[0].size), 278);
//     });
});

// describe("Test tools for parsing fd-request-data", () => {

//     var xhrDataJSON = require("./testdata-parser-json/testdata-parser-fd-request.json");
//     var gmail = new Gmail();
//     var parsed = gmail.tools.parse_fd_request_payload(xhrDataJSON);

//     it("JSON Data is an array of 2 elements", () => {
//         assert.equal(Array.isArray(parsed), true);
//         assert.equal(parsed.length, 2);
//     });

//     it("Handles Thread-1 Email-1 JSON consistently", () => {
//         assert.equal(parsed[0].id, "msg-a:r-4871072856822866136");
//         assert.equal(parsed[0].legacy_email_id, "17c3d9041ec7d0a5");
//         assert.equal(parsed[0].thread_id, "thread-a:r-4872725344334517560");
//         assert.equal(parsed[0].smtp_id, "<CAMiVxa0a5q7XjJspKZ3UEk0AuxY46ES6AXOZWcj-A1MWNZbUWQ@mail.gmail.com>");
//         assert.equal(parsed[0].is_draft, true);
//         assert.equal(parsed[0].subject, "test subject");
//         assert.equal(parsed[0].timestamp, 1633120436716);
//         assert.equal(parsed[0].content_html, "<div dir=\"ltr\"><br></div>\r\n");
//         assert.deepStrictEqual(parsed[0].date, new Date("2021-10-01T20:33:56.716Z"));
//         assert.equal(parsed[0].from.address, 'user@gmail.com');
//         assert.equal(parsed[0].from.name, 'First Last');
//         assert.equal((parsed[0].to).length, 0);
//         assert.equal((parsed[0].cc).length, 0);
//         assert.equal((parsed[0].bcc).length, 0);
//         assert.equal((parsed[0].attachments).length, 0);
//     });
//     it("Handles Thread-2 Email-1 JSON consistently", () => {
//         assert.equal(parsed[1].id, "msg-a:r-4871072856822866136");
//         assert.equal(parsed[1].legacy_email_id, "17c3d9364dec527d");
//         assert.equal(parsed[1].thread_id, "thread-a:r-4872725344334517560");
//         assert.equal(parsed[1].smtp_id, "<CAMiVxa2V12sQtPvzoDe-HssF4-HXf3uouNCM2RBntb54nX4uag@mail.gmail.com>");
//         assert.equal(parsed[1].is_draft, false);
//         assert.equal(parsed[1].subject, "test subject");
//         assert.equal(parsed[1].timestamp, 1633120642270);
//         assert.equal(parsed[1].content_html, "<div dir=\"ltr\">aaa</div>\r\n");
//         assert.deepStrictEqual(parsed[1].date, new Date("2021-10-01T20:37:22.270Z"));
//         assert.equal(parsed[1].from.address, 'user@gmail.com');
//         assert.equal(parsed[1].from.name, 'First Last');
//         assert.equal((parsed[1].to).length, 1);
//         assert.equal((parsed[1].cc).length, 0);
//         assert.equal((parsed[1].bcc).length, 0);
//         assert.equal((parsed[1].attachments).length, 0);
//     });

// });

// describe("Test parsing logged in accounts data", () => {
//     const mlaDataJSON = require("./testdata-parser-json/testdata-parser-mla.json");
//     const gmail = new Gmail();
//     gmail.tracker.mla = mlaDataJSON;

//     it("Handles mla data correctly", () => {
//         const result = gmail.get.loggedin_accounts();

//         assert.equal(result.length, 4);
//         assert.equal(result[0].name, "Gmail Dev");
//         assert.equal(result[0].email, "user2@gsuite2.com");
//         assert.equal(result[0].index, 3);
//         assert.equal(result[1].name, "Primary One");
//         assert.equal(result[1].email, "primary@gmail.com");
//         assert.equal(result[1].index, 0);
//         assert.equal(result[2].name, "Стефанія Мамо");
//         assert.equal(result[2].email, "mamo.stefania@gmail.com");
//         assert.equal(result[2].index, 1);
//         assert.equal(result[3].name, "Jack Sparrow");
//         assert.equal(result[3].email, "Jack.Sparrow@gsuite1.net");
//         assert.equal(result[3].index, 2);
//     })
// });
