"use strict";
let assert = require('assert');
let Gmail = require('../src/gmail').Gmail;
let gmail = new Gmail(false);

describe("Check data.is_thread_id", () => {
    it("returns true for valid thread-a ID", () => {
        let result = gmail.check.data.is_thread_id("thread-a:12345");
        assert.equal(result, true);
    });

    it("returns true for valid thread-f ID", () => {
        let result = gmail.check.data.is_thread_id("thread-f:67890abcdef");
        assert.equal(result, true);
    });

    it("returns false for invalid format", () => {
        let result = gmail.check.data.is_thread_id("thread-x:12345");
        assert.equal(result, false);
    });

    it("returns false for msg ID", () => {
        let result = gmail.check.data.is_thread_id("msg-a:12345");
        assert.equal(result, false);
    });

    it("returns falsy for null", () => {
        let result = gmail.check.data.is_thread_id(null);
        assert.ok(!result);
    });

    it("returns falsy for undefined", () => {
        let result = gmail.check.data.is_thread_id(undefined);
        assert.ok(!result);
    });

    it("returns false for non-string", () => {
        let result = gmail.check.data.is_thread_id(12345);
        assert.equal(result, false);
    });

    it("returns false for empty string", () => {
        let result = gmail.check.data.is_thread_id("");
        assert.equal(result, false);
    });

    it("returns false for string without colon", () => {
        let result = gmail.check.data.is_thread_id("thread-a12345");
        assert.equal(result, false);
    });
});

describe("Check data.is_thread", () => {
    it("returns true for valid thread object", () => {
        let threadObj = {
            "0": "thread-a:12345",
            "1": "some-data"
        };
        let result = gmail.check.data.is_thread(threadObj);
        assert.equal(result, true);
    });

    it("returns false for object with invalid thread ID", () => {
        let threadObj = {
            "0": "invalid-id",
            "1": "some-data"
        };
        let result = gmail.check.data.is_thread(threadObj);
        assert.equal(result, false);
    });

    it("returns falsy for object without 0 property", () => {
        let threadObj = {
            "1": "some-data"
        };
        let result = gmail.check.data.is_thread(threadObj);
        assert.ok(!result);
    });

    it("returns falsy for null", () => {
        let result = gmail.check.data.is_thread(null);
        assert.ok(!result);
    });

    it("returns false for non-object", () => {
        let result = gmail.check.data.is_thread("thread-a:12345");
        assert.equal(result, false);
    });
});

describe("Check data.is_email_id", () => {
    it("returns true for valid msg-a ID", () => {
        let result = gmail.check.data.is_email_id("msg-a:12345");
        assert.equal(result, true);
    });

    it("returns true for valid msg-f ID", () => {
        let result = gmail.check.data.is_email_id("msg-f:67890abcdef");
        assert.equal(result, true);
    });

    it("returns false for bump- prefixed ID", () => {
        let result = gmail.check.data.is_email_id("bump-msg-a:12345");
        assert.equal(result, false);
    });

    it("returns false for invalid format", () => {
        let result = gmail.check.data.is_email_id("msg-x:12345");
        assert.equal(result, false);
    });

    it("returns false for thread ID", () => {
        let result = gmail.check.data.is_email_id("thread-a:12345");
        assert.equal(result, false);
    });

    it("returns falsy for null", () => {
        let result = gmail.check.data.is_email_id(null);
        assert.ok(!result);
    });

    it("returns falsy for undefined", () => {
        let result = gmail.check.data.is_email_id(undefined);
        assert.ok(!result);
    });

    it("returns false for non-string", () => {
        let result = gmail.check.data.is_email_id(12345);
        assert.equal(result, false);
    });

    it("returns false for empty string", () => {
        let result = gmail.check.data.is_email_id("");
        assert.equal(result, false);
    });
});

describe("Check data.is_email", () => {
    it("returns true for valid email object", () => {
        let emailObj = {
            "0": "msg-a:12345",
            "1": "some-data"
        };
        let result = gmail.check.data.is_email(emailObj);
        assert.equal(result, true);
    });

    it("returns false for object with invalid email ID", () => {
        let emailObj = {
            "0": "invalid-id",
            "1": "some-data"
        };
        let result = gmail.check.data.is_email(emailObj);
        assert.equal(result, false);
    });

    it("returns falsy for object without 0 property", () => {
        let emailObj = {
            "1": "some-data"
        };
        let result = gmail.check.data.is_email(emailObj);
        assert.ok(!result);
    });

    it("returns falsy for null", () => {
        let result = gmail.check.data.is_email(null);
        assert.ok(!result);
    });

    it("returns false for non-object", () => {
        let result = gmail.check.data.is_email("msg-a:12345");
        assert.equal(result, false);
    });
});

describe("Check data.is_email_new", () => {
    it("returns true for valid new email object with array notation", () => {
        let emailObj = ["msg-a:12345", "some-data"];
        let result = gmail.check.data.is_email_new(emailObj);
        assert.equal(result, true);
    });

    it("returns false for object with invalid email ID", () => {
        let emailObj = ["invalid-id", "some-data"];
        let result = gmail.check.data.is_email_new(emailObj);
        assert.equal(result, false);
    });

    it("returns falsy for object without first element", () => {
        let emailObj = [];
        let result = gmail.check.data.is_email_new(emailObj);
        assert.ok(!result);
    });

    it("returns falsy for null", () => {
        let result = gmail.check.data.is_email_new(null);
        assert.ok(!result);
    });

    it("returns falsy for undefined", () => {
        let result = gmail.check.data.is_email_new(undefined);
        assert.ok(!result);
    });
});

describe("Check data.is_legacy_email_id", () => {
    it("returns true for valid 16-character hex ID", () => {
        let result = gmail.check.data.is_legacy_email_id("16a0d1f820d515e2");
        assert.equal(result, true);
    });

    it("returns true for longer hex ID", () => {
        let result = gmail.check.data.is_legacy_email_id("16a0d1f820d515e2abcdef");
        assert.equal(result, true);
    });

    it("returns false for ID with uppercase letters", () => {
        let result = gmail.check.data.is_legacy_email_id("16A0D1F820D515E2");
        assert.equal(result, false);
    });

    it("returns false for ID with non-hex characters", () => {
        let result = gmail.check.data.is_legacy_email_id("16a0d1f820d515g2");
        assert.equal(result, false);
    });

    it("returns false for ID shorter than 16 characters", () => {
        let result = gmail.check.data.is_legacy_email_id("16a0d1f820d515");
        assert.equal(result, false);
    });

    it("returns false for new-style ID", () => {
        let result = gmail.check.data.is_legacy_email_id("msg-a:12345");
        assert.equal(result, false);
    });

    it("returns falsy for null", () => {
        let result = gmail.check.data.is_legacy_email_id(null);
        assert.ok(!result);
    });

    it("returns falsy for undefined", () => {
        let result = gmail.check.data.is_legacy_email_id(undefined);
        assert.ok(!result);
    });

    it("returns false for non-string", () => {
        let result = gmail.check.data.is_legacy_email_id(12345);
        assert.equal(result, false);
    });

    it("returns false for empty string", () => {
        let result = gmail.check.data.is_legacy_email_id("");
        assert.equal(result, false);
    });
});

describe("Check data.is_action", () => {
    it("returns true for first type action object with length 1", () => {
        let actionObj = {
            "1": ["action_name"]
        };
        let result = gmail.check.data.is_action(actionObj);
        assert.equal(result, true);
    });

    it("returns true for second type action object", () => {
        let actionObj = {
            "2": ["action_name", "data"]
        };
        let result = gmail.check.data.is_action(actionObj);
        assert.equal(result, true);
    });

    it("returns falsy for object without action properties", () => {
        let actionObj = {
            "3": ["action_name", "data"]
        };
        let result = gmail.check.data.is_action(actionObj);
        assert.ok(!result);
    });

    it("returns falsy for null", () => {
        let result = gmail.check.data.is_action(null);
        assert.ok(!result);
    });
});

describe("Check data.is_first_type_action", () => {
    it("returns true for valid first type action with length 1", () => {
        let actionObj = {
            "1": ["action_name"]
        };
        let result = gmail.check.data.is_first_type_action(actionObj);
        assert.equal(result, true);
    });

    it("returns false when 1 property is not an array", () => {
        let actionObj = {
            "1": "not-an-array"
        };
        let result = gmail.check.data.is_first_type_action(actionObj);
        assert.ok(!result);
    });

    it("returns false when 1[0] is not a string", () => {
        let actionObj = {
            "1": [123]
        };
        let result = gmail.check.data.is_first_type_action(actionObj);
        assert.ok(!result);
    });

    it("returns false when array length is not 1", () => {
        let actionObj = {
            "1": ["action_name", "extra"]
        };
        let result = gmail.check.data.is_first_type_action(actionObj);
        assert.ok(!result);
    });

    it("returns falsy for null", () => {
        let result = gmail.check.data.is_first_type_action(null);
        assert.ok(!result);
    });
});

describe("Check data.is_second_type_action", () => {
    it("returns true for valid second type action", () => {
        let actionObj = {
            "2": ["action_name", "data"]
        };
        let result = gmail.check.data.is_second_type_action(actionObj);
        assert.equal(result, true);
    });

    it("returns false when 2 property is not an array", () => {
        let actionObj = {
            "2": "not-an-array"
        };
        let result = gmail.check.data.is_second_type_action(actionObj);
        assert.ok(!result);
    });

    it("returns false when 2[0] is not a string", () => {
        let actionObj = {
            "2": [123, "data"]
        };
        let result = gmail.check.data.is_second_type_action(actionObj);
        assert.ok(!result);
    });

    it("returns falsy for null", () => {
        let result = gmail.check.data.is_second_type_action(null);
        assert.ok(!result);
    });
});

describe("Check data.is_smartlabels_array", () => {
    it("returns true for array with all items starting with ^", () => {
        let arr = ["^all", "^other"];
        let result = gmail.check.data.is_smartlabels_array(arr);
        assert.equal(result, true);
    });

    it("returns true for array with ^io_im", () => {
        let arr = ["^io_im"];
        let result = gmail.check.data.is_smartlabels_array(arr);
        assert.equal(result, true);
    });

    it("returns true for array with ^smartlabel_", () => {
        let arr = ["^smartlabel_promo"];
        let result = gmail.check.data.is_smartlabels_array(arr);
        assert.equal(result, true);
    });

    it("returns false for array with mixed items", () => {
        let arr = ["^all", "other"];
        let result = gmail.check.data.is_smartlabels_array(arr);
        assert.equal(result, false);
    });

    it("returns false for empty array", () => {
        let result = gmail.check.data.is_smartlabels_array([]);
        assert.equal(result, false);
    });

    it("returns false for null", () => {
        let result = gmail.check.data.is_smartlabels_array(null);
        assert.equal(result, false);
    });

    it("returns false for non-array", () => {
        let result = gmail.check.data.is_smartlabels_array("not-an-array");
        assert.equal(result, false);
    });

    it("returns false for array without smart labels", () => {
        let arr = ["regular", "labels"];
        let result = gmail.check.data.is_smartlabels_array(arr);
        assert.equal(result, false);
    });
});

describe("Check data.is_json_string", () => {
    it("returns true for valid JSON object string", () => {
        let result = gmail.check.data.is_json_string('{"key": "value"}');
        assert.equal(result, true);
    });

    it("returns true for valid JSON array string", () => {
        let result = gmail.check.data.is_json_string('[1, 2, 3]');
        assert.equal(result, true);
    });

    it("returns false for non-JSON string", () => {
        let result = gmail.check.data.is_json_string('not json');
        assert.equal(result, false);
    });

    it("returns false for null", () => {
        let result = gmail.check.data.is_json_string(null);
        assert.equal(result, false);
    });

    it("returns false for undefined", () => {
        let result = gmail.check.data.is_json_string(undefined);
        assert.equal(result, false);
    });

    it("returns false for non-string", () => {
        let result = gmail.check.data.is_json_string({key: "value"});
        assert.equal(result, false);
    });

    it("returns false for empty string", () => {
        let result = gmail.check.data.is_json_string("");
        assert.equal(result, false);
    });
});

describe("Check is_new_data_layer", () => {
    it("returns true when GM_SPT_ENABLED is 'true'", () => {
        global.window = { GM_SPT_ENABLED: "true" };
        let result = gmail.check.is_new_data_layer();
        assert.equal(result, true);
        delete global.window;
    });

    it("returns false when GM_SPT_ENABLED is not 'true'", () => {
        global.window = { GM_SPT_ENABLED: "false" };
        let result = gmail.check.is_new_data_layer();
        assert.equal(result, false);
        delete global.window;
    });

    it("returns false when GM_SPT_ENABLED is undefined", () => {
        global.window = {};
        let result = gmail.check.is_new_data_layer();
        assert.equal(result, false);
        delete global.window;
    });
});

describe("Check is_new_gui", () => {
    it("returns true when GM_RFT_ENABLED is 'true'", () => {
        global.window = { GM_RFT_ENABLED: "true" };
        let result = gmail.check.is_new_gui();
        assert.equal(result, true);
        delete global.window;
    });

    it("returns false when GM_RFT_ENABLED is not 'true'", () => {
        global.window = { GM_RFT_ENABLED: "false" };
        let result = gmail.check.is_new_gui();
        assert.equal(result, false);
        delete global.window;
    });

    it("returns false when GM_RFT_ENABLED is undefined", () => {
        global.window = {};
        let result = gmail.check.is_new_gui();
        assert.equal(result, false);
        delete global.window;
    });
});

describe("Check is_google_apps_user", () => {
    it("returns false for gmail.com email", () => {
        // Mock get.user_email to return a gmail.com address
        let originalFunc = gmail.get.user_email;
        gmail.get.user_email = () => "user@gmail.com";
        
        let result = gmail.check.is_google_apps_user();
        assert.equal(result, false);
        
        gmail.get.user_email = originalFunc;
    });

    it("returns true for custom domain email", () => {
        // Mock get.user_email to return a custom domain address
        let originalFunc = gmail.get.user_email;
        gmail.get.user_email = () => "user@company.com";
        
        let result = gmail.check.is_google_apps_user();
        assert.equal(result, true);
        
        gmail.get.user_email = originalFunc;
    });

    it("returns true for google workspace domain", () => {
        // Mock get.user_email to return a workspace domain
        let originalFunc = gmail.get.user_email;
        gmail.get.user_email = () => "user@example.org";
        
        let result = gmail.check.is_google_apps_user();
        assert.equal(result, true);
        
        gmail.get.user_email = originalFunc;
    });
});
