"use strict";
let assert = require('assert');
let Gmail = require('../src/gmail').Gmail;
let gmail = new Gmail();

// prep cache for tests
let email = { foo: "bar" };
let validEmailLegacyId = "16a0d1f820d515e2";
let validEmailNewId = "msg-12345";
let invalidEmailLegacyid = "16a0d1f820d515e3";
let invalidEmailNewId = "msg-12346";
gmail.cache.emailIdCache[validEmailNewId] = email;
gmail.cache.emailLegacyIdCache[validEmailLegacyId] = email;


describe("gmail.new.get", () => {
    it("email_data() can look up based on legacy-style IDs", () => {
        let res = gmail.new.get.email_data(validEmailLegacyId);
        assert.equal(res, email);
    });

    it("email_data() returns null when looking up invalid legacy-style IDs", () => {
        let res = gmail.new.get.email_data(invalidEmailLegacyid);
        assert.equal(res, null);
    });

    it("email_data() can look up based on new-style IDs", () => {
        let res = gmail.new.get.email_data(validEmailNewId);
        assert.equal(res, email);
    });

    it("email_data() returns null when looking up invalid new-style IDs", () => {
        let res = gmail.new.get.email_data(invalidEmailNewId);
        assert.equal(res, null);
    });

    it("thread_data() rejects legacy-style IDs", () => {
        let failed = false;
        try {
            let res = gmail.new.get.thread_data("16a0d1f820d515e2");
        } catch (err) {
            failed = true;
        }

        assert.equal(true, failed);
    });
});
