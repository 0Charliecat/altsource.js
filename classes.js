/*const AltSourceConstructorConfig = {
    name: String,
    identifier: String,
    "subtitle?": String,
    "description?": String,
    "website?": String || URL,
    "iconURL?": String || URL,
    "publisher?": String,
    "headerURL?": String || URL,
    "featuredApps?": [App||String],
    "sourceURL?": String || URL,
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
/*
new known perms from https://wiki.sidestore.io/references/sources.html • TODO @0Charliecat Add
photos
camera
location
contacts
reminders
music
microphone
speech-recognition
background-audio
background-fetch
bluetooth
network
calendars
faceid
siri
motion
* /

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
  }*/

class AltSource {
    /**
     * `new <AltSource>(Config)`
     * @param {{ name: String, identifier: String, subtitle: String?, description: String?, website: String | URL | null, apps: App[]?, news: NewsChild[]?, userdata: Any? }} config
     * @returns {AltSource}
     * 
     * Refer to the official Documentation: https://faq.altstore.io/sources/make-a-source#source
     */
    constructor(config) {
        this.name = String(config.name)
        this.identifier = String(config.identifier)
        this.subtitle = config.subtitle || null
        this.description = config.description || null
        this.website = (Boolean(config.website)) ? String(config.website) : null
        this.iconURL = (Boolean(config.iconURL)) ? String(config.iconURL) : null
        this.headerURL = (Boolean(config.headerURL)) ? String(config.headerURL) : null

        this.apps = [...(Array.isArray(config.apps) ? config.apps.filter(e=>e.constructor.name==="App") : [])]
        this.news = [...(Array.isArray(config.news) ? config.news.filter(e=>e.constructor.name==="NewsItem") : [])]
        this.userdata = (Boolean(config.userdata)) ? String(config.userdata) : null
        this.sourceURL = (Boolean(config.sourceURL)) ? String(config.sourceURL) : null

        if (config.hasOwnProperty("featuredApps")) {
            this.featuredApps = [...(Array.isArray(config.featuredApps) ? config.featuredApps.map(String) : [])]
            config.featuredApps.filter(e=>e.constructor.name==="App").forEach(e=>this.apps.push(e))
        }

        this.publisher = (Boolean(config.publisher)) ? String(config.publisher) : null
    }

    toJSON() {
        return cleanObject({...this})
    }

    /**
     * `<AltSource>.addNewsItem( newsItem )`
     * @param {NewsItem|{ title: String, identifier: String?, caption: String, date: Date?, tintColor: String?, imageURL: String|URL|undefined, notify: Boolean?, url: String|URL|undefined, appID: String|App|undefined, }} newsItem
     * @returns {void}
     */
    addNewsItem(newsItem) {
        let newsi = new NewsItem(newsItem)
        this.news.unshift(newsi)
    }

    /**
     * `<AltSource>.addApp( App )`
     * @param {App|{ name: String, bundleIdentifier: String, beta: Boolean?, developerName: String?, versions: AppVersion[]?, version: String,? versionDate: Date?, versionDescription: String?, downloadURL: String | URL | null, localizedDescription: String, iconURL: String | URL, tintColor: String | Color | null, size: Number, screenshotURLs: String[] | URL[] | null, permissions: AppPermissions[]?}} app
     * @returns {void}
     */
    addApp(app) {
        let appinfo = new App(app, this)
        this.apps.push(appinfo)
    }

    /**
     * `<AltSource>.setSourceURL( URL )`
     * @param {String|URL} url
     * @returns {void}
     */
    setSourceURL(url) {
        this.sourceURL = String(url)
    }

    /**
     * `<AltSource>.listApps()`
     * @returns {App[]}
     */
    listApps() {
        return this.apps
    }

    /**
     * `<AltSource>.getApp( query )`
     * @param {String} q App Name or Bundle ID
     * @returns {App[]|void[]}
     */
    getApp(q) {
        q = String(q)
        let byName = this.apps.find(e=>e.name === q)
        let byBundle = this.apps.find(e=>e.bundle === q)

        return [(Boolean(byName))?byName:null, (Boolean(byBundle))?byBundle:null].filter(e=>e!==null)
    }
}

class App {
    /**
     * `App`
     * @param {{ name: String, bundleIdentifier: String, beta: Boolean?, developerName: String?, versions: AppVersion[]?, version: String,? versionDate: Date?, versionDescription: String?, downloadURL: String | URL | null, localizedDescription: String, iconURL: String | URL, tintColor: String | Color | null, size: Number, screenshotURLs: String[] | URL[] | null, permissions: AppPermissions[]?}} e
     * @param {AltSource?} altsource
     * @returns {App}
     * 
     * **WARNING:** if `versions` exists but `version` and other dependent values don't, they are automatically created based on `versions[0]`, if otherwise `versions` doesn't exist then based on `version` and other dependent values `versions[0]` is created
     * 
     * Refer to the official Documentation: https://faq.altstore.io/sources/make-a-source#apps
     * 
     * Refer to the official Documentation: https://faq.altstore.io/sources/updating-apps
     * 
     * `<App>.permissions` {AppPermissions[]} • Observed Property from `apps.altstore.io`, this property might break your source or might behave in unexpected way, shows Permissions like this ![AltStore Permisions](https://imgur.com/ES3FL3X.png)
     * 
     * `<App>.beta` {Boolean} • Observed Property from `apps.altstore.io`, this property might break your source or might behave in unexpected way, shows Beta Flag ![Beta flag on AltStore App as an Example](https://imgur.com/OWqsycF.png) 
     *  
     * Citation of SideStore Documentation for creating sources:
     * 
     * > Currently, this is also tied in with the Patreon app locking system used with AltStore/Delta betas. But it is not recommended to attempt to use it for this purpose since it will ultimately be changing in the future.
     */
    constructor(e, altsource) {
        /*let example = {
            name: String,
            bundleIdentifier: String,
            "beta?": Boolean,
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
              AppPermission
            ]
        }*/

        this.name = String(e.name)
        this.bundleIdentifier = String(e.bundleIdentifier)

        this.developerName = (!Boolean(e.developerName)) ? 
            (altsource!==undefined) ? 
                (altsource.hasOwnProperty('publisher')) ? 
                    String(altsource.publisher) 
                    : "null" 
                : "null" 
            : String(e.developerName);

        this.iconURL = String(e.iconURL)
        this.localizedDescription = String(e.localizedDescription)
        this.tintColor = (Boolean(e.tintColor)) ? String(e.tintColor) : null;
        this.screenshotURLs = (Array.isArray(e.screenshotURLs)) ? e.screenshotURLs.map(String) : (typeof(e.screenshotURLs) === 'string') ? e.screenshotURLs : null
        this.beta = Boolean(e.beta)

        this.permissions = (Array.isArray(e.permissions)) ? 
            e.permissions.map(new AppPermission) : 
            (typeof(e.permissions) === 'string' || typeof(e.permissions) === 'object') ? 
                new AppPermission(permissions) : 
                null;


            if (Array.isArray(e.versions) && !e.version && !e.versionDate && !e.versionDescription && !e.downloadURL) {
                // If `e` includes `versions` and doesnt include `version`, `versionDate`, `versionDescription`, and `downloadURL` then
                // Use the `verions[0]` and make these properties
                this.version            = e.versions[0].version
                this.versionDate        = e.versions[0].date
                this.versionDescription = e.versions[0].localizedDescription
                this.downloadURL        = e.versions[0].downloadURL
                this.size               = e.versions[0].size

            } else if (Array.isArray(e.versions) && e.version && e.versionDate && e.versionDescription && e.downloadURL && (e.version !== e.versions[0].version || e.versionDate !== e.versions[0].date || e.versionDescription !== e.versions[0].localizedDescription || e.downloadURL !== e.versions[0].downloadURL)) {
                // Else If `e` includes `versions` and includes `version`, `versionDate`, `versionDescription`, and `downloadURL` and they arent same as `versions[0]` then
                // make new `versions` object and push it to the front

                let ver = new AppVersion({
                    version: e.version,
                    date: e.versionDate,
                    localizedDescription: e.versionDescription,
                    downloadURL: e.downloadURL,
                    size: e.size,
                })
                this.versions.unshift(ver)

                this.version            = this.versions[0].version
                this.versionDate        = this.versions[0].date
                this.versionDescription = this.versions[0].localizedDescription
                this.downloadURL        = this.versions[0].downloadURL
                this.size               = this.versions[0].size

                
            } else if (!Array.isArray(e.versions) && e.version && e.versionDate && e.versionDescription && e.downloadURL) {
                // Else If `e` doesnt include `versions` but includes `version`, `versionDate`, `versionDescription`, and `downloadURL` then
                // make new `versions` object and push it to the front

                this.versions = [new AppVersion({
                    version: e.version,
                    date: e.versionDate,
                    localizedDescription: e.versionDescription,
                    downloadURL: e.downloadURL,
                    size: e.size,
                })]

                this.version            = this.versions[0].version
                this.versionDate        = this.versions[0].date
                this.versionDescription = this.versions[0].localizedDescription
                this.downloadURL        = this.versions[0].downloadURL
                this.size               = this.versions[0].size
            } else if (Array.isArray(e.versions) && e.version && e.versionDate && e.versionDescription && e.downloadURL && (e.version === e.versions[0].version && e.versionDate === e.versions[0].date && e.versionDescription === e.versions[0].localizedDescription && e.downloadURL === e.versions[0].downloadURL)) {
                // Else If `e` includes `versions` and includes `version`, `versionDate`, `versionDescription`, and `downloadURL` and they are same as `versions[0]` then
                // do nothing
                this.version            = e.versions[0].version
                this.versionDate        = e.versions[0].date
                this.versionDescription = e.versions[0].localizedDescription
                this.downloadURL        = e.versions[0].downloadURL
                this.size               = e.versions[0].size
                this.versions           = e.versions.map(AppVersion)
            } else {
                // Else 
                // just throw an error
                throw new Error('No version configuration is valid')
            }
            


    }

    /**
     * `<App>.newVersion( e )` • Adds new Version of the app to the Source
     * @param {AppVersion|{ "version": String, "date": Date, "localizedDescription": String, "downloadURL": String | URL, "size": Number }} e
     * @returns {void}
     */
    newVersion(e) {
        let ver = new AppVersion(e)
        this.versions.unshift(ver)
        this.version            = e.version
        this.versionDate        = e.date
        this.versionDescription = e.localizedDescription
        this.downloadURL        = e.downloadURL
        this.size               = e.size
    }

    addPermission(permission) {
        let perm = new AppPermission(permission)
        this.permissions = (Array.isArray(this.permissions)) ? this.permissions.push(perm) : [perm]
    }

    /**
     * `<App>.getLatestVersion()`
     * @returns {String}
     */
    getLatestVersion() {
        return this.versions[0].toString()
    }

    /**
     * `<App>.getAppPermissions()`
     * @returns {String[]?}
     */
    getAppPermissions() {
        return (this.hasOwnProperty('appPermissions')) ? this.appPermissions.map(String) : null;
    }

    /**
     * `<App>.isBeta()`
     * @returns {Boolean?}
     */
    isBeta() {
        return (this.hasOwnProperty('isBeta')) ? this.isBeta : null;
    }

    toJSON() {
        return cleanObject({...this})
    }

    /**
     * `<App>.toString()`
     * @returns {String} "App Name (Bundle ID i.e. com.example.app)"
     */
    toString() {
        return `${this.name} (${this.bundleIdentifier})`
    }

    /**
     * `<App>.toggleBeta()`
     * @returns {any}
     */
    toggleBeta() {
        return this.beta = !this.beta
    }
}

class AppVersion {
    /**
     * `AppVersion`
     * @param {{ "version": String, "date": Date, "localizedDescription": String, "downloadURL": String | URL, "size": Number }} e
     * @returns {any}
     * 
     * Refer to the official Documentation: https://faq.altstore.io/sources/make-a-source#app-versions
     * 
     * `<AppVersion>.date?` as input for constructor please use any JS Date compatible Date. Automatically converts it to `ISO 8601` format, if is of `null` or `undefined` time of call of the constructor will be used
     */
    constructor(e) {
        this.version = String(e.version)
        this.date = (Boolean(e.date)) ? new Date(e.date) : new Date()
        this.localizedDescription = e.localizedDescription
        this.downloadURL = String(e.downloadURL)
        this.size = Number(e.size)
    }

    toJSON() {
        return {
            "version": this.version,
            "date": this.date.toISOString(),
            "localizedDescription": this.localizedDescription,
            "downloadURL": this.downloadURL,
            "size": this.size
        }
    }

    toString() {
        return String(this.version)
    }
}

class AppPermission {
    /**
     * `AppPermissions`
     * @param {String|Any|AppPermissions} e `permission.type`, type of the permissions
     * @param {String} reason `permission.usageDescription`
     * @returns {AppPermissions} self
     * 
     * if `Object` or `AppPermisiions` is passes via `e` it's used as the permission property
     * 
     * **MIGHT BREAK YOUR SOURCE, USE AT YOUR OWN RISK**
     * 
     * **UNDOCUMENTED FEATURE**
     * 
     * Observed property • for more permissions found please make an issue on https://github.com/0Charliecat/altsource.js/issues
     */
    constructor(e, reason) {

        if (typeof(e) === "object") {
            if (e.hasOwnProperty("usageDescription") && e.hasOwnProperty('type')) {
                this.me = e
            }
        } else {
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
        }

        

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
     * 
     * Refer to the official Documentation: https://github.com/0Charliecat/altsource.js/issues
     */
    constructor(e) {
        this.title = e.title
        this.identifier = e.identifier || makeid()
        this.caption = e.caption
        this.date = (e.date!== undefined) ? (new Date(e.date)).toISOString() : (new Date()).toISOString()
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

module.exports = { AltSource, App, AppVersion, AppPermission, NewsItem }

/**
 * `cleanObject(obj)`
 * @param {any} obj with properties which values could be `null` or `undefined`
 * @returns {any} Object that is clean of these properties
 */
function cleanObject(obj) {
    Object.entries(obj).forEach(([key, value]) => {
        if (value === null || value === undefined) {
            delete obj[key];
        } else if (typeof value === "object") {
            if (Object.keys(module.exports).includes(obj.constructor.name)) { // Checks if OBJ's constructor isn't one of exported classes
                console.dir(obj[key]);
                obj[key] = cleanObject(obj[key].toJSON())
            } else if (Array.isArray(obj[key])) {
                if (Object.keys(module.exports).includes(obj.constructor.name)) { // Checks if OBJ's constructor isn't one of exported classes
                    console.dir(obj[key]);
                    obj[key].map(e=>cleanObject(e.toJSON()))
                } else {
                }
            } else {
                cleanObject(value);
            }
        }
    });
    return obj;
}

function makeid(length = 6) {
    return Math.random().toString(36).substring(2, length+2);
};
