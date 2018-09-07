
# Changelog

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
