# `altsource.js` 🚧

Manipulate and Create AltStore Sources in NodeJS

🚧 a WIP Dependency 🚧

## Install

```bash
npm install altsource
```

---

## Example

```javascript
const AltSource = require('altsource')

const source = new AltSource({
    name: "AltSource.js Test",
    identifier: "space.charliecat.altsource.test",
    website: "https://github.com/0Charliecat/altsource.js#readme",
    subtitle: "Altsource.js Test Source",
    description: "beeb boop",
    publisher: "0CharlieCat",
})

source.addApp({
    name: "test App",
    bundle: "space.charliecat.test.altsource.app",
    version: "0",
    versionDate: new Date(),
    versionDescription: "Test app version 1.0",
    downloadURL: "https://example.com/myapp_v1.1.ipa",
    size: "100"
})

console.log(JSON.stringify(source, null, 4))
```

### Example in Express.js

```javascript
const express = require('express')
const app = express()

const AltSource = require('altsource')

app.use(AltSource.middleware({
    name: "AltSource.js Test",
    identifier: "space.charliecat.altsource.test",
    website: "https://github.com/0Charliecat/altsource.js#readme",
    subtitle: "Altsource.js Test Source",
    description: "beeb boop",
    publisher: "0CharlieCat",
}))

app.get('/addApp', (req, res) => {
	req.AltSource.addApp({
    	name: "test App",
    	bundle: "space.charliecat.test.altsource.app",
    	version: "0",
    	versionDate: new Date(),
    	versionDescription: "Test app version 1.0",
    	downloadURL: "https://example.com/myapp_v1.1.ipa",
    	size: "100"
	})
	res.json(req.AltSource.toJSON())
})

app.listen(3000)
```

---

## Documentation

+ ### class `AltSource`
   + constructor(config) `new AltSource(config)`
      - param `config` `Object`
         - `name` : `String` The name of your source as it will appear in AltStore.
         - `identifier`: `String` unique and reverse-DNS format
         - `subtitle`: `String` (optional) A short, one-sentence description of your source. This will appear underneath the source's name on its About page.
         - `description`: `String` (optional) A full-length description of your source. This can include any information you believe is relevant for your source, such as information about your apps or additional links.
         - `iconURL`: `String` || Class that has .toString() (optional) A link to an image that will be used to visually identify your source. It will appear as a circle.
         - `headerURL`:  `String` || Class that has .toString() (optional) A link to an image that will be displayed as the header of your source's About page. The image will be blurred by default, but can be viewed by swiping the source's info banner.
         - `website`:  `String` || Class that has .toString() (optional) A link to the primary website for your source. It will be displayed underneath your source's name on its About page.
         - `tintColor` :  `String` || Class that has .toString() (optional) tint color of the source
         - `featuredApps`: `App[]`||`String[]` (optional) if Array element is `App` then it's automaticly added to the `apps` property
         - `apps`: `App[]` optional, Apps can be added later on via `<Altsource>.addApp(App)`
         - `news`: NewsItem`[]` optional, News Items can be added later on via `<Altsource>.addNewsItem(News)`
         - `producer`: `String` (optional) default `<App>.developerName`
      - returns `AltSource`
   + `.toJSON()` - JSONifies Source and Returns is
      - returns `Any`
   + `.addNewsItem(newsItem`
      - param `newsItem` `NewsItem`||`Object`
         - `title` `String` The title of your News item.
         - `identifier` `String` (optional) if isn't provided it's automaticly generated
         - `caption` `String` A short, one-sentence description of your News item.
         - `date` `Date`||`String` (optional) Any Date string supported by JS Date Class, automatically parsed to ISO 8601 format. If isn't provided it's set to `Date.now()`
         - `tintColor` :  `String` || Class that has .toString() (optional) tint color of the news item
         - `imageURL`: `String`||`URL`|| Class that has .toString() (optional) A link to the image you want featured with your News item.
         - `notify`: `Boolean` (optional) When `true`, AltStore will send a push notification about this News item when it next checks for updates in the background.
         - `url`: `String`||`URL`|| Class that has .toString() (optional) A link that AltStore should open when the News item is tapped. Links will be opened in an in-app web browser.
         - `appID` : `String`||`App` The bundle identifier of an associated app. This will make the app's info banner appear below the News item, which will open the app's Store page when tapped.
      - returns `void`
   + `.addApp(app)`
      - param `app` `Object`||`App`
         - `name` : `String` The name of your app as it will appear on its store page.
         - `bundleIdentifier`: `String` Your app's bundle identifier (`CFBundleIdentifier`). It is **case sensitive** and should match exactly what is in your `Info.plist`.
         - `developerName`: `String` (optional) The name of the developer or developers as it will appear on the store page. If isn't provided `<AltSource>.producer` is used
         - `subtitle`: `String` (optional) A short, one-sentence description of your app that will appear in the Browse tab of AltStore.
         - `localizedDescription`: `String` A full-length description of your app.
         - `iconURL`: `String` || Class that has .toString() (optional) A link to you app's icon image
         - `tintColor` :  `String` || Class that has .toString() (optional) tint color of the app
         - `screenshotURLs` : `String[]` || `URL[]` Links to screenshots/images of your app.
         - `versions`: `AppVersion[]` A list of all the published versions of your app. Newest to the front
         - `permisions`: `AppPermisions[]` (optional) Property found in `apps.altstore.io` source, use at your own risk, might break your source or behave in an unexpected way
      - returns `void`
   + `.setSourceURL(url)`
      - param `url` `String`||Class with .toString() - Property found in many other Sources
   + `.listApps()` - lists all the apps in the source
      - returns `App[]`
   + `.getApp(query)`
      - param `query`: `String` - App Name or Bundle ID
      - returns `App`||`null`
+ ### class `App`
   + constructor(config) `new App(e) || <AltSource>.addApp(e, altsource)`
      + param `app` `Object`||`App`
         - `name` : `String` The name of your app as it will appear on its store page.
         - `bundleIdentifier`: `String` Your app's bundle identifier (`CFBundleIdentifier`). It is **case sensitive** and should match exactly what is in your `Info.plist`.
         - `developerName`: `String` (optional) The name of the developer or developers as it will appear on the store page. If isn't provided `<AltSource>.producer` is used
         - `subtitle`: `String` (optional) A short, one-sentence description of your app that will appear in the Browse tab of AltStore.
         - `localizedDescription`: `String` A full-length description of your app.
         - `iconURL`: `String` || Class that has .toString() (optional) A link to you app's icon image
         - `tintColor` :  `String` || Class that has .toString() (optional) tint color of the app
         - `screenshotURLs` : `String[]` || `URL[]` Links to screenshots/images of your app.
         - `versions`: `AppVersion[]` A list of all the published versions of your app. Newest to the front
         - `permisions`: `AppPermisions[]` (optional) Property found in `apps.altstore.io` source, use at your own risk, might break your source or behave in an unexpected way
         - `beta`: `Boolean` (optional) Property found in `apps.altstore.io` source, use at your own risk, might break your source or behave in an unexpected way
      - param `altsource` `AltSource` (optional) - parent AltSource
   + `.newVersion( version )`  - Adds new version to the app and updates version related properties
      - param `version`: `Object`||`AppVersion`
         - `version`: `String` Your app's version number (`CFBundleShortVersionString)`. It is **case sensitive** and should match exactly what is in your `Info.plist`.
         - `date`: `String`||`Date` (optional) Any Date string supported by JS Date Class, automatically parsed to ISO 8601 format. If isn't provided it's set to `Date.now()`
         - `localizedDescription`: `String` (optional) A description of what's new in this version. You can use this to tell users about new features, bugs fixes, etc.
         - `downloadURL`: `String`||`URL` The URL where your `.ipa` is hosted.
      - returns `void`
   + `.newPermission(permission)`
      - `permission`: `String`||`AppPermission`
      - returns `void`
   + `.getLatestVersion()`
      - returns `String` latest version
   + `.getAppPermissions()`
      - returns `String[]`||`null`
   + `.isBeta()`
      - returns `Boolean`
   + `.toJSON()` - JSONifies App and Returns it
      - returns `Any`
   + `.toString()`
      - returns `String` `"App Name (Bundle ID i.e. com.example.app)"`
   + `.toggleBeta()`
      - returns `Boolean` the current value of `<App>.beta`
+ ### class `AppVersion`
   + constructor(version) `new AppVersion(version) || <App>.newVersion(version)`
      + param `version`: `Object`||`AppVersion`
         - `version`: `String` Your app's version number (`CFBundleShortVersionString)`. It is **case sensitive** and should match exactly what is in your `Info.plist`.
         - `date`: `String`||`Date` (optional) Any Date string supported by JS Date Class, automatically parsed to ISO 8601 format. If isn't provided it's set to `Date.now()`
         - `localizedDescription`: `String` (optional) A description of what's new in this version. You can use this to tell users about new features, bugs fixes, etc.
         - `downloadURL`: `String`||`URL` The URL where your `.ipa` is hosted.
      - returns `AppVersion`
   + `.toJSON()` - JSONifies AppVersion and Returns it
      - returns `Any`
   + `.toString()`
      - returns `String` version name
+ ### class `AppPermission`

   current known App Permisssions are:

   - `background-audio`
   - `background-fetch`

   if you find new ones please create an issue

   this is a feature that isn't officially documented, please procced with caution

   + constructor(permission) `new AppPermission(permission || <App>.newPermission(permission)`
      - param `permission`: `String`
      - returns `AppPermission`||`null` if the Permission isn't valid then it returns `null`
   + `.toJSON()` - JSONifies AppPermission and Returns it
      - returns `Any`
   + `.toString()`
      - returns `String` permission name
+ ### class `NewsItem`
   + constructor(newsItem) `new NewsItem(newsItem) || <AltSource>.addNewsItem(newsItem)`
      + param `newsItem` `NewsItem`||`Object`
         - `title` `String` The title of your News item.
         - `identifier` `String` (optional) if isn't provided it's automaticly generated
         - `caption` `String` A short, one-sentence description of your News item.
         - `date` `Date`||`String` (optional) Any Date string supported by JS Date Class, automatically parsed to ISO 8601 format. If isn't provided it's set to `Date.now()`
         - `tintColor` :  `String` || Class that has .toString() (optional) tint color of the news item
         - `imageURL`: `String`||`URL`|| Class that has .toString() (optional) A link to the image you want featured with your News item.
         - `notify`: `Boolean` (optional) When `true`, AltStore will send a push notification about this News item when it next checks for updates in the background.
         - `url`: `String`||`URL`|| Class that has .toString() (optional) A link that AltStore should open when the News item is tapped. Links will be opened in an in-app web browser.
         - `appID` : `String`||`App` The bundle identifier of an associated app. This will make the app's info banner appear below the News item, which will open the app's Store page when tapped.
      - returns `NewsItem`
   + `.toJSON()` - JSONifies NewsItem and Returns is
      - returns `Any`
+ ### Express Middleware

   `require('altsource').middleware(Configuration, ExtendedConfig)`

   Automatically adds AltSource to Express and publishes it on `ExtendedConfig.path` or `/altstore.json`

   - param `Configuration` `Object`||`AltSource`
      - same as `AltSource`
   - param `ExtendedConfig` `Object` (optional)
      - `path`: `String` (optional) defaults to `/altstore.json`
   - returns `MiddlewareFunction`

   MiddlewareFunction(Request, Response, Next)

      When called checks if the path is  `ExtendedConfig.path` or `/altstore.json`

         if not then drops AltSource to `Request.AltSource`

         if it is then responds with the AltSource

<!-- Original https://www.craft.do/s/C2xhECCxpGhlkY -->
