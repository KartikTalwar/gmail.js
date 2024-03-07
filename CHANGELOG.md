
# Changelog

## Version 1.1.13

- Drop bundled jQuery, support jQuery 4, support explicit no-jQuery mode
- Fix reply button selector to support Gmail in text labels mode
- Fix `api.get.user_email()`.

## Version 1.1.12

- Use MutationObserver for DOM Node changes. Thanks @cancan101!
- Fix issue in `api.dom.compose.is_inline()`.  Thanks @MadcowD!

## Version 1.1.11

- Fix `api.observe.on("view_email", ...)`not working.

## Version 1.1.10

- Fix `api.dom.right_toolbar()`, by @stevepeak.

## Version 1.1.9

- Fix `api.helper.get.is_delegated_inbox`, by @moodsey211.

## Version 1.1.8

- Fix incorrect variable name in GmailCache definition

## Version 1.1.7

- Fix for `api.tools.parse_attachment_url`.

## Version 1.1.6

- Better fix for `view_thread` event not triggeriong, by @cancan101.

## Version 1.1.5

- Improved parsing of embedded json data, by @onestep.
- Tentative fix for `view_thread` event not triggeriong, by @cancan101.

## Version 1.1.4

- Fix subject-value in `api.observe.on("send_message")` event-data, by @cancan101.

## Version 1.1.3

- Even more fixes for `api.observe.on("send_message")` by @huksley.

## Version 1.1.2

- Try some fixes for `api.observe.on("send_message")`.

## Version 1.1.1

- More fixes for `api.new.get.email_data()` and `api.new.get.thread_data()`.

## Version 1.1.0

- First release to fix new XHR format in Gmail. This fixes
  `api.new.get.email_data()` and `api.new.get.thread_data()`.

## Version 1.0.23

- Fix error in `insertion_observer()`.
- Remove no longer working functions: `gmail.get.loggedin_accounts()`,
  `gmail.get.manager_email()` and `gmail.get.delegated_to_email()`.

## Version 1.0.22

- Fix incompatibility with Mixmax extension. Thanks @DrParanoia!

## Version 1.0.21

- Various typescript type-improvements. Thanks again @cancan101!
- Fix errors when trying to prefetch email-data. Once again, thanks to @cancan101!
- Introduce new function `gmail.tools.add_more_send_option()`. Even more thanks to @cancan101!
- Make `gmail.get.email_source_*()` handle new-style and old-style identifiers natively.

## Version 1.0.20

- Fix error in TypeScript type-definitions. No functional/runtime changes. Thanks @cancan101

## Version 1.0.19

- Fix compose button being duplicated when using `gmail.tools.add_compose_button` more than once.

## Version 1.0.18

- Fix parsing of attachments in emails form embedded JSON. Thanks @onestep!

## Version 1.0.17

- Fix ussyes with `gmail.dom.visible_messages()`. Thanks @mhatvan!

## Version 1.0.16

- Fix `gmail.observe.on("http_event")` and `gmail.observe.after("http_event")` triggers to receive all XHR requests.
- Fix issue of `api.tools.parse_requests` mutating the `xhrParams` variable, causing stacked instances of `gmail-js` to not work as expected around XHR events. This closes [issue 662](https://github.com/KartikTalwar/gmail.js/issues/662).

## Version 1.0.15

- Fix issue with accessing to(), cc() and bcc() in compose-fields with
  new Gmail "PeopleKit" UI. Thanks @huksley!

## Version 1.0.14

- Persist if a message is a draft during request parsing.

## Version 1.0.13

- Fix error in `gmail.get.localization()`, which should have been caught by CI.

## Version 1.0.12

- Fix error in `gmail.get.localization()`. This closes [issue 652](https://github.com/KartikTalwar/gmail.js/issues/652).

## Version 1.0.11

- Fix cursor when hovering over button created using `gmail.tools.add_compose_button`.

## Version 1.0.10

- Better attempt at fixing incorrect triggering of custom buttons created through GmailJS.

## Version 1.0.9 - unpublished

- Fix incorrect triggering of custom buttons created through GmailJS.

## Version 1.0.8 - unpublished

- Fix Firefox-compatibility issue in Gmail click-jack prevention.

## Version 1.0.7 - unpublished

- Fix issues with Gmail preventing click-events on buttons registered
  thourgh GmailJS. Closes #648.

## Version 1.0.6

- Fix `gmail.compose.start_compose()`.

## Version 1.0.5

- Improve ergonomics of `gmail.dom.email()`. Support new email-id in constructor.

## Version 1.0.4

- Fix `gmail.check.is_inside_email()`

## Version 1.0.3

- Make `compose` cc() and bcc() methods force show cc and bcc-fields
  before updating.

## Version 1.0.2

- Fix for `compose` to(), cc() and bcc() methods not updating
  email correctly.

## Version 1.0.1

- Fix selector for start-compose button. Thanks @mikob!

## Version 1.0.0

- major improvements in populating the email-cache. Thanks @Fabi1Sc!
  NOTE: requires changes to extension-loading. See README!
- deprecate more old-style APIs

## Version 0.9.9

- add support for getting visible emails through DOM
  (replaces api.get.visible_emails())

## Version 0.9.8

- add support for parsing sent email data in new Gmail.
- add norwegian localizations.
- fix attachment URLs in non-primary gmail accounts.
- fix emails-property in gmail.new.get.thread_data().
- fix incorrect email counts in gmail.get.unread_emails() and related functions.
- add thread_id() function to DOM compose instances.

## Version 0.9.7

- fix issues with crash when invoked in cross-origin context.

## Version 0.9.6

- add support for closing compose-windows.
- add event for `send_scheduled_message` event.

## Version 0.9.5

- Further API compatibility and ergonomics improvements.

## Version 0.9.4

- Make `api.new.get.email_id()` able to work with DOMEmail directly.

## Version 0.9.3

- Fix bug introduced in `api.new.get.email_data()` in version 0.9.2
  when not providing email-id.

## Version 0.9.2

- Make `api.new.get.email_data()` handle legacy-style IDs when
  present to improve compatibility. Creates console-warning when detected.

## Version 0.9.1

- Add ability to get new-style email-id directly from DOM element in
  `api.new.get.email_id()`.

## Version 0.9.0

- Don't make attachment-detail compatibility harder than it needs to
  be. Reuse old types.
- Replace sender_address string with detailed from-field in new Gmail
  EmailData-object.

## Version 0.8.2

- Fix wrong and missing type-annotations.
- Add `content_html` property to `api.new.get.email_data()`.

## Version 0.8.1

- Add optional parameters to control button-text in `api.tools.add_modal_window()`.

## Version 0.8.0

- Introduce new `api.new.get.*` API for new Gmail only.
- Enhanced XHR monitoring to provide email-data, based entirely on new data-layer.
  (Provide 2019+ compatibility)

## Version 0.7.7

- Fix error in `api.get.displayed_email_data()` when conversation mode is off.
- Fix error in `view_email` sub-observer after Gmail-changes.
- Promote `view_email` and `load_email_menu` to own, independent observers.
- Obsolete concept with "sub-observers" completely (since none remain).

## Version 0.7.6

- Fix major error in new `api.check.is_conversation_view()`,
  introduced in 0.7.5.

## Version 0.7.5

- Fix minor error in new `api.check.is_conversation_view()`.

## Version 0.7.4

- Fix error with `api.check.is_conversation_view()` in new Gmail.
- Add support for additional events in new Gmail: read, unread,
  open_email, archive & delete.

## Version 0.7.3

- Fix error with `api.dom.compose.send()` introduced in 0.7.2.

## Version 0.7.2

- Fix look of `api.tools.add_compose_button()` in new Gmail.

## Version 0.7.1

- Add detection-code for new Gmail.
- Fix locale-detection in new Gmail.
- Preliminary work on supporting events in new Gmail.

## Version 0.7.0

- Dramatically improve compatiblity situation: Now supports
  multiple concurrent GmailJS-instances and versions.
- New, safer DOM-based approach to resolving email-thread IDs.
- `api.get.email_id()` replaced by `api.get.thread_id()`. Using old
  method now generates warning!
- New, safer data-attribute-based implementation for `api.dom.email`.

## Version 0.6.14

- Fix delegated inbox detection in `api.helper.get.is_delegated_inbox`

## Version 0.6.13

- Fix bug in `api.get.visible_emails`.
- Upgrade jQuery to latest.

## Version 0.6.12

- Fix locale-detection in `api.get.localization`.

## Version 0.6.11

- Bugfixes in email name-parsing
- Add more button-functions.
- Detect inlines replies.
- Add deprecation-warning to `api.get.email_source`.
- Other bugfixes

## Version 0.6.10

- Introduce `api.get.email_source_promise`.
- Deprecate `api.get.email_source`.
- Support downloading email-source in binary format.

## Version 0.6.9

- Fix potential NPE in `api.check.is_plain_text`.
- Fix `"delete_label"` observer.

## Version 0.6.8

- Fix `api.get.current_page`.
- Fix `api.dom.email().attachments()` for browsers not Firefox,
  (although download url and mime-type wont be available).
- Add `attachments_details` property to `email_data().threads[]` objects
  which is not DOM-based and should work in all browsers.

## Version 0.6.7

- Improve modal dialogs.

## Version 0.6.6

- Updated TypeScript bindings.

## Version 0.6.5

- Fix possible XSS bug. (https://github.com/KartikTalwar/gmail.js/issues/281)

## Version 0.6.4

- Introduce `api.dom.compose.send()` function.
- Add DOM APIs for attachments (`api.dom.email(email_id).attachments()`).

## Version 0.6.3

- Fix bug in `api.tools.parse_response`.

## Version 0.6.2

- Fix `api.check.is_inside_email` when email text is hidden/collapsed.
- Fix `api.get.visible_emails`.
- Fix `api.tools.parse_email_data` when email text is deleted
- Fix `api.tools.get_reply_to` when input parameter is null
- Added `api.get.displayed_email_data_async`
- Fix CORS-issue introduced in `api.get.email_source` in version 0.6.0.

## Version 0.6.1

- Fix `api.get.localization` bug.

## Version 0.6.0

- Fix `api.get.email_source` format-bug.
- Add new event-type: `compose_cancelled`.
- Various bug-fixes.

## Version 0.5.3

- Support for using with NodeJS and require().
- Basic support for TypeScript via type-declarations-file.
- Add new event-type: `undo_send`.

## Before that

Changelog not chronicled.
