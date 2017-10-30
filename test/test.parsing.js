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
