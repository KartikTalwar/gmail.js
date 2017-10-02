# Gmail.js - JavaScript API for Gmail

![Build status](https://api.travis-ci.org/KartikTalwar/gmail.js.svg?branch=master)
[![npm](https://img.shields.io/npm/v/gmail-js.svg)](https://www.npmjs.com/package/gmail-js)

### What Gmail.js is and isn't

Gmail.js is meant to be used for creating WebExtension-based browser-extensions, for Chrome, Firefox and other compatible browsers.

It cannot be used server-side with Node, or from another web-app to interface with Gmail.

**Note:** This is not an official Gmail API, and isn't affiliated with Google.

**Note:** Gmail.js requires jQuery to work

### TL;DR Summary

- Lots of API methods to work with gmail. See documentation below.
- Easy to use API. Data & DOM.
- Reasonably complete TypeScript-support.
- Many methods are contextual and will work with whatever is on screen when no arguments are given.
- Obtain email data, react to event, etc. No need for OAuth!
- Main methods allow you to observe certain events with **`gmail.observe.on('lots_of_actions_here', callback())`** or similar **`gmail.observe.before(...)`** and **`gmail.observe.after(...)`**
- Create an issue/pull request for feedback, requests and fixes. See [CONTRIBUTING.md](https://github.com/KartikTalwar/gmail.js/blob/master/CONTRIBUTING.md) for more details.

### Using Gmail.js

If you know how to create WebExtensions-based extensions for Firefox and Chrome, you can get started by pulling Gmail.js like this:

```
npm install gmail-js
```

**Note:** Please ensure that Gmail.js is injected into the regular DOM.
Gmail.js does not work as a content-script.

For some ready to use examples/boilerplate repos, look no further:

- **[GmailJS Node Boilerplate](https://github.com/josteink/gmailjs-node-boilerplate)** - Example for how to create a browser-extension using GmailJS and modern javascript with NodeJS and script-bundling for instant load-times.
- **[GmailJS Legacy Boilerplate](https://github.com/KartikTalwar/gmail-chrome-extension-boilerplate)** - Example for how to create a browser-extension using traditional script-loading. (Requires less tooling, but is less reliable)

### Content Security Policy

Content Security Policy (CSP) will prevent direct injection. Please see the following repository to get around the policies. More details can also be found in issue [#75](https://github.com/KartikTalwar/gmail.js/issues/75)

See the examples linked above for how to get around that.

## Setup

- **Gmail.js requires jQuery to work**

### Quick Usage - Chrome Console

![](https://f.cloud.github.com/assets/461702/1628984/83ddb250-5728-11e3-9dbc-70a13c2becb0.JPG)

```js
// {inject jquery.js} by copy pasting this in your console
var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js";
document.getElementsByTagName('body')[0].appendChild(jq);

// {inject gmail.js} by copy pasting gmail.js contents or via url like jquery above
// var Gmail = {.....} // paste gmail.js code here

// start using!
// you can also pass in a reference to jQuery upon init - Gmail(localJQuery)
var gmail = Gmail();
gmail.get.user_email();
```


## Typescript

Using gmail-js with TypeScript is relatively easy, but if you use normal `import` syntax it
will fail. Instead you need to use `require`-syntax to load it:

````typescript
const GmailFactory = require("gmail-js");
const gmail = new GmailFactory.Gmail() as Gmail;
// working on the gmail-object now provides type-safety.
````

## Methods

### Summary (click for more info)

#### GET


- [gmail.get**.user_email()**](#gmailgetuser_email)
- [gmail.get**.manager_email()**](#gmailgetmanager_email)
- [gmail.get**.visible_emails()**](#gmailgetvisible_emails)
- [gmail.get**.visible_emails_async(callback)**](#gmailgetvisible_emailscallback)
- [gmail.get**.selected_emails_data()**](#gmailgetselected_emails_data)
- [gmail.get**.current_page()**](#gmailgetcurrent_page)
- [gmail.get**.email_id()**](#gmailgetemail_id)
- [gmail.get**.email_ids()**](#gmailgetemail_ids)
- [gmail.get**.email_subject()**](#gmailgetemail_subject)
- [gmail.get**.compose_ids()**](#gmailgetcompose_ids)
- [gmail.get**.email_data(email_id=undefined)**](#gmailgetemail_dataemail_idundefined)
- [gmail.get**.email_data_async(email_id=undefined, callback)**](#gmailgetemail_dataemail_idundefined-callback)
- [gmail.get**.displayed_email_data()**](#gmailgetdisplayed_email_data)
- [gmail.get**.displayed_email_data_async(callback)**](#gmailgetdisplayed_email_data_asynccallback)
- [gmail.get**.email_source_async(email_id=undefined, callback, error_callback, preferBinary)**](#gmailgetemail_source_asyncemail_idundefined-callback-error_callback-preferBinaryfalse)
- [gmail.get**.email_source_promise(email_id=undefined, preferBinary)**](#gmailgetemail_source_promiseemail_idundefined-preferBinaryfalse)
- [gmail.get**.search_query()**](#gmailgetsearch_query)
- [gmail.get**.unread_emails()**](#gmailgetunread_emails)
 - [gmail.get**.unread_inbox_emails()**](#gmailgetunread_emails)
  - [gmail.get**.unread_draft_emails()**](#gmailgetunread_emails)
  - [gmail.get**.unread_spam_emails()**](#gmailgetunread_emails)
  - [gmail.get**.unread_forum_emails()**](#gmailgetunread_emails)
  - [gmail.get**.unread_update_emails()**](#gmailgetunread_emails)
  - [gmail.get**.unread_promotion_emails()**](#gmailgetunread_emails)
  - [gmail.get**.unread_social_emails()**](#gmailgetunread_emails)
- [gmail.get**.last_active()**](#gmailgetlast_active)
- [gmail.get**.storage_info()**](#gmailgetstorage_info)
- [gmail.get**.loggedin_accounts()**](#gmailgetloggedin_accounts)
- [gmail.get**.beta()**](#gmailgetbeta)
- [gmail.get**.localization()**](#gmailgetlocalization)



#### CHECK


- [gmail.check**.is_thread()**](#gmailcheckis_thread)
- [gmail.check**.is_inside_email()**](#gmailcheckis_inside_email)
- [gmail.check**.is_plain_text()**](#gmailcheckis_plain_text)
- [gmail.check**.is_preview_pane()**](#gmailcheckis_preview_pane)
- [gmail.check**.is_multiple_inbox()**](#gmailcheckis_multiple_inbox)
- [gmail.check**.is_horizontal_split()**](#gmailcheckis_horizontal_split)
- [gmail.check**.are_shortcuts_enabled()**](#gmailcheckare_shortcuts_enabled)
- [gmail.check**.is_vertical_split()**](#gmailcheckis_vertical_split)
- [gmail.check**.is_tabbed_inbox()**](#gmailcheckis_tabbed_inbox)
- [gmail.check**.is_right_side_chat()**](#gmailcheckis_right_side_chat)
- [gmail.check**.should_compose_fullscreen()**](#gmailcheckshould_compose_fullscreen)
- [gmail.check**.is_conversation_view()**](#gmailcheckis_conversation_view)
- [gmail.check**.is_google_apps_user()**](#gmailcheckis_google_apps_user)
- [gmail.check**.is_priority_inbox()**](#gmailcheckis_priority_inbox)
- [gmail.check**.is_rapportive_installed()**](#gmailcheckis_rapportive_installed)
- [gmail.check**.is_streak_installed()**](#gmailcheckis_streak_installed)
- [gmail.check**.is_anydo_installed()**](#gmailcheckis_anydo_installed)
- [gmail.check**.is_boomerang_installed()**](#gmailcheckis_boomerang_installed)
- [gmail.check**.is_xobni_installed()**](#gmailcheckis_xobni_installed)
- [gmail.check**.is_signal_installed()**](#gmailcheckis_signal_installed)


#### CHAT


- [gmail.chat**.is_hangouts()**](#gmailchatis_hangouts)


### COMPOSE

- [gmail.compose**.start_compose()**](#gmailcomposestart_compose)


#### OBSERVE
It is considered best practice to wait for the gmail interface to be loaded before observing any XHR actions.
```js
gmail.observe.on("load", function(){
    //... now you can safely register other observers using gmail.observe.on
});
```

- [gmail.observe**.http_requests()**](#gmailobservehttp_requests)
- [gmail.observe**.actions()**](#gmailobserveactions)
- [gmail.observe**.register(action, class/args, parent)**](#gmailobserveregisteraction-classargs-parentnull) - registers a custom DOM observer
- [gmail.observe**.off(action,type)**](#gmailobserveoffactionnulltypenull)
- [gmail.observe**.on(action, callback)**](#gmailobserveonaction-callback)
  - **XHR observers**
  - **`load`** - When the gmail interface has finished loading
  - **`http_event`** - When gmail any CRUD operation happens on gmail
  - **`poll`** - When gmail automatically polls the server to check for new emails every few seconds
  - **`new_email`** - When a new email appears in the inbox
  - **`open_email`** - When an email is opened from the inbox view
  - **`refresh`** - When you click the refresh button
  - **`unread`** - When a conversation(s) is marked unread
  - **`read`** - When a conversation(s) is marked read
  - **`delete`** - When a conversation(s) is deleted
  - **`delete_message_in_thread`** - When a conversation(s) is deleted inside a thread
  - **`mark_as_spam`** - When a conversation(s) is marked as spam
  - **`mark_as_not_spam`** - When a conversation(s) is unchecked as spam
  - **`label`** - When a conversation(s) get applied a label
  - **`archive`** - When a conversation(s) is archieved
  - **`move_to_inbox`** - When a conversation(s) is moved to the inbox
  - **`delete_forever`** - When a conversation(s) is deleted forever
  - **`star`** - When a conversation(s) is starred
  - **`unstar`** - When a conversation(s) is unstarred
  - **`undo_send`** - When the Undo Send button is clicked after trying to send a new email
  - **`mark_as_important`** - When a conversation(s) is marked as important
  - **`mark_as_not_important`** - When a conversation(s) is marked as not important
  - **`filter_messages_like_these`** - When a filter button is triggered for a conversation
  - **`mute`** - When a conversation(s) is muted
  - **`unmute`** - When a conversation(s) is unmuted
  - **`add_to_tasks`** - When an item is added to google tasks
  - **`move_label`** - When a conversation(s) is moved to a label folder
  - **`save_draft`** - When a draft is saved
  - **`discard_draft`** - When a draft is dicarded
  - **`send_message`** - When a message is sent
  - **`expand_categories`** - When a category is expanded from the left nav sidebar
  - **`restore_message_in_thread`** - When a deleted message is restored inside a thread
  - **`delete_label`** - When a label is deleted
  - **`show_newly_arrived_message`** - When inside an email and a new email arrives in the thread
  - **`upload_attachment`** - When an attachment is being uploaded to an email being composed
  - **DOM observers**
  - **`compose`** - When a new compose window is opened, or a message is replied to or forwarded
  - **`recipient_change`** - When an email being written (either new compose, reply or forward) has its to, cc or bcc recipients updated
  - **`view_thread`** - When a conversation thread is opened to read
    - **`view_email`** - Sub-observer to `view_thread`. When an individual email is loaded within a conversation thread.
      It's worth noting this event is only triggered when the email is actually rendered in the DOM. Gmail tends to cache the rendered emails, so it should not be expected to fire reliably for every viewing of the same email. It will most likely fire once, for the initial and possibly only rendering.
    - **`load_email_menu`** - Sub-observer to `view_thread`. When the dropdown menu next to the reply button is clicked
- [gmail.observe**.before(action, callback)**](#gmailobservebeforeaction-callback)
- [gmail.observe**.after(action, callback)**](#gmailobserveafteraction-callback)
- gmail.observe**.bind(type, action, callback)** - implements the on, after, before callbacks
- gmail.observe**.on_dom(action, callback)** - implements the DOM observers - called by `gmail.observe.on`
- gmail.observe**.bound(action, type)** - checks if a specific action and/or type has any bound observers
- gmail.observe**.trigger(type, events, xhr)** - fires any specified events for this type (on, after, before) with specified parameters

#### DOM

These methods return the DOM data itself

- gmail.dom**.inboxes()**
- gmail.dom**.inbox_content()**
- gmail.dom**.email_subject()**
- gmail.dom**.email_body()**
- gmail.dom**.email_contents()**
- gmail.dom**.get_left_sidebar_links()**
- gmail.dom**.search_bar()**
- gmail.dom**.toolbar()**
- gmail.dom**.right_toolbar()**
- gmail.dom**.compose()** - compose dom object - receives the DOM element for the compose window and provides methods to interact
- gmail.dom**.composes()** - retrives an array of `gmail.dom.compose` objects representing any open compose windows
- [gmail.dom**.email()**](#gmaildomemailemail_el-or-email_id) - email dom object - receives an email DOM element or email id for an email currently being viewed. Abstracts interaction with that email.
- [gmail.dom**.thread()**](#gmaildomthreadthread_el) - thread dom object - receives a conversation thread DOM element currently being viewed. Abstracts interaction with that thread.

#### TOOLS

These are some helper functions that the rest of the methods use. See source for input params

- gmail.tools**.infobox(message, time)**
  + Adds the yellow info box on top of gmail with the given message
- gmail.tools**.rerender(callback)**
  + Re-renders the UI using the available data.
- gmail.tools**.xhr_watcher()**
- gmail.tools**.parse_url()**
- gmail.tools**.deparam()**
- gmail.tools**.parse_view_data()**
- gmail.tools**.parse_email_data()**
- gmail.tools**.extract_email_address(str)**
- gmail.tools**.extract_name(str)**
- gmail.tools**.make_request()**
- gmail.tools**.make_request_async()**
- gmail.tools**.make_request_download_promise(url, preferBinary)** - function specialized for downloading email MIME messages or attachments.
- gmail.tools**.sleep(ms)**
- gmail.tools**.multitry(ms_delay, tries, func, bool_success_check)**
- gmail.tools**.i18n(label)**
- gmail.tools**.toggle_minimize()**
- [gmail.tools**.add_toolbar_button(content_html, onclick_action, custom_style_class)**](#gmailtoolsadd_toolbar_buttoncontent_html-onclick_action-custom_style_class)
- [gmail.tools**.add_right_toolbar_button(content_html, onclick_action, custom_style_class)**](#gmailtoolsadd_right_toolbar_buttoncontent_html-onclick_action-custom_style_class)
- [gmail.tools**.add_compose_button(compose_ref, content_html, onclick_action, custom_style_class)**](#gmailtoolsadd_toolbar_buttoncompose_ref-content_html-onclick_action-custom_style_class)
- [gmail.tools**.add_modal_window(title, content_html, onClickOk, onClickCancel, onClickClose)**](#gmailtoolsadd_modal_windowtitle-content_html-onClickOk-onClickCancel-onClickClose)
- [gmail.tools**.remove_modal_window()**](#gmailtoolsremove_modal_window)

#### TRACKER

These are some of the variables that are tracked and kept in memory while the rest of the methods are in use.

- gmail.version
- gmail.tracker**.events**
- gmail.tracker**.xhr_init**
- gmail.tracker**.xhr_open**
- gmail.tracker**.xhr_send**
- gmail.tracker**.watchdog**
- gmail.tracker**.view_data**
- gmail.tracker**.email_data**
- gmail.tracker**.ik**
- gmail.tracker**.rid**



### Details

#### gmail.get.visible_emails()

Returns a list of emails from the server that are currently visible in the inbox view. The data does not come from the DOM

```json
[{"id": "1425a3693a4c45d0",
  "title": "<b>What if video games were real? On YouTube</b>",
  "excerpt": "View email in a web browser Header Super Mario Brothers Parkour by Warialasky Super Mario Brothers",
  "time": "Fri, Nov 15, 2013 at 12:23 AM",
  "sender": "noreply@youtube.com",
  "attachment": "",
  "labels": ["^all", "^i", "^smartlabel_social", "^unsub"]}]
```

#### gmail.get.visible_emails(async)

Does the same as above but accepts a callback function

#### gmail.get.selected_emails_data()

Returns a list of object representation from emails that are currently **selected** in the inbox view.
The data does not come from the DOM

```json
[{
  "thread_id":"141d44da39d6caf8",
  "first_email": "141d44da39d6caf9",
  "last_email": "141d44da39d6caf9",
  "total_emails": 1,
  "total_threads": ["141d44da39d6caf8"],
  "people_involved": [
    ["Kartik Talwar", "hi@kartikt.com"],
    ["California", "california@gmail.com"]
  ],
  "subject": "test",
  "threads": {
    "141d44da39d6caf8": {
      "reply_to_id": "",
      "reply_to": "replytome@gmail.com",
      "is_deleted" : false,
      "from": "California",
      "to" : ["hi@kartikt.com"],
      "cc" : [],
      "bcc" : [],
      "from_email": "california@gmail.com",
      "timestamp": 1382246359000,
      "datetime": "Sun, Nov 20, 2013 at 1:19 AM",
      "content_plain": "another test",
      "subject": "test",
      "content_html": "<div dir=\"ltr\">another test</div>\n"
    }
  }
},{
  "thread_id":"141d44da39d6caf8",
  "first_email": "141d44da39d6caf8",
  "last_email": "141d44da39d6caf8",
  "total_emails": 1,
  "total_threads": ["141d44da39d6caf8"],
  "people_involved": [
    ["Kartik Talwar", "hi@kartikt.com"],
    ["California", "california@gmail.com"]
  ],
  "subject": "test",
  "threads": {
    "141d44da39d6caf8": {
      "reply_to_id": "",
      "reply_to": null,
      "is_deleted" : false,
      "from": "California",
      "to" : ["hi@kartikt.com"],
      "cc" : [],
      "bcc" : [],
      "from_email": "california@gmail.com",
      "timestamp": 1382246359000,
      "datetime": "Sun, Nov 20, 2013 at 1:19 AM",
      "content_plain": "another test",
      "subject": "test",
      "content_html": "<div dir=\"ltr\">another test</div>\n"
    }
  }
}]
```

#### gmail.get.email_data(email_id=undefined)

Returns an object representation of the opened email contents and metadata. It takes the optional email_id parameter where
the data for the specified id is returned instead of the email currently visible in the dom.

`thread_id` is added for updated gmail thread behaviour which adds support for emails created in [inbox](https://inbox.google.com). first_email remains as the first message in the thread.

```json
{
  "thread_id":"141d44da39d6caf8",
  "first_email": "141d44da39d6caf8",
  "last_email": "141d44da39d6caf8",
  "total_emails": 1,
  "total_threads": ["141d44da39d6caf8"],
  "people_involved": [
    ["Kartik Talwar", "hi@kartikt.com"],
    ["California", "california@gmail.com"]
  ],
  "subject": "test",
  "threads": {
    "141d44da39d6caf8": {
      "reply_to_id": "",
      "reply_to": "replytome@gmail.com",
      "is_deleted" : false,
      "from": "California",
      "to" : ["hi@kartikt.com"],
      "cc" : [],
      "bcc" : [],
      "from_email": "california@gmail.com",
      "timestamp": 1382246359000,
      "datetime": "Sun, Nov 20, 2013 at 1:19 AM",
      "content_plain": "another test",
      "subject": "test",
      "content_html": "<div dir=\"ltr\">another test</div>\n",
      "attachments": [
          "some_file.pdf"
      ],
      "attachments_details": [
      {
          "attachment_id": "0.1",
          "name": "some_file.pdf",
          "size": 11235,
          "type": "application/pdf",
          "url": "https://mail.google.com/u/0/?ui=......"
      }]
    }
  }
}
```

#### gmail.get.email_data_async(email_id=undefined, callback)


Does the same as above but accepts a callback function


#### gmail.get.displayed_email_data()

Returns an object representation of the emails that are being displayed.

```json
{
  "thread_id":"141d44da39d6caf8",
  "first_email": "145881e7a8befff6",
  "last_email": "145881e7a8befff6",
  "total_emails": 1,
  "total_threads": ["145881e7a8befff6"],
  "people_involved": [
    ["Kartik Talwar", "hi@kartikt.com"],
    ["California", "california@gmail.com"]
  ],
  "subject": "test",
  "threads": {
    "145881e7a8befff6": {
      "reply_to_id": "",
      "reply_to": "replytome@gmail.com",
      "is_deleted" : false,
      "from": "California",
      "to" : ["hi@kartikt.com"],
      "cc" : [],
      "bcc" : [],
      "from_email": "california@gmail.com",
      "timestamp": 1382246359000,
      "datetime": "Sun, Nov 20, 2013 at 1:19 AM",
      "content_plain": "another test",
      "subject": "test",
      "content_html": "<div dir=\"ltr\">another test</div>\n",
      "attachments": [
          "some_file.pdf"
      ],
      "attachments_details": [
      {
          "attachment_id": "0.1",
          "name": "some_file.pdf",
          "size": 11235,
          "type": "application/pdf",
          "url": "https://mail.google.com/u/0/?ui=......"
      }]
    }
  }
}

```

#### gmail.get.displayed_email_data_async(callback)

Does the same as above but accepts a callback function.


#### gmail.get.email_source(email_id=undefined)

Deprecated function. Will be removed. Migrate to
`gmail.get.email_source_async` or `gmail.get.email_source_promise`
instead.

#### gmail.get.email_source_async(email_id=undefined, callback, error_callback, preferBinary=false)

Retrieves raw MIME message source from the gmail server for the specified email id. It takes the optional email_id parameter where
the data for the specified id is returned instead of the email currently visible in the dom

By default, once retrieved the resulting data will be passed to
`callback` in text-format. **This may corrupt the actual email
MIME-data, by causing irreversible content-encoding
consistency-errors.**

If you need to parse this data in a proper MIME-parser later, the only
way to avoid this kind of error is to download the data in binary
format and do your own decoding inside your own MIME-parser.

To get the email-source in binary form, you must set the
`preferBinary`-parameter to `true`.

#### gmail.get.email_source_promise(email_id=undefined, preferBinary=false)

Does the same as above but implements it using ES6 promises.


#### gmail.get.user_email()

Returns the current user's email address

```js
"california@gmail.com"
```

#### gmail.get.manager_email()

Returns the email address of the user currently managing the account (if the inbox is used by the owner, this function returns the same value as [gmail.get**.user_email()**](#gmailgetuser_email))

```js
"california@gmail.com"
```

#### gmail.get.delegated_to_email()

Returns the email address of the user the account is currently delegated to (if the inbox is used by the owner, this function returns null)

```js
"california@gmail.com"
```

#### gmail.get.storage_info()

Returns current user's file storage stats

```json
{
  "used": "0 GB",
  "total": "15 GB",
  "percent": 0
}
```

#### gmail.get.current_page()

Returns what page of gmail the user is currently on. These are the possible responses

```js
['sent', 'inbox', 'starred', 'drafts', 'imp', 'chats', 'all', 'spam', 'trash', 'circle'] // pages
"email" // inside email conversation
"/search/[.+]" // inside search view
"/label/[.+]" // inside label view
"/category/[.+]" // inside category view
"/settings/[.+]" // settings sub-page (excluding settings root page)
```

#### gmail.get.email_subject()

Returns the opened email's subject from the DOM

```js
"test"
```


#### gmail.get.email_id()

Gets current email's ID

```js
"141de25dc0b48e4f"
```

#### gmail.get.email_ids()

Returns a list of email IDs for each thread in the conversation

```js
["141de25dc0b48e4f"]
```

### gmail.get.compose_ids()

Returns the latest/last email id of emails that have been saved as drafts (currently open)

```js
["14469c73bba6ff53", "14469c7b8581ccfa"]
```


#### gmail.get.search_query()

Returns the search bar data

```js
"from:hi@kartikt.com is:unread"
```

#### gmail.get.unread_emails()

Returns a count of total unread emails for the current account.

```json
{
  "inbox": 2,
  "drafts": 0,
  "spam": 0,
  "forum": 0,
  "notifications": 0,
  "promotions": 0,
  "social": 0
}
```

You can also request the data individually

- **gmail.get.unread_inbox_emails()**
- **gmail.get.unread_draft_emails()**
- **gmail.get.unread_spam_emails()**
- **gmail.get.unread_forum_emails()**
- **gmail.get.unread_update_emails()**
- **gmail.get.unread_promotion_emails()**
- **gmail.get.unread_social_emails()**


#### gmail.get.last_active()

Gets user's account activity data

```json
{
  "time": "9:41 pm",
  "ip": "54.234.192.48",
  "mac_address": "2620:101:f000:702:a966:ab42:4a46:195e",
  "time_relative": "31 minutes ago"
}
```

#### gmail.get.loggedin_accounts()

Returns a list of signed-in accounts (multiple user accounts setup in gmail)

```json
[{"name":"California","email":"california@gmail.com"}]
```

#### gmail.get.beta()

Although hand picked, this method returns the checks on beta features and deployments

```json
{"new_nav_bar":true}
```

#### gmail.get.localization()

Returns the Gmail localization, e.g. 'US'.

#### gmail.check.is_thread()

Returns `True` if the conversation is threaded `False` otherwise

#### gmail.check.is_preview_pane()

Returns `True` if gmail is in split pane mode (vertical or horizontal) `False` otherwise

#### gmail.check.is_multiple_inbox()

Returns `True` if user has multiple inbox lab enabled, `False` otherwise

#### gmail.check.is_horizontal_split()

Returns `True` if the pane split mode is horiontal `False` otherwise

#### gmail.check.are_shortcuts_enabled()

Returns `True` if user has enabled mail action shortcuts, `False` otherwise

#### gmail.check.is_vertical_split()

Returns `True` if the pane mode is vertical `False` otherwise

#### gmail.check.is_tabbed_inbox()

Returns `True` if tabbed inbox view is enabled `False` otherwise

#### gmail.check.is_right_side_chat()

Returns `True` if chat is on the right sidebar `False` otherwise

#### gmail.check.should_compose_fullscreen()

Returns `True` if compose is in fullscreen mode `False` otherwise

#### gmail.check.is_conversation_view()

Returns `True` if emails are displayed as threads, `False` otherwise (i.e. displayed individually)

#### gmail.check.is_google_apps_user()

Returns `True` if the current user is google apps user (email not ending in gmail.com) `False` otherwise

#### gmail.check.is_inside_email()

Returns `True` if you are currently inside an email conversation `False` otherwise

#### gmail.check.is_plain_text()

Returns `True` if compose is in plain text mode, `False` if in rich text mode

#### gmail.check.is_priority_inbox()

Returns `True` if priority inbox is enabled `False` otherwise

#### gmail.check.is_rapportive_installed()

Returns `True` if [rapportive](http://rapportive.com/) chrome extension is installed `False` otherwise

#### gmail.check.is_streak_installed()

Returns `True` if [streak](http://streak.com) chrome extension is installed `False` otherwise

#### gmail.check.is_anydo_installed()

Returns `True` if [any.do](http://any.do) chrome extension is installed `False` otherwise

#### gmail.check.is_boomerang_installed()

Returns `True` if [boomerang](http://www.boomeranggmail.com/) chrome extension is installed `False` otherwise

#### gmail.check.is_xobni_installed()

Returns `True` if [xobni](https://www.xobni.com) chrome extension is installed `False` otherwise

#### gmail.check.is_signal_installed()

Returns `True` if [Signal](https://trysignal.com) chrome extension is installed `False` otherwise


#### gmail.chat.is_hangouts()

Returns `True` if the account supports the new hangout UI for chat `False` otherwise (native chat window)


#### gmail.compose.start_compose()

-Clicks on the compose button making the inbox compose view to popup


#### gmail.observe.http_requests()

After an observer has been bound through `gmail.observe.bind()` (via a call to events `gmail.observe.before()`, `gmail.observe.on()`, or `gmail.observe.after()`), this method keeps track of the last 50 http events.
The items contain the sent requested parameterized data

```json
[{
  "method": "POST",
  "url": {
    "ui": "2",
    "ik": "13fa7f7088",
    "rid": "ed0e..",
    "view": "tl",
    "start": "0",
    "num": "30",
    "lhop": "169846",
    "ltup": "%5Ei",
    "slmm": "1427abc6106ac10b",
    "scid": "q2h353hw6dv9",
    "avw": "1194",
    "ntlv": "10",
    "auto": "1",
    "ver": "-z-h-bKmWwI.en.",
    "am": "!6hSPXvkvPMjmReGu2-2BQXCk3IltF-jNSk0J8Cg_jNeaoSbpJgHQYdkXe6T_WPYyyATD3DSiOA",
    "vas": "1",
    "ari": "120",
    "_reqid": "4582876",
    "pcd": "1",
    "mb": "0",
    "rt": "j",
    "search": "inbox"
  },
  "body": "",
  "url_raw": "?ui=2&ik=13fa7f7088&rid=ed0e..&view=tl&start=0&num=30&lhop=169846&ltup=%5Ei&slmm=1427abc6106ac10b&scid=q2h353hw6dv9&avw=1194&ntlv=10&auto=1&ver=-z-h-bKmWwI.en.&am=!6hSPXvkvPMjmReGu2-2BQXCk3IltF-jNSk0J8Cg_jNeaoSbpJgHQYdkXe6T_WPYyyATD3DSiOA&vas=1&ari=120&_reqid=4582876&pcd=1&mb=0&rt=j&search=inbox"
}]
```

#### gmail.observe.actions()

Similar to `gmail.observe.http_requests()` this keeps track of the last 10 gmail actions (vs all http requests).
Actions here correspond to things like clicking refres, archiving, deleting, starring etc.

#### gmail.observe.on(action, callback)

This is the key feature of gmail.js. This method allows you to add triggers to all of these actions so you can build
your custom extension/tool with this library.

You simply specify the action name and your function that the method will return data to when the actions are triggered
and it does the rest. **You can have multiple triggers**

Your callback will be fired directly after Gmail's XMLHttpRequest has been sent off the the Gmail servers.

**Available Actions**

  - **http_event** - When gmail any CRUD operation happens on gmail
  - **poll** - When gmail automatically polls the server to check for new emails every few seconds
  - **new_email** - When a new email appears in the inbox
  - **open_email** - When an email is opened from the inbox view
  - **refresh** - When you click the refresh button
  - **unread** - When a conversation(s) is marked unread
  - **read** - When a conversation(s) is marked read
  - **delete** - When a conversation(s) is deleted
  - **delete_message_in_thread** - When a conversation(s) is deleted inside and is part of a thread
  - **mark_as_spam** - When a conversation(s) is marked as spam
  - **mark_as_not_spam** - When a conversation(s) is unchecked as spam
  - **label** - When a conversation(s) get applied a label
  - **archive** - When a conversation(s) is archieved
  - **move_to_inbox** - When a conversation(s) is moved to the inbox
  - **delete_forever** - When a conversation(s) is deleted forever
  - **star** - When a conversation(s) is starred
  - **unstar** - When a conversation(s) is unstarred
  - **`undo_send`** - When the Undo Send button is clicked after trying to send a new email
  - **mark_as_important** - When a conversation(s) is marked as important
  - **mark_as_not_important** - When a conversation(s) is marked as not important
  - **filter_messages_like_these** - When a filter button is triggered for a conversation
  - **mute** - When a conversation(s) is muted
  - **unmute** - When a conversation(s) is unmuted
  - **add_to_tasks** - When an item is added to google tasks
  - **move_label** - When a conversation(s) is moved to a label folder
  - **save_draft** - When a draft is saved
  - **discard_draft** - When a draft is dicarded
  - **send_message** - When a message is sent
  - **expand_categories** - When a category is expanded from the left nav sidebar
  - **restore_message_in_thread** - When a deleted message is restored inside a thread
  - **delete_label** - When a label is deleted
  - **show_newly_arrived_message** - When inside an email and a new email arrives in the thread

The on method also supports observering specific DOM events in the Gmail Interface (for example when a new compose window is opened). These are only available via the `on` method (not the `before` or `after` methods).

Some actions/observers also have defined 'sub-observers' which only (!) become available if you have an action bound to the parent observer. Sub-observers are defined as such because they only make sense once the parent has been triggered. I.e. for an individual email (or several emails) to display as part of a conversation thread, the thread must first be opened/loaded in the interface.

Example usage:

```js
gmail.observe.on('view_thread', function(obj) {
  console.log('view_thread', obj);
});

// now we have access to the sub observers
and load_email_menu
gmail.observe.on('view_email', function(obj) {
  console.log('view_email', obj);
});
```

**Available DOM Actions/Observers & Sub-observers**

 - **load** - When the gmail interface has completed loading
 - **compose** - When a new compose window opens, or a message is replied to or forwarded
 - **compose_cancelled** - When an existing compose window is closed.
 - **recipient_change** - When the recipient (to, cc or bcc) is changed when composing a new email or replying/forwarding an email
 - **view_thread** - When a new coversation thread is opened
  - **view_thread Sub-observers**
  - **view_email** - When an individual email is loaded within a thread (also fires when thread loads displaying the latest email)
  - **load_email_menu** - When the dropdown menu next to the reply button is clicked

```js
gmail.observe.on("http_event", function(params) {
  console.log("url data:", params);
})

gmail.observe.on("unread", function(id, url, body, xhr) {
  console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
})

gmail.observe.on("read", function(id, url, body, xhr) {
  console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
})

gmail.observe.on("delete", function(id, url, body, xhr) {
  console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
})

gmail.observe.on("mark_as_spam", function(id, url, body, xhr) {
  console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
})

gmail.observe.on("mark_as_not_spam", function(id, url, body, xhr) {
  console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
})

gmail.observe.on("label", function(id, url, body, label, xhr) {
  console.log("id:", id, "url:", url, 'body', body, "label", label, 'xhr', xhr);
})

gmail.observe.on("archive", function(id, url, body, xhr) {
  console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
})

gmail.observe.on("move_to_inbox", function(id, url, body, xhr) {
  console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
})

gmail.observe.on("delete_forever", function(id, url, body, xhr) {
  console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
})

gmail.observe.on("delete_message_in_thread", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("restore_message_in_thread", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("star", function(id, url, body, xhr) {
  console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
})

gmail.observe.on("unstar", function(id, url, body, xhr) {
  console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
})

gmail.observe.on("undo_send", function(url, body, data, xhr) {
  console.log('body', body, 'xhr', xhr, 'msg_id : ', body.m);
})

gmail.observe.on("mark_as_important", function(id, url, body, xhr) {
  console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
})

gmail.observe.on("mark_as_not_important", function(id, url, body, xhr) {
  console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
})

gmail.observe.on("filter_messages_like_these", function(id, url, body, xhr) {
  console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
})

gmail.observe.on("mute", function(id, url, body, xhr) {
  console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
})

gmail.observe.on("unmute", function(id, url, body, xhr) {
  console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
})

gmail.observe.on("add_to_tasks", function(url, body, data, xhr) {
  console.log("url:", url, 'body', body, 'task_data', data, 'xhr', xhr);
})

gmail.observe.on("move_label", function(id, url, body, xhr) {
  console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
})

gmail.observe.on("save_draft", function(url, body, data, xhr) {
  console.log("url:", url, 'body', body, 'email_data', data, 'xhr', xhr);
})

gmail.observe.on("discard_draft", function(id, url, body, xhr) {
  console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
})

gmail.observe.on("send_message", function(url, body, data, xhr) {
  console.log("url:", url, 'body', body, 'email_data', data, 'xhr', xhr);
})

gmail.observe.on("expand_categories", function(url, body, data, xhr) {
  console.log("url:", url, 'body', body, 'expanded_data', data, 'xhr', xhr);
})

gmail.observe.on("delete_label", function(id, url, body, xhr) {
  console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
})

gmail.observe.on("show_newly_arrived_message", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("poll", function(url, body, data, xhr) {
  console.log("url:", url, 'body', body, 'data', data, 'xhr', xhr);
})

gmail.observe.on("new_email", function(id, url, body, xhr) {
  console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
})

gmail.observe.on("refresh", function(url, body, data, xhr) {
  console.log("url:", url, 'body', body, 'data', data, 'xhr', xhr);
})

gmail.observe.on("open_email", function(id, url, body, xhr) {
  console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
  console.log(gmail.get.email_data(id));
})

gmail.observe.on("upload_attachment", function(file, xhr) {
  console.log("file", file, 'xhr', xhr);
})

// DOM observers
gmail.observe.on("compose", function(compose, type) {

  // type can be compose, reply or forward
  console.log('api.dom.compose object:', compose, 'type is:', type );  // gmail.dom.compose object
});

gmail.observe.on('recipient_change', function(match, recipients) {
  console.log('recipients changed', match, recipients);
});

gmail.observe.on('view_thread', function(obj) {
  console.log('conversation thread opened', obj); // gmail.dom.thread object
});

gmail.observe.on('view_email', function(obj) {
  console.log('individual email opened', obj);  // gmail.dom.email object
});

gmail.observe.on('load_email_menu', function(match) {
  console.log('Menu loaded',match);

  // insert a new element into the menu
  $('<div />').addClass('J-N-Jz')
      .html('New element')
      .appendTo(match);
});

```

#### gmail.observe.before(action, callback)

Similar to `gmail.observe.on`, this method allows you to bind callbacks to specific events.

All of the standard actions in `gmail.observe.on` work here, with the exception of the DOM actions

The main difference between `on` and `before` is that these callbacks are fired *before* Gmail's XMLHttpRequest has been sent off the the Gmail servers.This means, where relevant, your callback function can change it prior to it departing by editing the xhrParams.body_params object in the passed xhr parameter.

```js
gmail.observe.before('send_message', function(url, body, data, xhr){
  var body_params = xhr.xhrParams.body_params;

  // lets cc this email to someone extra if the subject is 'Fake example'
  if(data.subject == 'Fake example') {
    if(body_params.cc) {
      if(typeof body_params.cc != 'object') body_params.cc = [ body_params.cc ];
    } else {
      body_params.cc = [];
    }
    body_params.cc.push('brent@zeald.com');
  }

  // now change the subject
  body_params.subject = 'Subject overwritten!';
  console.log("sending message, url:", url, 'body', body, 'email_data', data, 'xhr', xhr);
});
```
#### gmail.observe.after(action, callback)

Similar to `gmail.observe.on`, this method allows you to bind callbacks to specific events.

All of the standard actions in `gmail.observe.on` work here, with the exception of the DOM actions

The main difference between `on` and `after` is that these callbacks are fired once Gmail's XMLHttpRequest has returned from the Gmail servers (on the XMLHttpRequest `onreadystatechange` event).

In addition to the usual parameters received by a callback, callbacks you define for an `after` event receive an additional `response` parameter prior to the last xhr parameter. This response parameter is a parsed object representation of the response from the Gmail servers.

So for example, the `send_message` action would receive:

```js
gmail.observe.after("send_message", function(url, body, data, response, xhr) {
  console.log("message sent", "url:", url, 'body', body, 'email_data', data, 'response', response, 'xhr', xhr);
})
```

#### gmail.observe.off(action=null,type=null)

Turn off an observe action. Providing it no argument will disable all observers.

Type is either before, after, on or dom. If not specified will disable all types of specified observer.

```js
gmail.observe.on('poll', function(x,y,z){});
gmail.observe.before('refresh', function(x,y,z){});
gmail.observe.after('send_message', function(x,y,z){});

gmail.observe.off('poll','on'); // disables on poll
gmail.observe.off('poll'); // disables all poll events of any type
gmail.observe.off(null,'before'); // disables all before observers
gmail.observe.off();  // disables all
```

#### gmail.observe.register(action, class/args, parent=null)

Allow an application to register a custom DOM observer specific to their application.
Adds it to the configured DOM observers that will then be supported by the dom insertion observer.
*Note* this method must be called prior to binding any handlers to specific actions/observers using `on`, `before` or `after`.
Once you start binding handlers, you cannot register any further custom observers.

This method can be called two different ways:

Simple:
  - action - the name of the new DOM observer
  - class - the class of an inserted DOM element that identifies that this action should be triggered
  - parent - optional - if specified, this observer will be registered as a sub_observer for the specified parent (meaning it will only be checked for if the parent observer has something bound to it, and has been triggered).

Complex:
  - action - the name of the new DOM observer
  - args - an object containin properties for each of the supported DOM observer configuration agruments:
    - class - the class of an inserted DOM element that identifies that this action should be triggered
    - selector - if you need to match more than just the className of a specific element to indicate a match, you can use this selector for further checking (uses element.is(selector) on matched element). E.g. if there are multiple elements with a class indicating an observer should fire, but you only want it to fire on a specific id, then you would use this
    - sub_selector - if specified, we do a jquery element.find for the passed selector on the inserted element and ensure we can find a match
    - handler - if specified this handler is called if a match is found. Otherwise default calls the callback & passes the jQuery matchElement
  - parent - optional - as above with simple

```js

// this will register an observer that fires each time the autosuggest listbox pops up / changes
// as you type an email address into a compose
gmail.observe.register('compose_email_select', {
  class: 'Jd-axF',
  selector: 'div.Jd-axF:first-child'
});
gmail.observe.on('compose_email_select', function(match) {
  console.log('Email select popup',match);
});

```

### gmail.dom.compose(compose_el)

An object used to abstract interation with a compose popup


### gmail.dom.email(email_el or email_id)

An object for interacting with an email currently present in the DOM. Represents an individual email message within a thread, and provides a number of methods and properties to access & interact with the interface and email data.

Expects a jQuery DOM element for the email div (div.adn as returned by the ``view_email`` observer), or an email_id

- **.id** - property storing the id of the email
- **.email_id()** - draft id of the email
- **.body([body])** - allows get/set the html body in the DOM
- **.to([to_array])** - allows retrieve or updating to/from DOM who the email is addressed to
- **.from([email_address],[name])** - allows get/set who the email is from in the DOM
- **.attachments()** - retrieves the attachments for the email in the DOM
- **.data()** - retrieves object of email data from the Gmail servers
- **.source()** - retrieves the email raw source from the Gmail servers
- **.dom()** - retrieves the primary element, or other defined elements from the DOM

#### gmail.dom.email.body([body=null])

Get/Set the full email body as it sits in the DOM. Note: This gets & sets the body html after it has been parsed & marked up by GMAIL. To retrieve it as it exists in the email message source, use a call to ``.data()``

If you want the actual DOM element use .dom('body');

Receives optional argument containing html to update the email body with.

```js
var email = new gmail.dom.email(email_id); // optionally can pass relevant $('div.adn');
var body = email.body();
var id = email.id;

// add a heading at the start of the email and update in the interface
email.body('<h1>My New Heading!</h1>' + body);
```

#### gmail.dom.email.to([to_array=null])

Get/Set who the email is showing as To.
Optionally receives an array of objects containing email and/or name properties. If received replaces the values in the DOM.
Returns an array of objects containing email & name of who is showing in the DOM as the email is to.

```js
var email = new gmail.dom.email(email_id);
var to = email.to();
console.log('Email is to', to); // [{email: 'user@user.com', name: 'Display Name'}, {email: 'user2@user.com', name: 'User Two'}]

// update values that appear in the interface. This supports the popup hovers in gmail interface etc
to = email.to([
  {email: 'user@user.com', name: 'Display Name'},
  {email: 'user2@user.com', name: 'User Two'}
]);
```
#### gmail.dom.email.from([email_address=null], [display_name=null])

Get/Set the sender of the email that is displayed in the interface.
Optionally receives email and name properties. If received updates the values in the DOM
Returns an object containing email & name of the sender and dom element

```js
var email = new gmail.dom.email(email_id);
var from = email.from();
console.log('Email is from', from); // {email: 'user@user.com', name: 'Display Name'}

// update who the email is from in the interface
from.name = 'New Name';
email.from(from);
```

#### gmail.dom.email.data()

Retrieve relevant email data from the Gmail servers for this email
Makes use of the gmail.get.email_data() method
Returns an object containing the email data. Caches email data for all emails in the thread

```js
var email = new gmail.dom.email(email_id);
var data = email.data();
console.log('Email data is',data);
```

#### gmail.dom.email.source()

Retrieve email source for this email from the Gmail servers
Makes use of the gmail.get.email_source() method
Returns string of email raw source

```js
var email = new gmail.dom.email(email_id);
var source = email.source();
console.log('Email source is',source);
```

#### gmail.dom.email.dom([lookup=null])

Retrieve preconfigured dom elements for this email
Abstracts relevant dom elements so code can be centralized - making it easier to update if Gmail updates its interface
Retrieves the primary DOM element if you pass no lookup
Supported lookups:
      -  _null_ (primary element)
      -  body
      -  from
      -  to
      -  to_wrapper
      -  timestamp
      -  star
      -  reply_button
      -  menu_button
      -  details_button

```js
var email = new gmail.dom.email(email_id);
var el = email.dom();
var to_dom = email.dom('to');
console.log('El is',el,'To elements are',to);
```

### gmail.dom.thread(thread_el)

An object for interacting with a conversation thread currently present in the DOM. Provides methods to access & interact with the interface.

Expects a jQuery DOM element for the thread wrapper div (div.if as returned by the ``view_thread`` observer)

- **.dom()** - retrieves the primary element, or other defined elements from the DOM

#### gmail.dom.thread.dom([lookup=null])

Retrieve preconfigured dom elements for this conversation thread
Abstracts relevant dom elements so code can be centralized - making it easier to update if Gmail updates its interface
Retrieves the primary DOM element if you pass no lookup
Supported lookups:
      -  _null_ (primary element)
      -  opened_email
      -  subject
      -  labels

```js
var thread = new gmail.dom.thread($('div.if'));
var el = thread.dom();
var subject = thread.dom('subject');
console.log('El is',el,'Subject element is',subject);
```

#### gmail.tools.add_toolbar_button(content_html, onclick_action, custom_style_class)

Add a new button to Gmail Toolbar

```js
gmail.tools.add_toolbar_button('content_html', function() {
  // Code here
}, 'Custom Style Classes');
```

#### gmail.tools.add_right_toolbar_button(content_html, onclick_action, custom_style_class)

Add a new button to Gmail Toolbar on the right hand side

```js
gmail.tools.add_right_toolbar_button('content_html', function() {
  // Code here
}, 'Custom Style Classes');
```

#### gmail.tools.add_compose_button(compose_ref, content_html, onclick_action, custom_style_class)

Add button to compose window.
You can use gmail.dom.composes() to get compose reference.

```js
var compose_ref = gmail.dom.composes()[0];
gmail.tools.add_compose_button(compose_ref, 'content_html', function() {
  // Code here
}, 'Custom Style Classes');
```

#### gmail.tools.add_attachment_button(attachment_ref, content_html, customCssClass, tooltip, onclick_action)

Add a button to an attachment in email-view.

```js
var emailDom = gmail.dom.email(gmail.get.email_id());
var attachments = emailDom.attachments();

var iconUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png";
var html = '<img src="' + iconUrl + '" width="21" height="21" />';

for (let attachment of attachments) {
    gmail.tools.add_attachment_button(attachment, html, null, "Custom button!", function() {
        console.log("Attachment " + attachment.name + " clicked!");

        gmail.get.email_data_async(emailDom.id, (data) => {
            email = data.threads[emailDom.id];
            attachment_details = email.attachments_details.filter(
                i => i.name === attachment.name
            )[0];
            console.log("This attachment has URL: " + attachment_details.url);
            // download using api.tools.make_request_download_promise!
        });
    });
}
```

#### gmail.tools.add_modal_window(title, content_html, onClickOk, onClickCancel, onClickClose)

Create a modal window with specified title, content and callback functions.

```onClickOk``` triggers when the user clicks the OK button on the modal window. ```onClickCancel``` triggers when the user clicks the Cancel button on the modal window. ```onClickClose``` triggers when the user clicks the X in the upper right hand side of the modal window.

By default, if ```onClickCancel``` or ```onClickClose``` are left blank, their corresponding buttons will remove the modal window by calling ```gmail.tools.remove_modal_window```.

```js
gmail.tools.add_modal_window('Clean inbox', 'Do you want to continue?',
function() {
	cleanMyInbox();
	gmail.tools.remove_modal_window();
});
```

![](https://cloud.githubusercontent.com/assets/137350/6630847/abbcd6e0-c971-11e4-9153-9327444a6ddd.png)

#### gmail.tools.remove_modal_window()

Removes a modal window created using ```gmail.tools.create_modal_window```.

```js
gmail.tools.add_modal_window('Clean inbox', 'Do you want to continue?',
function() {
	cleanMyInbox();
	gmail.tools.remove_modal_window();
});
```
#### gmail.tools.toggle_minimize()

Show/Hide compose window ```gmail.tools.toggle_minimize```.

```js
gmail.tools.toggle_minimize
```


## Author and Licensing

| [![twitter/therealkartik](https://0.gravatar.com/avatar/1eb9ae38e862518d907a8392c0062e95?s=70)](https://twitter.com/TheRealKartik "Follow @TheRealKartik on Twitter") | Inspired by gmailr.js |
|---| --- |
| [Kartik Talwar](http://kartikt.com/) |  See [License.md](LICENSE.md) |
