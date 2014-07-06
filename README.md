# Gmail.js - JavaScript API for Gmail

**Note:** This is not an official Gmail API, and isn't affiliated with Google.

**Note:** Gmail.js requires jQuery to work

### TL;DR Summary

- Lots of api methods to work with gmail. Useful for chrome extensions
- Most of them dont take arguments, they work on what is currently visible on the screen
- I still need to add implementation for chrome extension, works by injecting js for now
- Main method is **`gmail.observe.on('lots_of_actions_here', callback())`**
- Click on a method link to view more detailed docs
- Create an issue/pull request for feedback, requests and fixes

### Examples

- **[Signal](https://trysignal.com)** - Edit your inbox!
- **[Gmail Hacks](https://chrome.google.com/webstore/detail/gmail-hacks/aacloklpepaibhlikiakfcgjjappeppo)** by [@arpitnext](https://github.com/arpitnext) (*[Source](https://github.com/arpitnext/play_with_gmail.js)*)

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
var gmail = Gmail();
gmail.get.user_email();
```


## Methods

### Summary (click for more info)

#### GET


- [gmail.get **.user_email()**](#gmailgetuser_email)
- [gmail.get **.visible_emails()**](#gmailgetvisible_emails)
- [gmail.get **.current_page()**](#gmailgetcurrent_page)
- [gmail.get **.email_id()**](#gmailgetemail_id)
- [gmail.get **.email_ids()**](#gmailgetemail_ids)
- [gmail.get **.email_subject()**](#gmailgetemail_subject)
- [gmail.get **.compose_ids()**](#gmailgetcompose_ids)
- [gmail.get **.email_data(email_id=undefined)**](#gmailgetemail_dataemail_idundefined)
- [gmail.get **.displayed_email_data()**](#gmailgetdisplayed_email_data)
- [gmail.get **.search_query()**](#gmailgetsearch_query)
- [gmail.get **.unread_emails()**](#gmailgetunread_emails)
 - [gmail.get **.unread_inbox_emails()**](#gmailgetunread_emails)
  - [gmail.get **.unread_draft_emails()**](#gmailgetunread_emails)
  - [gmail.get **.unread_spam_emails()**](#gmailgetunread_emails)
  - [gmail.get **.unread_forum_emails()**](#gmailgetunread_emails)
  - [gmail.get **.unread_update_emails()**](#gmailgetunread_emails)
  - [gmail.get **.unread_promotion_emails()**](#gmailgetunread_emails)
  - [gmail.get **.unread_social_emails()**](#gmailgetunread_emails)
- [gmail.get **.last_active()**](#gmailgetlast_active)
- [gmail.get **.storage_info()**](#gmailgetstorage_info)
- [gmail.get **.loggedin_accounts()**](#gmailgetloggedin_accounts)
- [gmail.get **.beta()**](#gmailgetbeta)



#### CHECK


- [gmail.check **.is_thread()**](#gmailcheckis_thread)
- [gmail.check **.is_inside_email()**](#gmailcheckis_inside_email)
- [gmail.check **.is_preview_pane()**](#gmailcheckis_preview_pane)
- [gmail.check **.is_multiple_inbox()**](#gmailcheckis_multiple_inbox)
- [gmail.check **.is_horizontal_split()**](#gmailcheckis_horizontal_split)
- [gmail.check **.are_shortcuts_enabled()**](#gmailcheckare_shortcuts_enabled)
- [gmail.check **.is_vertical_split()**](#gmailcheckis_vertical_split)
- [gmail.check **.is_tabbed_inbox()**](#gmailcheckis_tabbed_inbox)
- [gmail.check **.is_right_side_chat()**](#gmailcheckis_right_side_chat)
- [gmail.check **.is_conversation_view()**](#gmailcheckis_conversation_view)
- [gmail.check **.is_google_apps_user()**](#gmailcheckis_google_apps_user)
- [gmail.check **.is_priority_inbox()**](#gmailcheckis_priority_inbox)
- [gmail.check **.is_rapportive_installed()**](#gmailcheckis_rapportive_installed)
- [gmail.check **.is_streak_installed()**](#gmailcheckis_streak_installed)
- [gmail.check **.is_anydo_installed()**](#gmailcheckis_anydo_installed)
- [gmail.check **.is_boomerang_installed()**](#gmailcheckis_boomerang_installed)
- [gmail.check **.is_xobni_installed()**](#gmailcheckis_xobni_installed)
- [gmail.check **.is_signal_installed()**](#gmailcheckis_signal_installed)


#### CHAT


- [gmail.chat **.is_hangouts()**](#gmailchatis_hangouts)



#### OBSERVE

- [gmail.observe **.http_requests()**](#gmailobservehttp_requests)
- [gmail.observe **.actions()**](#gmailobserveactions)
- [gmail.observe **.off(action)**](#gmailobserveoffactionnull)
- [gmail.observe **.on(action, callback)**](#gmailobserveonaction-callback)
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


#### DOM

These methods return the DOM data itself

- gmail.dom **.inboxes()**
- gmail.dom **.inbox_content()**
- gmail.dom **.email_subject()**
- gmail.dom **.email_body()**
- gmail.dom **.email_contents()**
- gmail.dom **.get_left_sidebar_links()**
- gmail.dom **.search_bar()**


#### TOOLS

These are some helper functions that the rest of the methods use. See source for input params

- gmail.tools **infobox(message, time)**
  + Adds the yellow info box on top of gmail with the given message
- gmail.tools **.xhr_watcher()**
- gmail.tools **.parse_url()**
- gmail.tools **.deparam()**
- gmail.tools **.parse_view_data()**
- gmail.tools **.parse_email_data()**
- gmail.tools **.extract_email_address(str)**
- gmail.tools **.extract_name(str)**
- gmail.tools **.make_request()**
- gmail.tools **.sleep(ms)**
- gmail.tools **.multitry(ms_delay, tries, func, bool_success_check)**
- gmail.tools **.i18n(label)**


#### TRACKER

These are some of the variables that are tracked and kept in memory while the rest of the methods are in use.

- gmail.version
- gmail.tracker **.events**
- gmail.tracker **.xhr_init**
- gmail.tracker **.xhr_open**
- gmail.tracker **.xhr_send**
- gmail.tracker **.watchdog**
- gmail.tracker **.view_data**
- gmail.tracker **.email_data**
- gmail.tracker **.ik**
- gmail.tracker **.rid**



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

#### gmail.get.email_data(email_id=undefined)

Returns an object representation of the opened email contents and metadata. It takes the optional email_id parameter where
the data for the specified id is returned instead of the email currently visible in the dom

```json
{
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
}
```

#### gmail.get.displayed_email_data()

Returns an object representation of the emails that are being displayed.

```json
{
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
}

```

#### gmail.get.user_email()

Returns the current user's email address

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
['sent', 'inbox', 'starred', 'drafts', 'imp', 'chats', 'all', 'spam', 'trash', 'settings'] // pages
null // inside email conversation
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

#### gmail.check.is_conversation_view()

Returns `True` if emails are displayed as threads, `False` otherwise (i.e. displayed individually)

#### gmail.check.is_google_apps_user()

Returns `True` if the current user is google apps user (email not ending in gmail.com) `False` otherwise

#### gmail.check.is_inside_email()

Returns `True` if you are currently inside an email conversation `False` otherwise

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



#### gmail.observe.http_requests()

After the `gmail.obsere.on()` has been initiated, this method keeps track of the last 50 http events.
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

Similar to `gmail.obsere.http_requests()` this keeps track of the last 10 gmail actions (vs all http requests).
Actions here correspond to things like clicking refres, archiving, deleting, starring etc.

#### gmail.observe.on(action, callback)

This is the key feature of gmail.js. This method allows you to add triggers to all of these actions so you can build
your custom extension/tool with this library.

You simply specify the action nane and your function that the method will return data to when the actions are triggered
and it does the rest. **You can have multiple triggers**

**Available Actions**

  - **poll** - When gmail automatically polls the server to check for new emails every few seconds
  - **new_email** - When a new email appears in the inbox
  - **open_email** - When a new email appears in the inbox
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



```js
gmail.observe.on("unread", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("read", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("delete", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("mark_as_spam", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("mark_as_not_spam", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("label", function(id, url, body, label) {
  console.log("id:", id, "url:", url, 'body', body, "label", label);
})

gmail.observe.on("archive", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("move_to_inbox", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("delete_forever", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("delete_message_in_thread", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("restore_message_in_thread", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("star", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("unstar", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("mark_as_important", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("mark_as_not_important", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("filter_messages_like_these", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("mute", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("unmute", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("add_to_tasks", function(url, body, data) {
  console.log("url:", url, 'body', body, 'task_data', data);
})

gmail.observe.on("move_label", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("save_draft", function(url, body, data) {
  console.log("url:", url, 'body', body, 'email_data', data);
})

gmail.observe.on("discard_draft", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("send_message", function(url, body, data) {
  console.log("url:", url, 'body', body, 'email_data', data);
})

gmail.observe.on("expand_categories", function(url, body, data) {
  console.log("url:", url, 'body', body, 'expanded_data', data);
})

gmail.observe.on("delete_label", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("show_newly_arrived_message", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("poll", function(url, body, data) {
  console.log("url:", url, 'body', body, 'data', data);
})

gmail.observe.on("new_email", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
})

gmail.observe.on("refresh", function(url, body, data) {
  console.log("url:", url, 'body', body, 'data', data);
})

gmail.observe.on("open_email", function(id, url, body) {
  console.log("id:", id, "url:", url, 'body', body);
  console.log(gmail.get.email_data(id));
})
```

#### gmail.observe.off(action=null)

Turn off an observe action. Providing it no argument will disable all observers.

```js
gmail.observe.on('poll', function(x,y,z){});
gmail.observe.on('refresh', function(x,y,z){});

gmail.observe.off('poll'); // disables poll
gmail.observe.off();  // disables both
```

## Author and Licensing

| [![twitter/therealkartik](https://0.gravatar.com/avatar/1eb9ae38e862518d907a8392c0062e95?s=70)](https://twitter.com/TheRealKartik "Follow @TheRealKartik on Twitter") | Inspired by gmailr.js |
|---| --- |
| [Kartik Talwar](http://kartikt.com/) |  See [License.md](LICENSE.md) |
