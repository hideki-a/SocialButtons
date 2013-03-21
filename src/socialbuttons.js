/*!*
 * Social Buttons
 * Version 1.0.0
 * Copyright (c) 2012 Hideki Abe
 *
 * Dual licensed under the MIT and GPL licenses.
 */
/*jslint browser: true, eqeq: false, nomen: true, plusplus: false, maxerr: 100, indent: 4 */
(function (window, document) {
    "use strict";
    var event = {},
        loadFlg = false,
        pretreatmentFunc = {},
        aftertreatmentFunc = {},
        qsaSupport,
        currentUrl = location.href;

    pretreatmentFunc = {
        facebook: function () {
            var elem = document.getElementById("socialbox"),
                div = document.createElement("div");

            div.id = "fb-root";
            elem.parentNode.insertBefore(div, elem);

            window.fbAsyncInit = function () {
                FB.Event.subscribe("edge.create", function (targetUrl) {
                    _gaq.push(['_trackSocial', 'facebook', 'like', targetUrl]);
                });
            };
        },
        google: function () {
            window.___gcfg = { lang: 'ja' };
        }
    };

    aftertreatmentFunc = {
        twitter: function () {
            window.twttr = window.twttr || {
                _e: [],
                ready: function (f) {
                    window.twttr._e.push(f);
                }
            };

            window.twttr.ready(function (twttr) {
                twttr.events.bind("tweet", function (intentEvent) {
                    if (intentEvent) {
                        _gaq.push(["_trackSocial", "twitter", "tweet", currentUrl]);
                    }
                });
            });
        }
    };

    event = {
        add: function (elem, type, listener, useCapture) {
            if (elem.addEventListener) {
                elem.addEventListener(type, listener, useCapture);
            } else if (elem.attachEvent) {
                elem.attachEvent("on" + type, listener);
            }
        },

        remove: function (elem, type, listener, useCapture) {
            if (elem.removeEventListener) {
                elem.removeEventListener(type, listener, useCapture);
            } else if (elem.dettachEvent) {
                elem.detachEvent("on" + type, listener);
            }
        }
    };

    function loadJS() {
        var scripts = [{ "src": "//platform.twitter.com/widgets.js", "id": "twitter-wjs", "aftertreatment": "twitter" },
                       { "src": "//connect.facebook.net/ja_JP/all.js#xfbml=1&appId=[Set your appId]", "id": "facebook-jssdk", "pretreatment": "facebook" },
                       { "src": "https://apis.google.com/js/plusone.js", "pretreatment": "google" },
                       { "src": "http://b.st-hatena.com/js/bookmark_button.js" },
                       { "src": "http://static.evernote.com/noteit.js" }
                      ],
            i,
            nScript = scripts.length,
            fScript = document.getElementsByTagName("script")[0],
            script,
            text;

        if (!loadFlg) {
            loadFlg = true;
        } else {
            return;
        }

        for (i = 0; i < nScript; i += 1) {
            if (scripts[i].pretreatment) {
                pretreatmentFunc[scripts[i].pretreatment].call();
            }

            script = document.createElement("script");
            script.async = true;
            script.src = scripts[i].src;
            if (scripts[i].id) {
                script.id = scripts[i].id;
            }
            fScript.parentNode.insertBefore(script, fScript);

            if (scripts[i].aftertreatment) {
                aftertreatmentFunc[scripts[i].aftertreatment].call();
            }
        }

        event.remove(window, "scroll", dispSocial);
    }

    function dispSocial() {
        var pos = (document.documentElement.scrollTop || document.body.scrollTop) +
                  (window.innerHeight || document.documentElement.clientHeight),
            box = document.getElementById("socialbox"),
            boxpos = box.offsetTop,
            dispFlg = false;

        if (pos >= (boxpos - 100)) {
            loadJS();
            dispFlg = true;
        }

        return dispFlg;
    }

    function dispSocialHandler() {
        if (!dispSocial()) {
            event.add(window, "scroll", dispSocial, false);
        }
    }

    qsaSupport = typeof document.querySelectorAll;
    if (window.opera && navigator.userAgent.indexOf("Opera M") > -1) {
        loadJS();
    } else if (qsaSupport !== "undefined") {
        event.add(window, "load", dispSocialHandler, false);
    }
}(window, document));
