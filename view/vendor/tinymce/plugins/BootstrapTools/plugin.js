/*!
 * Add-on for including N1ED into your TinyMCE 5
 * Developer: N1ED
 * Website: https://n1ed.com/
 * License: GPL v3
 */


//
//   HOW TO INSTALL THIS ADD-ON
//
//   1. Copy the plugin as "tinymce/plugins/BootstrapTools/plugin.js"
//   2. Add "BootstrapTools" into "plugins" config option
//   3. Done!
//
//
//   VISUAL CONFIGURATION
//
//   If you want to configure all N1ED add-ons visually,
//   just go into your dashboard at:
//
//       https://n1ed.com/dashboard
//
//   Once configured N1ED using Dashboard please set your personal API key to use it:
//
//      apiKey: "APIKEY12"
//

var apiKey = tinymce.settings.apiKey;
var version = tinymce.settings.version;
var n1edPrefix = tinymce.settings.n1edPrefix;
var n1edHttps = tinymce.settings.n1edHttps;
var n1edPrefixApp = tinymce.settings.n1edPrefixApp;
var n1edHttpsApp = tinymce.settings.n1edHttpsApp;
var urlCache = tinymce.settings.urlCache;

// Cookies may contain data for development purposes (which version to load, from where, etc.).
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2)
        return parts.pop().split(';').shift();
    else
        return null;
}


apiKey = getCookie("N1ED_APIKEY") || apiKey || "PLGNBOTO";
n1edHttps = !(getCookie("N1ED_HTTPS") === "false" || n1edHttps === false);
n1edPrefix = getCookie("N1ED_PREFIX") || n1edPrefix || null;
n1edHttpsApp = !(getCookie("N1ED_HTTPS_APP") === "false" || n1edHttpsApp === false);
n1edPrefixApp = getCookie("N1ED_PREFIX_APP") || n1edPrefixApp || null;
protocol = n1edHttps ? "https" : "http";
host = (n1edPrefix ? (n1edPrefix + ".") : "") + "cloud.n1ed.com";
version = getCookie("N1ED_VERSION") || version || "latest";

if (!urlCache) {
    window.N1ED_PREFIX = n1edPrefix;
    window.N1ED_HTTPS = n1edHttps;
}
window.N1ED_PREFIX_APP = n1edPrefixApp;
window.N1ED_HTTPS_APP = n1edHttpsApp;

var urlPlugin = (
    urlCache ? (urlCache + apiKey + "/" + version) : (protocol + "://" + host + "/cdn/" + apiKey + "/" + version)
) + "/tinymce/plugins/N1EDEco/plugin.js";

// Load Ecosystem plugin manually due to
// TinyMCE will not accept external_plugins option on the fly
tinymce.PluginManager.load('N1EDEco',  urlPlugin);

tinymce.PluginManager.add(
    "BootstrapTools",
    function() {},
    ["N1EDEco"] // We can not move N1EDEco in this file due to we need to dynamically
                // embed configuration from your Dashboard into it.
                // So N1EDEco add-on can be loaded only from CDN
);