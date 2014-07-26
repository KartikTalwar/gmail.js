var Gmail =  function() {

  var api = {
              get : {},
              observe : {},
              check : {},
              tools : {},
              tracker : {},
              dom : {},
              chat : {}
            };


  api.version           = "0.2.2";
  api.tracker.globals   = GLOBALS;
  api.tracker.view_data = VIEW_DATA;
  api.tracker.ik        = api.tracker.globals[9];
  api.tracker.hangouts  = undefined;


  api.get.last_active = function() {
    var data = api.tracker.globals[17][15];
    return {
             time : data[1],
             ip : data[3],
             mac_address : data[9],
             time_relative : data[10]
           }
  }


  api.get.loggedin_accounts = function() {
    var data = api.tracker.globals[17][23];
    var users = [];

    for(i in data[1]) {
      users.push({name : data[1][i][4], email : data[1][i][0]})
    }

    return users;
  }


  api.get.user_email = function() {
    return api.tracker.globals[10];
  };


  api.check.is_thread = function() {
    var check_1 = $('.nH .if').children(":eq(1)").children().children(":eq(1)").children();
    var check_2 = api.get.email_ids();

    return check_1.length > 1 || check_2.length > 1;
  };


  api.dom.inbox_content = function() {
    return $('div[role=main]:first');
  }


  api.check.is_preview_pane = function() {
    var dom = api.dom.inbox_content();
    var boxes = dom.find("[gh=tl]");

    var previewPaneFound = false;
    boxes.each(function() {
      if($(this).hasClass('aia')) {
        previewPaneFound = true;
      }
    });

    return previewPaneFound;
  }

  api.check.is_multiple_inbox = function() {
    var dom = api.dom.inboxes();
    return dom.length > 1;
  }


  api.check.is_horizontal_split = function() {
    var dom = api.dom.inbox_content();
    var box = dom.find("[gh=tl]").find('.nn');

    return box.length == 0;
  }


  api.check.is_vertical_split = function() {
    return api.check.is_horizontal_split() == false;
  }


  api.check.is_tabbed_inbox = function() {
    return $(".aKh").length == 1;
  }


  api.check.is_right_side_chat = function() {
    return $('.ApVoH')[0].getAttribute('aria-labelledby') == ':wf';
  }


  api.check.is_google_apps_user =function() {
    var email = api.get.user_email();
    return email.indexOf('gmail.com', email.length - 'gmail.com'.length) == -1;
  }


  api.get.storage_info = function() {
    var div = $('.md.mj').find('div')[0];
    var used = $(div).find('span')[0].text;
    var total = $(div).find('span')[1].text;
    var percent = parseFloat(used.replace(/[^0-9\.]/g, '')) * 100 / parseFloat(total.replace(/[^0-9\.]/g, ''));

    return {used : used, total : total, percent : Math.floor(percent)}
  }


  api.dom.inboxes = function() {
    var dom = api.dom.inbox_content();
    return dom.find("[gh=tl]");
  }

  api.dom.email_subject = function () {
    var e = $(".hP");

    for(var i=0; i<e.length; i++) {
      if($(e[i]).is(':visible')) {
        return $(e[i]);
      }
    };

    return $();
  }


  api.get.email_subject = function() {
    var subject_dom = api.dom.email_subject();

    return subject_dom.text();
  }


  api.dom.email_body = function() {
    return $('.nH.hx');
  }


  api.check.is_inside_email = function() {
    if(api.get.current_page() != null && !api.check.is_preview_pane()) {
      return false;
    }

    var items = $('.ii.gt');
    var ids = [];

    for(var i=0; i<items.length; i++) {
      var mail_id = items[i].getAttribute('class').split(' ')[2];
      if(mail_id != 'undefined' && mail_id != undefined) {
        if($(items[i]).is(':visible')) {
          ids.push(items[i]);
        }
      }
    }

    return ids.length > 0;
  }


  api.dom.email_contents = function() {
    var items = $('.ii.gt');
    var ids = [];

    for(var i=0; i<items.length; i++) {
      var mail_id = items[i].getAttribute('class').split(' ')[2];
      var is_editable = items[i].getAttribute('contenteditable');
      if(mail_id != 'undefined' && mail_id != undefined) {
        if(is_editable != 'true') {
          ids.push(items[i]);
        }
      }
    }

    return ids;
  }


  api.get.email_ids = function() {
    if(api.check.is_inside_email()) {
      var data = api.get.email_data();
      return Object.keys(data.threads);
    }
    return [];
  }

  api.get.compose_ids = function() {
      var ret = [];
      var dom = $(".AD [name=draft]");
      for(var i = 0; i < dom.length; i++) {
          if(dom[i].value != "undefined"){
              ret.push(dom[i].value);
          }
      };
      return ret;
  }

  api.get.email_id = function() {
    var hash = null;

    if(api.check.is_inside_email()) {
      if(api.check.is_preview_pane()) {
        var items = api.dom.email_contents();
        var text = [];

        for(var i=0; i<items.length; i++) {
          var mail_id = items[i].getAttribute('class').split(' ')[2];
          var is_editable = items[i].getAttribute('contenteditable');
          if(mail_id != 'undefined' && mail_id != undefined) {
            if(is_editable != 'true') {
              text.push(mail_id);
            }
          }
        }

        hash = text[0].substring(1, text[0].length);
      } else {
        hash = window.location.hash.split("/").pop().replace(/#/, '').split('?')[0];
      }

    }

    return hash;
  }


  api.check.is_priority_inbox = function() {
    return $('.qh').length > 0;
  }


  api.check.is_rapportive_installed = function() {
    return $('#rapportive-sidebar').length == 1;
  }


  api.check.is_streak_installed = function() {
    return $("[id^='bentoBox'],[id*=' bentoBox'],[class*=' bentoBox'],[class*='bentoBox']").length > 0;
  }


  api.check.is_anydo_installed = function() {
    return $("[id^='anydo'],[id*=' anydo'],[class*=' anydo'],[class*='anydo']").length > 0;
  }


  api.check.is_boomerang_installed = function() {
    return $("[id^='b4g_'],[id*=' b4g_'],[class*=' b4g_'],[class*='b4g_']").length > 0;
  }


  api.check.is_xobni_installed = function() {
    return $('#xobni_frame').length > 0;
  }


  api.check.is_signal_installed = function() {
    return $("[id^='Signal'],[id*=' Signal'],[class*=' signal'],[class*='signal']").length > 0;
  }


  api.check.are_shortcuts_enabled = function() {
    var flag_name = 'bx_hs';
    var flag_value = undefined;

    var check = true; // Flag possibly missing in convo view.

    var array_with_flag = api.tracker.globals[17][5][1];

    for(var i=0; i<array_with_flag.length; i++) {
      var current = array_with_flag[i];

      if(current[0] === flag_name) {
        flag_value = current[1];
        break;
      }
    }

    if(flag_value !== undefined) {
      var values = {
        '0': true,
        '1': false
      }

      check = values[flag_value];
    }

    return check;
  }


  api.dom.get_left_sidebar_links = function() {
    return $("div[role=navigation] [title]");
  }


  api.dom.search_bar = function() {
    return $("[gh=sb]");
  }


  api.get.search_query = function() {
    var dom = api.dom.search_bar();
    return dom.find('input')[0].value;
  }


  api.get.unread_inbox_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='" + api.tools.i18n('inbox') + "']");

    if(dom.length > 0) {
      if(dom[0].text.indexOf('(') != -1) {
        return parseInt(dom[0].text.replace(/[^0-9]/g, ''));
      }
    }

    return 0;
  }


  api.get.unread_draft_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='" + api.tools.i18n('drafts') + "']");

    if(dom.length > 0) {
      if(dom[0].text.indexOf('(') != -1) {
        return parseInt(dom[0].text.replace(/[^0-9]/g, ''));
      }
    }

    return 0;
  }


  api.get.unread_spam_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='" + api.tools.i18n('spam') + "']");

    if(dom.length > 0) {
      if(dom[0].text.indexOf('(') != -1) {
        return parseInt(dom[0].text.replace(/[^0-9]/g, ''));
      }
    }

    return 0;
  }


  api.get.unread_forum_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='" + api.tools.i18n('forums') + "']");

    if(dom.length > 0) {
      if(dom[0].text.indexOf('(') != -1) {
        return parseInt(dom[0].text.replace(/[^0-9]/g, ''));
      }
    }

    return 0;
  }


  api.get.unread_update_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='" + api.tools.i18n('updates') + "']");

    if(dom.length > 0) {
      if(dom[0].text.indexOf('(') != -1) {
        return parseInt(dom[0].text.replace(/[^0-9]/g, ''));
      }
    }

    return 0;
  }


  api.get.unread_promotion_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='" + api.tools.i18n('promotions') + "']");

    if(dom.length > 0) {
      if(dom[0].text.indexOf('(') != -1) {
        return parseInt(dom[0].text.replace(/[^0-9]/g, ''));
      }
    }

    return 0;
  }


  api.get.unread_social_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='" + api.tools.i18n('social_updates') + "']");

    if(dom.length > 0) {
      if(dom[0].text.indexOf('(') != -1) {
        return parseInt(dom[0].text.replace(/[^0-9]/g, ''));
      }
    }

    return 0;
  }


  api.get.beta = function() {
    var features = {
                    "new_nav_bar" : $('#gbz').length == 0
                   }

    return features;
  }


  api.get.unread_emails = function() {
    return { inbox         : api.get.unread_inbox_emails(),
             drafts        : api.get.unread_draft_emails(),
             spam          : api.get.unread_spam_emails(),
             forum         : api.get.unread_forum_emails(),
             update        : api.get.unread_update_emails(),
             promotions    : api.get.unread_promotion_emails(),
             social        : api.get.unread_social_emails() }
  }


  api.tools.parse_url = function(url) {
    var regex = /[?&]([^=#]+)=([^&#]*)/g;
    var params = {};
    var match;

    while (match = regex.exec(url)) {
      params[match[1]] = match[2];
    }

    return params;
  }

  api.tools.sleep = function(milliseconds) {
    var start = new Date().getTime();
    while(true) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }


  api.tools.multitry = function(delay, tries, func, check, counter, retval) {
    if(counter != undefined && counter >= tries) {
      return retval;
    }

    var counter = (counter == undefined) ? 0 : counter;
    var value = func();

    if(check(value)) {
      return value;
    } else {
      api.tools.sleep(delay)
      api.tools.multitry(delay, tries, func, check, counter+1, value)
    }
  }


  api.tools.deparam = function (params, coerce) {

    var each = function (arr, fnc) {
      var data = [];
      for (i = 0; i < arr.length; i++) {
        data.push(fnc(arr[i]));
      }
      return data;
    };

    var isArray = Array.isArray || function(obj) {
      return Object.prototype.toString.call(obj) == '[object Array]';
    };

    var obj = {},
      coerce_types = {
        'true': !0,
        'false': !1,
        'null': null
      };
    each(params.replace(/\+/g, ' ').split('&'), function (v, j) {
      var param = v.split('='),
        key = decodeURIComponent(param[0]),
        val,
        cur = obj,
        i = 0,
        keys = key.split(']['),
        keys_last = keys.length - 1;
      if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
        keys[keys_last] = keys[keys_last].replace(/\]$/, '');
        keys = keys.shift().split('[').concat(keys);
        keys_last = keys.length - 1;
      } else {
        keys_last = 0;
      }
      if (param.length === 2) {
        val = decodeURIComponent(param[1]);
        if (coerce) {
          val = val && !isNaN(val) ? +val : val === 'undefined' ? undefined : coerce_types[val] !== undefined ? coerce_types[val] : val;
        }
        if (keys_last) {
          for (; i <= keys_last; i++) {
            key = keys[i] === '' ? cur.length : keys[i];
            cur = cur[key] = i < keys_last ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : []) : val;
          }
        } else {
          if (isArray(obj[key])) {
            obj[key].push(val);
          } else if (obj[key] !== undefined) {
            obj[key] = [obj[key], val];
          } else {
            obj[key] = val;
          }
        }
      } else if (key) {
        obj[key] = coerce ? undefined : '';
      }
    });
    return obj;
  }

  api.tools.parse_actions = function(params, xhr) {

    if(params.url.act == 'fup' || params.url.act == 'fuv' || typeof params.body == "object") {
      // a way to stop observers when files are being uploaded. See issue #22
      return;
    }

    if(params.method == 'POST' && typeof params.url.act == 'string') {
      // console.log(params.url, params.body);
    }

    if(params.url.search != undefined) {
      // console.log(params.url, params.body, params.url_raw);
    }

    var triggered = {}; // store an object of event_name: [response_args] for events triggered by parsing the actions
    var action_map = {
                      'tae'         : 'add_to_tasks',
                      'rc_^i'       : 'archive',
                      'tr'          : 'delete',
                      'dm'          : 'delete_message_in_thread',
                      'dl'          : 'delete_forever',
                      'dc_'         : 'delete_label',
                      'dd'          : 'discard_draft',
                      'el'          : 'expand_categories',
                      'cffm'        : 'filter_messages_like_these',
                      'arl'         : 'label',
                      'mai'         : 'mark_as_important',
                      'mani'        : 'mark_as_not_important',
                      'us'          : 'mark_as_not_spam',
                      'sp'          : 'mark_as_spam',
                      'mt'          : 'move_label',
                      'ib'          : 'move_to_inbox',
                      'ig'          : 'mute',
                      'rd'          : 'read',
                      'sd'          : 'save_draft',
                      'sm'          : 'send_message',
                      'mo'          : 'show_newly_arrived_message',
                      'st'          : 'star',
                      'ug'          : 'unmute',
                      'ur'          : 'unread',
                      'xst'         : 'unstar',
                      'new_mail'    : 'new_email',
                      'poll'        : 'poll',
                      'refresh'     : 'refresh',
                      'rtr'         : 'restore_message_in_thread',
                      'open_email'  : 'open_email',
                      'toggle_threads'  : 'toggle_threads'
                     }

    if(typeof params.url.ik == 'string') {
      api.tracker.ik = params.url.ik;
    }

    if(typeof params.url.rid == 'string') {
      if(params.url.rid.indexOf("mail") != -1) {
        api.tracker.rid = params.url.rid;
      }
    }

    var action      = decodeURIComponent(params.url.act);
    var sent_params = api.tools.deparam(params.body)
    var email_ids   = (typeof sent_params.t == 'string') ? [sent_params.t] : sent_params.t;
    var response    = null;

    switch(action) {
      case "ur":
      case "rd":
      case "tr":
      case "sp":
      case "us":
      case "ib":
      case "dl":
      case "st":
      case "xst":
      case "mai":
      case "mani":
      case "ig":
      case "ug":
      case "dd":
      case "mt":
      case "cffm":
      case "rc_^i":
        var response = [email_ids, params.url, params.body];
        break;

      case "arl":
        var response = [email_ids, params.url, params.body, params.url.acn];
        break;

      case "sd":
        var response = [email_ids, params.url, sent_params];
        break;

      case "tae":
      case "sm":
        var response = [params.url, params.body, sent_params];
        break;

      case "el":
        var response = [params.url, params.body, sent_params.ex == '1'];
        break;

      case "dm":
      case "rtr":
        var response = [sent_params.m, params.url, params.body];
        break;

    }

    if(typeof params.url._reqid == 'string' && typeof params.url.th == 'string') {
      var response = [params.url.th, params.url, params.body];
      if(api.observe.bound('new_email')) {
        triggered.new_email = response;
        //api.tracker.watchdog['new_email'].apply(undefined, response);
      }
    }

    if((params.url.view == 'cv' || params.url.view == 'ad') && typeof params.url.th == 'string' && typeof params.url.search == 'string' && params.url.rid == undefined) {
      var response = [params.url.th, params.url, params.body];
      if(api.observe.bound('open_email')) {
        triggered.open_email = response;
        //api.tracker.watchdog['open_email'].apply(undefined, response);
      }
    }

    if((params.url.view == 'cv' || params.url.view == 'ad') && typeof params.url.th == 'object' && typeof params.url.search == 'string' && params.url.rid != undefined) {
      var response = [params.url.th, params.url, params.body];
      if(api.observe.bound('toggle_threads')) {
        triggered.toggle_threads = response;
        // api.tracker.watchdog['toggle_threads'].apply(undefined, response);
      }
    }

    if((params.url.view == 'cv' || params.url.view == 'ad') && typeof params.url.th == 'string' && typeof params.url.search == 'string' && params.url.rid != undefined) {
      if(params.url.msgs != undefined) {
        var response = [params.url.th, params.url, params.body];
        if(api.observe.bound('toggle_threads')) {
          triggered.toggle_threads = response;
          // api.tracker.watchdog['toggle_threads'].apply(undefined, response);
        }
      }
    }

    if(typeof params.url.SID == 'string' && typeof params.url.zx == 'string' && params.body.indexOf('req0_') != -1) {
      api.tracker.SID = params.url.SID;
      var response = [params.url, params.body, sent_params];
      if(api.observe.bound('poll')) {
        triggered.poll = response;
        //api.tracker.watchdog['poll'].apply(undefined, response);
      }
    }

    if(typeof params.url.ik == 'string' && typeof params.url.search == 'string' && params.body.length == 0 && typeof params.url._reqid == 'string') {
      var response = [params.url, params.body, sent_params];
      if(api.observe.bound('refresh')) {
        triggered.refresh = response;
        //api.tracker.watchdog['refresh'].apply(undefined, response);
      }
    }

    if(response && api.observe.bound(action_map[action])) {
      triggered[action_map[action]] = response;
    }
    return {
      triggered: triggered,
      body_params: sent_params,
      email_ids: email_ids
    };
    /*
    if(response != null) {

      if(api.observe.bound(action_map[action])) {
        triggered[action_map[action]] = response;
        //api.tracker.watchdog[action_map[action]].apply(undefined, response);
      }

      if(action_map[action] in api.tracker.response_watchdog) {
        var curr_onreadystatechange = xhr.onreadystatechange;
        xhr.onreadystatechange = function(progress) {
          if (this.readyState === this.DONE) {
            response.push(api.tools.parse_response(progress.target.responseText));
            api.tracker.response_watchdog[action_map[action]].apply(undefined, response);
          }
          if (curr_onreadystatechange) {
            curr_onreadystatechange.apply(this, arguments);
          }
        }
      }

    }*/

  }

  api.tools.parse_response = function(response) {
      var parsedResponse = [],
          data, dataLength, endIndex, realData;

      try {

        // gmail post response structure
        // )}]'\n<datalength><rawData>\n<dataLength><rawData>...

        // prepare response, remove eval protectors
        response = response.replace(/\n/g, ' ');
        response = response.substring(response.indexOf("'") + 1, response.length);

        while(response.replace(/\s/g, '').length > 1) {

          // how long is the data to get
          dataLength = response.substring(0, response.indexOf('[')).replace(/\s/g, '');
          if (!dataLength) {dataLength = response.length;}

          // get raw data
          endIndex = (parseInt(dataLength, 10) - 2) + response.indexOf('[');
          data = response.substring(response.indexOf('['), endIndex);

          // eval raw data
          realData = eval(data);
          parsedResponse.push(realData);

          // prepare response for next loop
          response = response.substring(response.indexOf('['), response.length);
          response = response.substring(data.length, response.length);
        }
      } catch (e) {
          console.log('Gmail post response parsing failed.', e);
      }

      return parsedResponse;
  }

  api.tools.parse_requests = function(params, xhr) {
    params.url_raw = params.url;
    params.url = api.tools.parse_url(params.url);

    if(typeof api.tracker.events != 'object' && typeof api.tracker.actions != 'object') {
      api.tracker.events  = [];
      api.tracker.actions = [];
    }

    api.tracker.events.unshift(params);
    var events = api.tools.parse_actions(params, xhr);

    if(params.method == 'POST' && typeof params.url.act == 'string') {
      api.tracker.actions.unshift(params);
    }

    if(api.tracker.events.length > 50) {
      api.tracker.events.pop();
    }

    if(api.tracker.actions.length > 10) {
      api.tracker.actions.pop();
    }
    return events;
  }


  api.tools.xhr_watcher = function () {
    var self = this;

    if (!api.tracker.xhr_init) {
      var win = top.document.getElementById("js_frame").contentDocument.defaultView;

      api.tracker.xhr_init = true;
      api.tracker.xhr_open = win.XMLHttpRequest.prototype.open;
      api.tracker.xhr_send = win.XMLHttpRequest.prototype.send;

      win.XMLHttpRequest.prototype._gjs_open = win.XMLHttpRequest.prototype.open;
      win.XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
        var out = this._gjs_open.apply(this, arguments);
        this.xhrParams = {
          method: method.toString(),
          url: url.toString()
        };
        return out;
      };

      win.XMLHttpRequest.prototype._gjs_send = win.XMLHttpRequest.prototype.send;
      win.XMLHttpRequest.prototype.send = function (body) {

        // parse the xhr request to determine if any events should be triggered
        var events = false;
        if (this.xhrParams) {
          this.xhrParams.body = body;
          events = api.tools.parse_requests(this.xhrParams, this);
          this.xhrParams.body_params = events.body_params;
        }

        // fire before events
        api.observe.trigger('before', events, this);

        // TODO: recreate the url & arguments[0]/body strings

        // send the original request off
        var out = this._gjs_send.apply(this, arguments);

        // fire on events
        api.observe.trigger('before', events, this);

        // if any after events, bind onreadystatechange callback
        if(api.observe.bound(null,'after')) {
          var curr_onreadystatechange = this.onreadystatechange;
          var xhr = this;
          this.onreadystatechange = function(progress) {
            if (this.readyState === this.DONE) {
              //response.push(api.tools.parse_response(progress.target.responseText));
              xhr.xhrResponse = api.tools.parse_response(progress.target.responseText);
              api.observe.trigger('after', events, xhr);
              //api.tracker.response_watchdog[action_map[action]].apply(undefined, response);
            }
            if (curr_onreadystatechange) {
              curr_onreadystatechange.apply(this, arguments);
            }
          }
        }
        return out;
      }
    }
  }


  api.observe.http_requests = function() {
    return api.tracker.events;
  }


  api.observe.actions = function() {
    return api.tracker.actions;
  }

  /**
    Bind a specified callback to an array of callbacks against a specified type & action
   */
  api.observe.bind = function(type, action, callback) {

    // set up watchdog data structure
    if(typeof api.tracker.watchdog != "object") {
      api.tracker.watchdog = {
        before: {},
        on: {},
        after: {},
        dom: {}
      };
      api.tracker.bound = {};
    }
    if( typeof api.tracker.watchdog[type] != "object" ) {
      throw('api.observe.bind called with invalid type: ' + type);
    }

    // ensure we are watching xhr requests
    if(type != 'dom' && !api.tracker.xhr_init) {
      api.tools.xhr_watcher();
    }

    // add callback to an array in the watchdog
    if(typeof api.tracker.watchdog[type][action] != 'object') {
      api.tracker.watchdog[type][action] = [];
    }
    api.tracker.watchdog[type][action].push(callback);
    
    // allow checking for bound events to specific action/type as efficiently as possible (without in looping) - bit dirtier code, 
    // but lookups (api.observer.bound) are executed by the hundreds & I think the extra efficiency is worth the tradeoff
    api.tracker.bound[action] = typeof api.tracker.bound[action] == 'undefined' ? 1 : api.tracker.bound[action]+1;
    api.tracker.bound[type] = typeof api.tracker.bound[type] == 'undefined' ? 1 : api.tracker.bound[type]+1;
    //api.tracker.watchdog[action] = callback;
  }

  /**
    an on event is observed just after gmail sends an xhr request
   */
  api.observe.on = function(action, callback, response_callback) {

    // check for DOM observer actions, and if none found, the assume an XHR observer
    if(api.observe.on_dom(action, callback)) return true;
    
    // bind xhr observers
    api.observe.bind('on', action, callback);
    if (response_callback) {
      api.observe.after(action, callback);
    }
  }

  /**
    an before event is observed just prior to the gmail xhr request being sent
    before events have the ability to modify the xhr request before it is sent
   */
  api.observe.before = function(action, callback) {
    api.observe.bind('before', action, callback);
  }

  /**
    an after event is observed when the gmail xhr request returns from the server
    with the server response
   */
  api.observe.after = function(action, callback) {
    api.observe.bind('after', action, callback);
  }

  /**
    Checks if a specified action & type has anything bound to it
    If type is null, will check for this action bound on any type
    If action is null, will check for any actions bound to a type
   */
  api.observe.bound = function(action, type) {
    if(typeof api.tracker.watchdog != "object") return false;
    if(action) {
      if(type) return typeof api.tracker.watchdog[type][action] == "object";
      return api.tracker.bound[action] > 0;
    } else {
      if(type) return api.tracker.bound[type] > 0;
      throw('api.observe.bound called with invalid args');
    }
    
    
    /*var found = false;
    $.each(api.tracker.watchdog, function(type, val) {
      if(api.tracker.watchdog[type][action]) found = true;
    });
    return found;*/
  }

  /**
    Clear all callbacks for a specific type (before, on, after, dom) and action
    If action is null, all actions will be cleared
    If type is null, all types will be cleared
   */
  api.observe.off = function(action, type) {

    // if watchdog is not set, bind has not yet been called so nothing to turn off
    if(typeof api.tracker.watchdog != "object") return true;

    // if clearing everything, stop watching xhr
    if( !type && !action) {
      var win = top.document.getElementById("js_frame").contentDocument.defaultView;
      win.XMLHttpRequest.prototype.open = api.tracker.xhr_open;
      win.XMLHttpRequest.prototype.send = api.tracker.xhr_send;
      api.tracker.xhr_init = false
    }

    // loop through applicable types
    var types = type ? [ type ] : [ 'before', 'on', 'after', 'dom' ];
    $.each(types, function(idx, type) {
      if( typeof api.tracker.watchdog[type] != 'object' ) return true; // no callbacks for this type

      // if action specified, remove any callbacks for this action, otherwise remove all callbacks for all actions
      if(action) {
        if( typeof api.tracker.watchdog[type][action] == 'object' ) {
          api.tracker.bound[action] -= api.tracker.watchdog[type][action].length;
          api.tracker.bound[type] -= api.tracker.watchdog[type][action].length;
          delete api.tracker.watchdog[type][action];
        }
      } else {
        $.each(api.tracker.watchdog[type], function(act,callbacks) {
          if( typeof api.tracker.watchdog[type][act] == 'object' ) {
            api.tracker.bound[act] -= api.tracker.watchdog[type][act].length;
            api.tracker.bound[type] -= api.tracker.watchdog[type][act].length;
            delete api.tracker.watchdog[type][act];
          }
        });
      }
    });
  }

  /**
    Trigger any specified events bound to the passed type
   */
  api.observe.trigger = function(type, events, xhr) {

    $.each(events.triggered, function(action,response) {

      // we have to do this here each time to keep backwards compatibility with old response_callback implementation
      response = $.extend([], response); // break the reference so it doesn't keep growing each trigger
      if(type == 'after') response.push(xhr.xhrResponse); // backwards compat for after events requires we push onreadystatechange parsed response first
      response.push(xhr); 
      if(api.tracker.bound(action, type)) {
        $.each(api.tracker.watchdog[type][action], function(idx, callback) {
          callback.apply(undefined, response);
        });
      }
    });
  }

  /**
    Observe DOM nodes being inserted. When a node with a class defined in api.tracker.dom_observers is inserted,
    trigger the related event and fire off any relevant bound callbacks
    This function should return true if a dom observer is found for the specified action
   */
  api.observe.on_dom = function(action, callback) {
    // map observers to DOM class names
    // as elements are inserted into the DOM, these classes will be checked for and mapped events triggered,
    // receiving 'e' event object, and a jquery bound inserted DOM element
    // Config example: event_name: {
    //                   class: 'className', // required - check for this className in the inserted DOM element
    //                   sub_selector: 'div.className', // if specified, we do a jquery element.find for the passed selector on the inserted element
    //                   handler: function( matchElement, callback ) {}, // if specified this handler is called if a match is found. Otherwise default calls the callback & passes the jQuery matchElement
    //                 },
    // TODO: current limitation allows only 1 action per watched className (i.e. each watched class must be 
    //       unique). If this functionality is needed this can be worked around by pushing actions to an array
    //       in api.tracker.dom_observer_map below
    // console.log( 'Observer set for', action, callback);
    api.tracker.dom_observers = {
      'compose': {
        class: 'nH',
        sub_selector: 'div.AD',
        handler: function(match, callback) {
          callback(new api.dom.compose(match));
        },
      },
      'recipient_change': {
        class: 'vR',
        handler: function(match, callback) {
          // console.log('compose:recipient handler called',match,callback);

          // we need to small delay on the execution of the handler as when the recipients field initialises on a reply (or reinstated compose/draft)
          // then multiple DOM elements will be inserted for each recipient causing this handler to execute multiple times
          // in reality we only want a single callback, so give other nodes time to be inserted & then only execute the callback once
          if(typeof api.tracker.recipient_matches != 'object') {
            api.tracker.recipient_matches = [];
          }
          api.tracker.recipient_matches.push(match);
          setTimeout(function(){
            // console.log('recipient timeout handler', api.tracker.recipient_matches.length);
            if(!api.tracker.recipient_matches.length) return;
            // console.log('executing recipient timeout handler', api.tracker.recipient_matches);

            // determine an array of all emails specified for To, CC and BCC and extract addresses into an object for the callback
            var compose = api.tracker.recipient_matches[0].closest('.GS');
            var recipients = {};
            compose.find('input[type=hidden]').each(function(idx, recipient ){
              if(!recipients[recipient.name]) recipients[recipient.name] = [];
              recipients[recipient.name].push(recipient.value);
            });
            callback(api.tracker.recipient_matches, recipients);

            // reset matches so no future delayed instances of this function execute
            api.tracker.recipient_matches = [];
          },100);
        },
      },

      // this will fire if a new reply or forward is created. it won't fire if a reply changes to a forward & vice versa
      'reply_forward': {
        class: 'An', // M9 would be better but this isn't set at the point of insertion
        handler: function(match, callback) {
          // console.log('reply_forward handler called', match, callback);

          // look back up the DOM tree for M9 (the main reply/forward node)
          match = match.closest('div.M9');
          if(!match.length) return;
          var type = match.find('input[name=subject]').val().indexOf('Fw') == 0 ? 'Forward' : 'Reply';
          callback(match,type);
        }
      },
    };

    // support for DOM observers
    if( api.tracker.dom_observers[action] ) {

      //console.log('observer found',api.tracker.dom_observers[action]);

      // if we haven't yet bound the DOM insertion observer, do it now
      if(!api.tracker.observing_dom) {
        api.tracker.observing_dom = true;
        //api.tracker.dom_watchdog = {}; // store passed observer callbacks for different DOM events

        // map observed classNames to actions
        api.tracker.dom_observer_map = {};
        $.each(api.tracker.dom_observers, function(act,config){
          api.tracker.dom_observer_map[config.class] = act;
        });
        // console.log( 'dom_observer_map', api.tracker.dom_observer_map);

        // default handler
        var default_handler = function(match, callback) {
          callback(match);
        };

        // this listener will check every element inserted into the DOM
        // for specified classes (as defined in api.tracker.dom_observers above) which indicate 
        // specified actions which need triggering
        $(window.document).bind('DOMNodeInserted', function(e) {
          //console.log('insertion', e.target);

          // loop through each of the inserted elements classes & check for a defined observer on that class
          $.each(e.target.className.split(/\s+/), function(idx, className) {
            var observer = api.tracker.dom_observer_map[className];

            // check if this is a defined observer, and callbacks are bound to that observer
            if(observer && api.tracker.watchdog.dom[observer]) {
              var element = $(e.target);
              var config = api.tracker.dom_observers[observer];
              if(config.sub_selector) {
                element = element.find(config.sub_selector);
                // console.log('checking for subselector', config.sub_selector, element);
              }
              
              // if an element has been found, execute the observer handler (or if none defined, execute the callback)
              if(element.length) {
                var handler = config.handler ? config.handler : default_handler;
                // console.log( 'inserted DOM: class match in watchdog',observer,api.tracker.watchdog.dom[observer] );
                $.each(api.tracker.watchdog.dom[observer], function(idx, callback) {
                  handler(element, callback);
                });
              }
            }
          });
        });
      }
      api.observe.bind('dom',action,callback);
      // console.log(api.tracker.observing_dom,'dom_watchdog is now:',api.tracker.dom_watchdog);
      return true;

    // support for gmail interface load event
    } else if( action == 'load' ) {

      // wait until the gmail interface has finished loading and then
      // execute the passed handler. If interface is already loaded,
      // then will just execute callback
      if( api.dom.inbox_content().length ) return callback();
      var load_count = 0;
      var delay = 200; // 200ms per check
      var attempts = 50; // try 50 times before giving up & assuming an error
      var timer = setInterval( function() {
        var test = api.dom.inbox_content().length;
        if( test > 0 ) {
          clearInterval(timer);
          return callback();
        } else if( ++load_count > attempts ) {
          clearInterval(timer);
          console.log('Failed to detect interface load in ' + (delay*attempts/1000) + ' seconds. Will automatically fire event in 5 further seconds.');
          setTimeout(callback, 5000);
        }
      }, delay );
      return true;
    }
  }


  api.tools.make_request = function (link, method) {

    var method  = (typeof method == undefined || typeof method == null) ? 'GET' : method;
    var request = $.ajax({ type: method, url: encodeURI(link), async:false });

    return request.responseText;
  }


  api.tools.parse_view_data = function(view_data) {
    var parsed = [];
    var data = [];

    for(var j=0; j < view_data.length; j++) {
      if(view_data[j][0] == 'tb') {
        for(var k=0; k < view_data[j][2].length; k++) {
          data.push(view_data[j][2][k]);
        }
      }
    }

    for(var i=0; i < data.length; i++) {
      var x = data[i];
      var temp = {};

      parsed.push({
        id: x[0],
        title : x[9],
        excerpt : x[10],
        time : x[15],
        sender : x[28],
        attachment : x[13],
        labels: x[5]
      });
    }

    return parsed;
  }


  api.get.visible_emails = function() {
    var page = api.get.current_page();
    var url = window.location.origin + window.location.pathname + '?ui=2&ik=' + api.tracker.ik+'&rid=' + api.tracker.rid + '&view=tl&start=0&num=120&rt=1';

    if(page.indexOf('label/') == 0) {
      url += '&cat=' + page.split('/')[1] +'&search=cat';
    } else if(page.indexOf('category/') == 0) {
      if(page.indexOf('forums') != -1) {
        cat_label = 'group';
      } else if(page.indexOf('updates') != -1) {
        cat_label = 'notification';
      } else if(page.indexOf('promotion') != -1) {
        cat_label = 'promo';
      } else if(page.indexOf('social') != -1) {
        cat_label = 'social';
      }
      url += '&cat=^smartlabel_' + cat_label +'&search=category';
    } else if(page.indexOf('search/') == 0) {
      url += '&qs=true&q=' + page.split('/')[1] +'&search=query';
    } else {
      url += '&search=' + page;
    }

    var get_data = api.tools.make_request(url);
        get_data = get_data.substring(get_data.indexOf('['), get_data.length);
        get_data = 'api.tracker.view_data = ' + get_data;

    eval(get_data)

    var emails = [];

    for(i in api.tracker.view_data) {
      var cdata = api.tools.parse_view_data(api.tracker.view_data[i]);
      if(cdata.length > 0) {
        $.merge(emails, cdata);
      }
    }

    return emails;
  }


  api.get.current_page = function() {
    var hash  = window.location.hash.split('#').pop();
    var pages = ['sent', 'inbox', 'starred', 'drafts', 'imp', 'chats', 'all', 'spam', 'trash', 'settings'];

    var page = null;

    if($.inArray(hash, pages) > -1) {
      page = hash;
    }

    if(hash.indexOf('label/') == 0 || hash.indexOf('category/') == 0 || hash.indexOf('search/') == 0 || hash.indexOf('settings/') == 0) {
      if(hash.split('/').length < 3) {
        page = hash;
      }
    }

    return page;
  }


  api.tools.infobox = function(message, time){
    var top = $(".b8.UC");

    // initial Gmail style I noticed on 26 / 05 / 2014 for $(".b8.UC") :
    // style="position: relative; top: -10000px;"
    // Seems that when Gmail shows infobox, the style is simply removed
    // - from what I can see in DevTools Elements Panel

    if(top.length > 0){
      var info = top.find(".vh");
      info.text(message);
      if(typeof time !== "undefined"){
        var initialInfoboxStyle = top.attr("style");            // backup initial style
        top.removeAttr("style").fadeTo(time, 0, function(){     // simply remove then restore
          $(this).attr("style", initialInfoboxStyle);           // style attribute insteed of playing
        });                             // on visibility property
      }
      else{
        top.removeAttr("style");                    // dito
      }
    }
  }

  api.tools.parse_email_data = function(email_data) {
    var data = {};
    var threads = {}

    for(i in email_data) {
      var x = email_data[i];
      if(x[0] == 'cs') {
        data.first_email = x[1];
        data.last_email = x[2];
        data.total_emails = x[3];
        data.total_threads = x[8];
        data.people_involved = x[15];
        data.subject = x[23];
      }

      if(x[0] == 'ms') {
        if(data.threads == undefined) {
          data.threads = {};
        }

        data.threads[x[1]] = {};
        data.threads[x[1]].is_deleted = x[13] == undefined;
        data.threads[x[1]].reply_to_id = x[2];
        data.threads[x[1]].from = x[5];
        data.threads[x[1]].from_email = x[6];
        data.threads[x[1]].timestamp = x[7];
        data.threads[x[1]].datetime = x[24];
        data.threads[x[1]].attachments = x[21].split(',');
        data.threads[x[1]].content_plain = x[8];
        data.threads[x[1]].subject = x[12];
        data.threads[x[1]].content_html = (x[13] != undefined) ? x[13][6] : x[8];
        data.threads[x[1]].to = (x[13] != undefined) ? x[13][1] : [];
        data.threads[x[1]].cc = (x[13] != undefined) ? x[13][2] : [];
        data.threads[x[1]].bcc = (x[13] != undefined) ? x[13][3] : [];
      }
    }

    return data;
  }


  api.get.email_data = function(email_id) {

    if(api.check.is_inside_email() && email_id == undefined) {
      email_id = api.get.email_id();
    }

    if(email_id != undefined) {
      var url = window.location.origin + window.location.pathname + '?ui=2&ik=' + api.tracker.ik + '&rid=' + api.tracker.rid + '&view=cv&th=' + email_id + '&msgs=&mb=0&rt=1&search=inbox';
      var get_data = api.tools.make_request(url);
          get_data = get_data.substring(get_data.indexOf('['), get_data.length);
          get_data = 'var cdata = ' + get_data;

      eval(get_data);

      api.tracker.email_data = cdata[0];

      return api.tools.parse_email_data(api.tracker.email_data);
    }

    return {};
  }


  api.get.displayed_email_data = function() {
    var email_data = api.get.email_data();
    var displayed_email_data = {};

    if (api.check.is_conversation_view()) {
      displayed_email_data = email_data;

      var threads = displayed_email_data.threads;
      var total_threads = displayed_email_data.total_threads;

      var hash = window.location.hash.split('#')[1] || '';
      var is_in_trash = (hash.indexOf('trash') === 0);

      for (id in threads) {
        var email = threads[id];
        var keep_email = (is_in_trash) ? email.is_deleted : !email.is_deleted;

        if (!keep_email) {
          delete threads[id];
          total_threads.splice(total_threads.indexOf(id), 1);
          displayed_email_data.total_emails--;
          // TODO: remove people involved only in this email.
        }
      }
    }
    else { // Supposing only one displayed email.
      for (id in email_data.threads) {
        var displayed_email_element = $('.ii.gt[class*="' + id + '"]');

        if (displayed_email_element.length > 0) {
          var email = email_data.threads[id];

          displayed_email_data.first_email = id;
          displayed_email_data.last_email = id;
          displayed_email_data.subject = email_data.subject;

          displayed_email_data.threads = {};
          displayed_email_data.threads[id] = email;
          displayed_email_data.total_emails = 1;
          displayed_email_data.total_threads = [id];

          displayed_email_data.people_involved = [];

          displayed_email_data.people_involved.push(
            [email.from, email.from_email]
          );

          email.to.forEach(function(recipient) {
            var address = api.tools.extract_email_address(recipient);
            var name = api.tools.extract_name(recipient.replace(address, '')) || '';

            displayed_email_data.people_involved.push(
              [name, address]
            );
          });

          break;
        }
      }
    }

    return displayed_email_data;
  }


  api.check.is_conversation_view = function() {
    var flag_name = 'bx_vmb';
    var flag_value = undefined;

    var array_with_flag = api.tracker.globals[17][5][1];

    for (var i = 0; i < array_with_flag.length; i++) {
      var current = array_with_flag[i];

      if (current[0] === flag_name) {
        flag_value = current[1];

        break;
      }
    }

    return flag_value === '0' || flag_value === undefined;
  }


  api.tools.extract_email_address = function(str) {
    var regex = /[\+a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+/gi;
    var matches = (str) ? str.match(regex) : undefined;

    return (matches) ? matches[0] : undefined;
  }


  api.tools.extract_name = function(str) {
    var regex = /[a-z'._-\s]+/gi;
    var matches = (str) ? str.match(regex) : undefined;

    return (matches && matches[0]) ? matches[0].trim() : undefined;
  }


  api.tools.i18n = function(label) {
    var locale = api.tracker.globals[17][9][8];
    var dictionary;

    switch (locale) {
      case 'fr':
        dictionary = {
          'inbox': 'Boîte de réception',
          'drafts': 'Brouillons',
          'spam': 'Spam',
          'forums': 'Forums',
          'updates': 'Mises à jour',
          'promotions': 'Promotions',
          'social_updates': 'Réseaux sociaux'
        };
        break;

      case 'en':
      default:
        dictionary = {
          'inbox': 'Inbox',
          'drafts': 'Drafts',
          'spam': 'Spam',
          'forums': 'Forums',
          'updates': 'Updates',
          'promotions': 'Promotions',
          'social_updates': 'Social Updates'
        };
        break;
    }

    return dictionary[label];
  }

  api.chat.is_hangouts = function() {
    if(api.tracker.hangouts != undefined) {
      return api.tracker.hangouts;
    }

    // Returns true if the user is using hangouts instead of the classic chat
    var dwClasses = $(".dw");
    if(dwClasses.length > 1) {
      throw "Figuring out is hangouts - more than one dw classes found";
    }
    if(dwClasses.length == 0) {
      throw "Figuring out is hangouts - no dw classes found";
    }

    var dw = dwClasses[0];

    var chatWindows = $('.nH.aJl.nn', dw);
    if(chatWindows.length > 0) {
      // hangouts
      api.tracker.hangouts = true;
      return true;
    }

    var chatWindows = $('.nH.nn', dw);
    if(chatWindows.length > 2) {
      // classic
      api.tracker.hangouts = false;
      return false;
    }
    return undefined;
  }

  // retrieve queue of compose window dom objects
  // latest compose at the start of the queue (index 0)
  api.dom.composes = function() {
    objs = [];
    $('div.AD').each(function(idx, el) {
      objs.push( new api.dom.compose(el) );
    });
    return objs;
  }

  /**
    A compose object. Represents a compose window in the DOM and provides a bunch of methods and properties to access & interact with the window
    Expects a jQuery DOM element for the compose div
    TODO: Make to, cc, cc, subject etc functions receive an argument to set these fields
   */
  api.dom.compose = function(element) {
    element = $(element);
    if(!element || !element.hasClass('AD')) throw('api.dom.compose called with invalid element');
    this.$el = element;
    return this;
  }
  $.extend(api.dom.compose.prototype, {

    /**
      Retrieves to, cc, bcc and returns them in a hash of arrays
      Parameters:
        options.type  string  to, cc, or bcc to check a specific one
        options.flat  boolean if true will just return an array of all recipients instead of splitting out into to, cc, and bcc
     */
    recipients: function(options) {
      if( typeof options != 'object' ) options = {};
      var name_selector = options.type ? '[name=' + options.type + ']' : '';

      // determine an array of all emails specified for To, CC and BCC and extract addresses into an object for the callback
      var recipients = options.flat ? [] : {};
      this.$el.find('.GS input[type=hidden]'+name_selector).each(function(idx, recipient ){
        if(options.flat) {
          recipients.push(recipient.value);
        } else {
          if(!recipients[recipient.name]) recipients[recipient.name] = [];
          recipients[recipient.name].push(recipient.value);
        }
      });
      return recipients;
    },
//document.activeElement
    /**
      Retrieve the current 'to' recipients
      TODO: ability to set
     */
    to: function(to) {
      return this.recipients( { type: 'to', flat: true } );
    },

    /**
      Retrieve the current 'cc' recipients
      TODO: ability to set
     */
    cc: function() {
      return this.recipients( { type: 'cc', flat: true } );
    },

    /**
      Retrieve the current 'bcc' recipients
      TODO: ability to set
     */
    bcc: function() {
      return this.recipients( { type: 'bcc', flat: true } );
    },

    /**
      Get/Set the current subject
      Parameters:
        subject   string  set as new subject
     */
    subject: function(subject) {
      var el = this.dom('subject');
      if(subject) el.val(subject);
      return el.val();
    },

    /**
      Get/Set the email body
     */
    body: function(body) {
      var el = this.dom('body');
      if(body) el.html(body);
      return el.html();
    },

    /**
      Map find through to jquery element
     */
    find: function(selector) {
      return this.$el.find(selector);
    },

    /**
      Retrieve preconfigured dom elements for this compose window
     */
    dom: function(lookup) {
      var config = {
        subject: 'input[name=subjectbox]',
        body: 'div[contenteditable=true]'
      };
      if(!config[lookup]) throw('Dom lookup failed. Unable to find config for \'' + lookup + '\'');
      return this.$el.find(config[lookup]);
    }

  });

  return api;
}
