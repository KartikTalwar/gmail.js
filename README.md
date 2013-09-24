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



### DOM


- gmail.dom **.inbox_content()**
- gmail.dom **.email_subject()**
- gmail.dom **.email_body()**
- gmail.dom **.email_contents()**
- gmail.dom **.get_left_sidebar_links()**
- gmail.dom **.search_bar()**
