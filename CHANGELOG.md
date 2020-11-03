
# Changelog

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
