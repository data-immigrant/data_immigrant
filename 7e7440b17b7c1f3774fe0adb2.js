/* eslint-disable */
(function () {
    /* eslint-disable */
    if (!window.$mcSite) {
        $mcSite = {
            optinFeatures: [],
            enableOptIn: function () {
                this.createCookie("mc_user_optin", true, 365);
                this.optinFeatures.forEach(function (fn) {
                    fn();
                });
            },

            runIfOptedIn: function (fn) {
                if (this.hasOptedIn()) {
                    fn();
                } else {
                    this.optinFeatures.push(fn);
                }
            },

            hasOptedIn: function () {
                var cookieValue = this.readCookie("mc_user_optin");

                if (cookieValue === undefined) {
                    return true;
                }

                return cookieValue === "true";
            },

            createCookie: function (name, value, expirationDays) {
                var cookie_value = encodeURIComponent(value) + ";";
                
                if (expirationDays === undefined) {
                    throw new Error("expirationDays is not defined");
                }

                // set expiration
                if (expirationDays !== null) {
                    var expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + expirationDays);
                    cookie_value += " expires=" + expirationDate.toUTCString() + ";";
                }
    
                cookie_value += "path=/";
                document.cookie = name + "=" + cookie_value;
            },

            readCookie: function (name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(";");
    
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
    
                    while (c.charAt(0) === " ") {
                        c = c.substring(1, c.length);
                    }
    
                    if (c.indexOf(nameEQ) === 0) {
                        return c.substring(nameEQ.length, c.length);
                    }
                }
    
                return undefined;
            }
        };
    }

    $mcSite.facebookPixel={settings:{pixelId:"https:\/\/mphomathabathe.setmore.com\/data-immigrant",enabled:"1",pixelIds:"[\"https:\\\/\\\/mphomathabathe.setmore.com\\\/data-immigrant\"]",lduEnabled:""}};$mcSite.google_analytics={settings:{enabled:"",tracking_id:""}};$mcSite.adwords_remarketing={settings:{google_allow_ad_personalization_signals:"true"}};
})();
/* eslint-disable */
(function () {

    var doNotTrackEnabled = navigator.doNotTrack === "1"
        || navigator.msDoNotTrack === "1"
        || window.doNotTrack === "1"
        || navigator.doNotTrack === "yes";

    if (doNotTrackEnabled) {
        return;
    }

    if (window.$mcSite === undefined || window.$mcSite.facebookPixel === undefined) {
        return;
    }

    if (!window.$mcSite.facebookPixel.settings || !!$mcSite.facebookPixel.installed || !window.$mcSite.facebookPixel.settings.enabled) {
        return;
    }

    window.$mcSite.runIfOptedIn(function () {
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','//connect.facebook.net/en_US/fbevents.js');

        var pixelIds = JSON.parse($mcSite.facebookPixel.settings.pixelIds || "[]");
        if (pixelIds.length) {
            if ($mcSite.facebookPixel.settings.lduEnabled) {
                fbq('dataProcessingOptions', ['LDU'], 0, 0);
            }
            pixelIds.forEach(function (id) {
                fbq('init', id);
            });

            fbq('track', 'PageView');
        }

        $mcSite.facebookPixel.installed = true;
    });

})();
/* eslint-disable */
(function () {
    var doNotTrackEnabled = navigator.doNotTrack === "1"
        || navigator.msDoNotTrack === "1"
        || window.doNotTrack === "1"
        || navigator.doNotTrack === "yes";
    if (doNotTrackEnabled) {
        return;
    }

    if (window.$mcSite === undefined || window.$mcSite.google_analytics === undefined) {
        return;
    }

    var module = window.$mcSite.google_analytics;
    var moduleNotInstallable = module.installed === true
        || module.settings === undefined
        || module.settings.enabled !== "1"
        || !module.settings.tracking_id;
    if (moduleNotInstallable) {
        return;
    }

    window.$mcSite.runIfOptedIn(function () {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', module.settings.tracking_id, 'auto');
        ga('send', 'pageview');
        module.installed = true;
    });
}());
/* eslint-disable */
(function () {
    if (window.$mcSite === undefined || window.$mcSite.adwords_remarketing === undefined) {
        return;
    }

    var module = window.$mcSite.adwords_remarketing;

    if(module.installed === true) {
        return;
    }

    if (!module.settings) {
        return;
    }

    var settings = module.settings;

    if(!settings.google_conversion_id) {
        return;
    }

    if(!settings.google_remarketing_only) {
        return;
    }

    window.$mcSite.runIfOptedIn(function () {
        var script = document.createElement("script");
        script.src = "//www.googleadservices.com/pagead/conversion_async.js";
        script.type = "text/javascript";
        script.onload = function () {
            var allow_personalization_settings = settings.google_allow_ad_personalization_signals;
            if (allow_personalization_settings === undefined) {
                allow_personalization_settings = "true";
            }

            window.google_trackConversion({
                google_conversion_id: settings.google_conversion_id,
                google_remarketing_only: settings.google_remarketing_only,
                google_allow_ad_personalization_signals: allow_personalization_settings
            });
        };

        document.body.appendChild(script);

        window.$mcSite.adwords_remarketing.installed = true;
    });
})();
