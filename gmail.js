var Gmail =  function() {

  var api = {
              get : {},
              observe : {},
              check : {},
              tools : {},
              tracker : {},
              dom : {}
            };


  api.get.user_email = function() {
    return GLOBALS[10];
  };


  api.check.is_thread = function() {
    var check_1 = $($($('.nH .if').children()[1]).children().children()[1]).children();
    var check_2 = $($($($('.nH .if').children()[1]).children()).children()[1]).children();
    var check_3 = api.get.email_ids();

    return (check_1.length > 1 || check_2.length > 1) || check_3.length > 1;
  };


  api.dom.inbox_content = function() {
    return $('div[role=main]:first');
  }


  api.check.is_preview_pane = function() {
    var dom = api.dom.inbox_content();
    var box = dom.find("[gh=tl]");

    if(box.length > 0) {
      return box[0].getAttribute('class').indexOf('aia') != -1;
    }

    return false;
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
    var used = $(div).find('span')[0].innerText;
    var total = $(div).find('span')[1].innerText;
    var percent = parseFloat(used.replace(/[^0-9\.]/g, '')) * 100 / parseFloat(total.replace(/[^0-9\.]/g, ''));

    return {used : used, total : total, percent : Math.floor(percent)}
  }


  api.dom.email_subject = function () {
    return $('h1.ha');
  }


  api.get.email_subject = function() {
    var subject_dom = api.dom.email_subject();

    return subject_dom.find('.hP')[0].innerText;
  }


  api.dom.email_body = function() {
    return $('.nH.hx');
  }


  api.check.is_inside_email = function() {
    return api.dom.email_contents().length > 0;
  }


  api.dom.email_contents = function() {
    return $('.ii.gt');
  }


  api.get.email_ids = function () {
    var items = api.dom.email_contents();
    var ids = [];

    for(var i=0; i<items.length; i++) {
      var mail_id = items[i].getAttribute('class').split(' ')[2];
      var is_editable = items[i].getAttribute('contenteditable');
      if(mail_id != 'undefined' && mail_id != undefined) {
        if(is_editable != 'true') {
          ids.push(mail_id);
        }
      }
    }

    return ids;
  }


  api.get.email_id = function() {
    var hash = null;

    if(api.check.is_inside_email()) {
      if(api.check.is_preview_pane()) {
        var text = api.get.email_ids();
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


  api.check.is_xobini_installed = function() {
    return $('#xobni_frame').length > 0;
  }


  api.check.is_signal_installed = function() {
    return $("[id^='Signal'],[id*=' Signal'],[class*=' signal'],[class*='signal']").length > 0;
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
    var dom = $("div[role=navigation]").find("[title*='Inbox']");

    if(dom.length > 0) {
      if(dom[0].innerText.indexOf('(') != -1) {
        return parseInt(dom[0].innerText.replace(/[^0-9]/g, ''));
      }
    }

    return -1;
  }


  api.get.unread_draft_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='Drafts']");

    if(dom.length > 0) {
      if(dom[0].innerText.indexOf('(') != -1) {
        return parseInt(dom[0].innerText.replace(/[^0-9]/g, ''));
      }
    }

    return -1;
  }


  api.get.unread_spam_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='Spam']");

    if(dom.length > 0) {
      if(dom[0].innerText.indexOf('(') != -1) {
        return parseInt(dom[0].innerText.replace(/[^0-9]/g, ''));
      }
    }

    return -1;
  }


  api.get.unread_forum_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='Forums']");

    if(dom.length > 0) {
      if(dom[0].innerText.indexOf('(') != -1) {
        return parseInt(dom[0].innerText.replace(/[^0-9]/g, ''));
      }
    }

    return -1;
  }


  api.get.unread_notification_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='Notifications']");

    if(dom.length > 0) {
      if(dom[0].innerText.indexOf('(') != -1) {
        return parseInt(dom[0].innerText.replace(/[^0-9]/g, ''));
      }
    }

    return -1;
  }


  api.get.unread_promotion_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='Promotions']");

    if(dom.length > 0) {
      if(dom[0].innerText.indexOf('(') != -1) {
        return parseInt(dom[0].innerText.replace(/[^0-9]/g, ''));
      }
    }

    return -1;
  }


  api.get.unread_social_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='Social Updates']");

    if(dom.length > 0) {
      if(dom[0].innerText.indexOf('(') != -1) {
        return parseInt(dom[0].innerText.replace(/[^0-9]/g, ''));
      }
    }

    return -1;
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
             notifications : api.get.unread_notification_emails(),
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


  api.tools.parse_requests = function(params) {
    var parsed = api.tools.parse_url(params.url);
    console.log(parsed, params);
  }


  api.tools.xhrWatcher = function () {
    var self = this;

    if (!api.tracker.xhr_initialized) {
      api.tracker.xhr_initialized = true;
      var win = top.document.getElementById("js_frame").contentDocument.defaultView;

      win.XMLHttpRequest.prototype._Gmail_open = win.XMLHttpRequest.prototype.open;
      win.XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
        var out = this._Gmail_open.apply(this, arguments);
        this.xhrParams = {
          method: method.toString(),
          url: url.toString()
        };
        return out;
      };

      win.XMLHttpRequest.prototype._Gmail_send = win.XMLHttpRequest.prototype.send;
      win.XMLHttpRequest.prototype.send = function (body) {
        var out = this._Gmail_send.apply(this, arguments);
        if (this.xhrParams) {
          this.xhrParams.body = body;
          api.tools.parse_requests(this.xhrParams);
        }

        return out;
      }

      if(!top._Gmail_iframeFn) {
        top._Gmail_iframeFn = top.GG_iframeFn;
        this.iframeData = {};
        this.iframeCachedData = [];
        this.iframeCachedData.push({
          responseDataId: 1,
          url: top.location.href,
          responseData: top.VIEW_DATA
        });

        top.GG_iframeFn = function (win, data) {
          var d = top._Gmail_iframeFn.apply(this, arguments);
          try {
            var url = win && win.location ? win.location.href : null;
            if(url && data && (url.indexOf("act=") != -1)) {

              if(!self.iframeData[url]) {

                var body = "";
                var parent = win.frameElement.parentNode;
                if (parent && $(parent).find('form').length > 0)
                  body = $(parent).find('form').first().serialize();

                self.iframeData[url] = true;
              }
            }
          } catch(e) {
            try {
              console.log("DEBUG error in GG_iframeFn: " + e);
            } catch (e) {}
          }
          return d;
        }
      }

    }
  }


  return api;
}
