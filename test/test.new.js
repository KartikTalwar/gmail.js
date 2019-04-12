"use strict";
let assert = require('assert');
let Gmail = require('../src/gmail').Gmail;
let gmail = new Gmail();

describe("gmail.new.get", () => {
    it("email_data() rejects legacy-style IDs", () => {
        let failed = false;
        try {
            let res = gmail.new.get.email_data("16a0d1f820d515e2");
        } catch (err) {
            failed = true;
        }

        assert.equal(true, failed);
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
