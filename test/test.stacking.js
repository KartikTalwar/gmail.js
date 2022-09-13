"use strict";

let assert = require("assert");
let jsdom = require("jsdom");
let jquery = require("jquery")(new jsdom.JSDOM().window);
let GmailOld = require("gmail-js").Gmail;
let Gmail = require("../src/gmail").Gmail;

let testData = require("./testdata-parser.js");

function XMLHttpRequestMock() {}
XMLHttpRequestMock.prototype.open = (method, url, async, user, password) => {
    // console.log('executing original open XHR method...');
};
XMLHttpRequestMock.prototype.send = (body) => {
    // console.log('executing original send XHR method...');
};

describe("New Gmail event-triggering(in case of stacked current gmail.js instances)", () => {
    let gmail1, gmail2, gmail3;

    beforeEach(() => {
        const window = new jsdom.JSDOM().window;
        global.window = window;
        global.performance = window.performance;
        window["GM_SPT_ENABLED"] = "true";  // for new data layer

        // inner gmail.js instance
        gmail1 = new Gmail(jquery);
        // middle gmail.js instance
        gmail2 = new Gmail(jquery);
        // outer gmail.js instance
        gmail3 = new Gmail(jquery);

        global.document = window.document;  // done after the instantiations to avoid initial XHR patching

        gmail1.helper.get_xhr_window = gmail2.helper.get_xhr_window = gmail3.helper.get_xhr_window = function() {
            return {
                XMLHttpRequest: XMLHttpRequestMock
            };
        };
    });

    // it("Triggers for send_email", () => {
    //     try {
    //         let sendMessageTriggered = '';
    //         // set event listeners
    //         gmail1.observe.before('send_message', function (url, body, data, xhr) {
    //             sendMessageTriggered += 'c';
    //         });
    //         gmail2.observe.before('send_message', function (url, body, data, xhr) {
    //             sendMessageTriggered += 'b';
    //         });
    //         gmail3.observe.before('send_message', function (url, body, data, xhr) {
    //             sendMessageTriggered += 'a';
    //         });

    //         // trigger XHR call
    //         const mockedRequest = new XMLHttpRequestMock();
    //         mockedRequest.open('POST', 'https://example.web.email.client.com/sync/u/0/i/s?hl=en&c=21');
    //         mockedRequest.send(testData.new_gmail_sent_email_json);

    //         assert.equal(sendMessageTriggered, 'abc', 'Not all "send_message" event handlers were triggered.');
    //     } catch (e) {
    //         assert.fail(e);
    //     }
    // });

    afterEach(() => {
        global.document = undefined;
    });
});

describe("New Gmail event-triggering(in case of stacked old & current gmail.js instances)", () => {
    let gmail1, gmail2, gmail3;

    beforeEach(() => {
        const window = new jsdom.JSDOM().window;
        global.window = window;
        global.performance = window.performance;
        window["GM_SPT_ENABLED"] = "true";  // for new data layer

        /**
         * GmailOld(outer) -> Gmail(inner)(present test case) works
         * Gmail(outer) -> GmailOld(inner) currently breaks for GmailOld(unless some cleanup is done in current version, before sending the original request)
         */
        // inner gmail.js instance
        gmail1 = new Gmail(jquery);
        // middle gmail.js instance
        gmail2 = new Gmail(jquery);
        // outer gmail.js instance
        gmail3 = new GmailOld(jquery);

        global.document = window.document;  // done after the instantiations, to avoid the initial XHR patching

        gmail1.helper.get_xhr_window = gmail2.helper.get_xhr_window = gmail3.helper.get_xhr_window = function() {
            return {
                XMLHttpRequest: XMLHttpRequestMock
            };
        };
    });

    // it("Triggers for send_email", () => {
    //     try {
    //         let sendMessageTriggered = '';
    //         // set event listeners
    //         gmail1.observe.before('send_message', function (url, body, data, xhr) {
    //             sendMessageTriggered += 'c';
    //         });
    //         gmail2.observe.before('send_message', function (url, body, data, xhr) {
    //             sendMessageTriggered += 'b';
    //         });
    //         gmail3.observe.before('send_message', function (url, body, data, xhr) {
    //             sendMessageTriggered += 'a';
    //         });

    //         // trigger XHR call
    //         const mockedRequest = new XMLHttpRequestMock();
    //         mockedRequest.open('POST', 'https://example.web.email.client.com/sync/u/0/i/s?hl=en&c=21');
    //         mockedRequest.send(testData.new_gmail_sent_email_json);

    //         assert.equal(sendMessageTriggered, 'abc', 'Not all "send_message" mixed event handlers were triggered.');
    //     } catch (e) {
    //         assert.fail(e);
    //     }
    // });

    afterEach(() => {
        global.document = undefined;
    });
});
