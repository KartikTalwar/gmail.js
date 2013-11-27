# Gmail.js - JavaScript API for Gmail


## Setup

Inject jQuery to Gmail (open console and paste this) and initialize `gmail.js`


```js
var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js";
document.getElementsByTagName('body')[0].appendChild(jq);

// {inject gmail.js}

var gmail = Gmail();
```


## Methods

### Summary

#### GET


- gmail.get **.visible_emails()**
- gmail.get **.email_data()**
- gmail.get **.user_email()**
- gmail.get **.storage_info()**
- gmail.get **.current_page()**
- gmail.get **.email_subject()**
- gmail.get **.email_id()**
- gmail.get **.search_query()**
- gmail.get **.unread_emails()**
- gmail.get **.unread_inbox_emails()**
- gmail.get **.unread_draft_emails()**
- gmail.get **.unread_spam_emails()**
- gmail.get **.unread_forum_emails()**
- gmail.get **.unread_notification_emails()**
- gmail.get **.unread_promotion_emails()**
- gmail.get **.unread_social_emails()**
- gmail.get **.last_active()**
- gmail.get **.loggedin_accounts()**
- gmail.get **.beta()**



#### CHECK


- gmail.check **.is_thread()**
- gmail.check **.is_preview_pane()**
- gmail.check **.is_horizontal_split()**
- gmail.check **.is_vertical_split()**
- gmail.check **.is_tabbed_inbox()**
- gmail.check **.is_right_side_chat()**
- gmail.check **.is_google_apps_user()**
- gmail.check **.is_inside_email()**
- gmail.check **.is_priority_inbox()**
- gmail.check **.is_rapportive_installed()**
- gmail.check **.is_streak_installed()**
- gmail.check **.is_anydo_installed()**
- gmail.check **.is_boomerang_installed()**
- gmail.check **.is_xobini_installed()**
- gmail.check **.is_signal_installed()**


#### OBSERVE

- gmail.observe **.http_requests()**
- gmail.observe **.actions()**
- gmail.observe **.on(action, callback)**
  - `unread`
  - `read`
  - `delete`
  - `mark_as_spam`
  - `mark_as_not_spam`
  - `label`
  - `archive`
  - `move_to_inbox`
  - `delete_forever`
  - `star`
  - `unstar`
  - `mark_as_important`
  - `mark_as_not_important`
  - `filter_messages_like_these`
  - `mute`
  - `unmute`
  - `add_to_tasks`
  - `move_label`
  - `save_draft`
  - `discard_draft`
  - `send_message`
  - `expand_categories`
  - `delete_label`
  - `show_newly_arrived_message`
  - `poll`
  - `new_email`
  - `refresh`
- gmail.observe **.off(action)**


#### DOM


- gmail.dom **.inbox_content()**
- gmail.dom **.email_subject()**
- gmail.dom **.email_body()**
- gmail.dom **.email_contents()**
- gmail.dom **.get_left_sidebar_links()**
- gmail.dom **.search_bar()**


#### TOOLS

- gmail.tools **.xhr_watcher()**
- gmail.tools **.parse_url()**
- gmail.tools **.deparam()**
- gmail.tools **.parse_view_data()**
- gmail.tools **.parse_email_data()**
- gmail.tools **.make_request()**


#### TRACKER

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

#### gmail.get.email_data()

Returns an object representation of the opened email contents and metadata

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
      "from": "California",
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
['sent', 'inbox', 'starred', 'drafts', 'imp', 'chats', 'all', 'spam', 'trash'] // pages
null // inside email conversation
"/search/[.+]" // inside search view
"/label/[.+]" // inside label view
"/category/[.+]" // inside category view
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
- **gmail.get.unread_notification_emails()**
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

