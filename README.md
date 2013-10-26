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


### GET


- gmail.get **.inbox_messages()**
- gmail.get **.user_email()**
- gmail.get **.storage_info()**
- gmail.get **.email_subject()**
- gmail.get **.email_ids()**
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
- gmail.get **.beta()**



### CHECK


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


### OBSERVE

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
- gmail.observe **.off()**


### DOM


- gmail.dom **.inbox_content()**
- gmail.dom **.email_subject()**
- gmail.dom **.email_body()**
- gmail.dom **.email_contents()**
- gmail.dom **.get_left_sidebar_links()**
- gmail.dom **.search_bar()**


### TOOLS

- gmail.tools **.xhr_watcher()**
- gmail.tools **.parse_url()**
- gmail.tools **.deparam()**
- gmail.tools **.parse_view_data()**
- gmail.tools **.make_request()**


### TRACKER

- gmail.tracker **.events**
- gmail.tracker **.xhr_init**
- gmail.tracker **.xhr_open**
- gmail.tracker **.xhr_send**
- gmail.tracker **.watchdog**
- gmail.tracker **.view_data**
- gmail.tracker **.ik**
- gmail.tracker **.rid**
