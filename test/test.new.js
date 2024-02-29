"use strict";
let assert = require('assert');
let Gmail = require('../src/gmail').Gmail;
let gmail = new Gmail(false);

// prep cache for tests
const validEmailLegacyId = "16a0d1f820d515e2";
const validEmailNewId = "msg-a:12345";
const invalidEmailLegacyid = "16a0d1f820d515e3";
const invalidEmailNewId = "msg-a:12346";
const email = { foo: "bar" };
email.id = validEmailNewId;
email.legacy_email_id = validEmailLegacyId;

gmail.cache.emailIdCache[validEmailNewId] = email;
gmail.cache.emailLegacyIdCache[validEmailLegacyId] = email;

let thread = { bar: "foo" };
let validThreadId = "thread-a:12345";
gmail.cache.threadCache[validThreadId] = thread;


describe("gmail.new.get", () => {
    const elem = {
        dataset: {
            "messageId": validEmailNewId
        }
    };

    it("email_id() can look up based on HTML elements", () => {
        let id = gmail.new.get.email_id(elem);
        assert.equal(id, validEmailNewId);
    });

    it("email_id() can look up based on DomEmail instance", () => {
        let domEmail = {
            $el: [elem]
        };
        let id = gmail.new.get.email_id(domEmail);
        assert.equal(id, validEmailNewId);
    });

    it("email_data() can look up based on legacy-style IDs, with warning", () => {
        let res = gmail.new.get.email_data(validEmailLegacyId);
        assert.equal(res, email);
    });

    it("email_data() returns null when looking up invalid legacy-style IDs", () => {
        let res = gmail.new.get.email_data(invalidEmailLegacyid);
        assert.equal(res, null);
    });

    it("email_data() creates warning when looking up legacy-style IDs", () => {
        let warnInvoked = false;
        let origWarnFunc = console.warn;
        console.warn = () => {
            warnInvoked = true;
        };

        let res = gmail.new.get.email_data(validEmailLegacyId);

        console.warn = origWarnFunc;
        assert.equal(true, warnInvoked);
    });

    it("email_data() can look up based on new-style IDs", () => {
        let res = gmail.new.get.email_data(validEmailNewId);
        assert.equal(res, email);
    });

    it("email_data() returns null when looking up invalid new-style IDs", () => {
        let res = gmail.new.get.email_data(invalidEmailNewId);
        assert.equal(res, null);
    });

    it("email_data() returns looks up current email_id when provided null-value", () => {
        let origFunc = gmail.new.get.email_id;

        gmail.new.get.email_id = () => { return validEmailNewId; };

        let res = gmail.new.get.email_data();
        assert.equal(res, email);

        gmail.new.get.email_id = origFunc;
    });

    it("email_data() returns null without warning when email_id not resolved", () => {
        let warnInvoked = false;
        let origWarnFunc = console.warn;
        console.warn = () => {
            warnInvoked = true;
        };

        let origIdFunc = gmail.new.get.email_id;
        gmail.new.get.email_id = () => { return null; };

        let res = gmail.new.get.email_data();

        gmail.new.get.email_id = origIdFunc;
        console.warn = origWarnFunc;

        assert.equal(false, warnInvoked);
        assert.equal(null, res);
    });

    it("thread_data() resolves thread", () => {
        let res = gmail.new.get.thread_data(validThreadId);
        assert.equal(res, thread);
    });

    it("thread_data() looks up current thread_id when provided null-value", () => {
        let origFunc = gmail.new.get.thread_id;

        gmail.new.get.thread_id = () => { return validThreadId; };

        let res = gmail.new.get.thread_data();
        assert.equal(res, thread);

        gmail.new.get.thread_id = origFunc;
    });

    it("thread_data() returns null without warning when thread_id not resolved", () => {
        let warnInvoked = false;
        let origWarnFunc = console.warn;
        console.warn = () => {
            warnInvoked = true;
        };

        let origIdFunc = gmail.new.get.thread_id;
        gmail.new.get.thread_id = () => { return null; };

        let res = gmail.new.get.thread_data();

        gmail.new.get.thread_id = origIdFunc;
        console.warn = origWarnFunc;

        assert.equal(false, warnInvoked);
        assert.equal(null, res);
    });
});
