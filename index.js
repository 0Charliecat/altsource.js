const AltSourceConstructorConfig = {
    name: String,
    identifier: String,
    "subtitle?": String,
    "description?": String,
    "website?": String || URL,
    "iconURL?": String || URL,
    "publisher?": String,
    "headerURL?": String || URL,
    "featuredApps?": [App||String],
    apps: [App],
    news: [NewsChild],
    userdata: {}
}

const AppConstructorE = {
    name: String,
    bundleIdentifier: String,
    "developerName?": String,
    "versions?": [
        AppVersion
    ],
    "version": String,
    "versionDate": Date,
    "versionDescription": String,
    "downloadURL": String || URL,
    "localizedDescription": String,
    "iconURL": String || URL,
    "tintColor": String || Color,
    "size": Number,
    "screenshotURLs": [
        String || URL
    ],
    "permissions?": [
      AppPermissions
    ]
}

const AppVersionConstructorE = {
    "version": String,
    "date": Date,
    "localizedDescription": String,
    "downloadURL": String || URL,
    "size": Number
}

const AppPermissionsConstructorE = "background-audio"||"background-fetch" // Only known Perms

const NewsItemConstructorE = {
    "title": String,
    "identifier?": String,
    "caption": String,
    "date": Date,
    "tintColor?": String||Color,
    "imageURL?": String || URL,
    "notify?": Boolean,
    "url?": String || URL,
    "appID?": String||App
  }

class AltSource {
    /**
     * `new <AltSource>(Config)`
     * @param {{ name: String, identifier: String, subtitle?: String, description?: String, website?: String | URL, apps?: App[], news?: NewsChild[], userdata?: {} }} config
     * @returns {AltSource}
     */
    constructor(config) {
        
    }

    toJSON() {

    }

    export() {

    }
}

class App {

}

class AppVersion {

}

class AppPermissions {
    /**
     * `AppPermissions`
     * @param {String} e `permission.type`, type of the permissions
     * @param {String} reason `permission.usageDescription`
     * @returns {AppPermissions}
     */
    constructor(e, reason) {
        let perms = {
            "background-audio": {
                "type": "background-audio",
                "usageDescription": reason
            },
            "background-fetch": {
                "type": "background-audio",
                "usageDescription": reason
            },
        }

        this.me = (perms.hasOwnProperty(e)) ? perms[e] : null;

        return this.me
    }

    /**
     * `<AppPermissions>.toJSON()`
     * @returns {{"type": String,"usageDescription": String}}
     */
    toJSON() {
        return this.me
    }

    /**
     * `<AppPermissions>.toJSON()`
     * @returns {String} return the `permission.type` of the permission
     */
    toString() {
        return this.me.type
    }
}

class NewsItem {
    /**
     * `NewsItem`
     * @param {{ title: String, identifier: String?, caption: String, date: Date?, tintColor: String?, imageURL: String|URL|undefined, notify: Boolean?, url: String|URL|undefined, appID: String|App|undefined, }} e
     * @returns {NewsItem}
     */
    constructor(e) {
        this.title = e.title
        this.identifier = e.identifier || makeid()
        this.caption = e.caption
        this.date = (new Date(e.date) || new Date()).toISOString()
        this.tintColor = e.tintColor || null
        this.imageURL = (e.imageURL !== undefined) ? String(e.imageURL) : null
        this.notify = Boolean(e.notify)
        this.url = (e.url !== undefined) ? String(e.url) : null
        this.appID = (e.appID !== undefined) ? String(e.appID) : null
    }

    toJSON() {
        let me = {...this}
        return cleanObject(me)
    }
}

function cleanObject(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        delete obj[key];
      } else if (typeof value === "object") {
        cleanObject(value);
      }
    });
    return obj;
}

