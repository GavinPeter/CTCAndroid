cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "com.ctc.urlgetplugin.urlgetplugin",
    "file": "plugins/com.ctc.urlgetplugin/www/UrlgetPlugin.js",
    "pluginId": "com.ctc.urlgetplugin",
    "clobbers": [
      "UrlgetPlugin"
    ]
  },
  {
    "id": "com.dvdbrink.cordova.indexeddb.indexeddb",
    "file": "plugins/com.dvdbrink.cordova.indexeddb/www/IndexedDBShim.js",
    "pluginId": "com.dvdbrink.cordova.indexeddb",
    "runs": true
  },
  {
    "id": "cordova-plugin-dialogs.notification",
    "file": "plugins/cordova-plugin-dialogs/www/notification.js",
    "pluginId": "cordova-plugin-dialogs",
    "merges": [
      "navigator.notification"
    ]
  },
  {
    "id": "cordova-plugin-dialogs.notification_android",
    "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
    "pluginId": "cordova-plugin-dialogs",
    "merges": [
      "navigator.notification"
    ]
  },
  {
    "id": "cordova-plugin-x-socialsharing.SocialSharing",
    "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
    "pluginId": "cordova-plugin-x-socialsharing",
    "clobbers": [
      "window.plugins.socialsharing"
    ]
  },
  {
    "id": "cordova-plugin-inappbrowser.inappbrowser",
    "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
    "pluginId": "cordova-plugin-inappbrowser",
    "clobbers": [
      "cordova.InAppBrowser.open",
      "window.open"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "com.ctc.urlgetplugin": "0.2.11",
  "com.dvdbrink.cordova.indexeddb": "0.1.0",
  "cordova-plugin-dialogs": "1.0.1-dev",
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-x-socialsharing": "5.0.9",
  "cordova-plugin-inappbrowser": "2.0.2"
};
// BOTTOM OF METADATA
});