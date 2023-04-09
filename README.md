# altsource.js
Build AltStore Source with JS 


🚧 this is WIP thing 🚧

---
**TODO: Make better Documentation**
---
### Class: AltSource

`new AltSource(Config)`

- config: Object - The configuration object for this instance of AltSource
  - name: String - The name of the source
  - identifier: String - The identifier of the source 
  - subtitle?: String - The subtitle of the source (optional)
  - description?: String - The description of the source (optional)
  - website: String | URL | null - The website of the source (optional)
  - apps?: App[] - An array of App objects associated with this source (optional)
  - news?: NewsChild[] - An array of NewsChild objects associated with this source (optional)
  - userdata?: Any - User-defined data associated with this source (optional)


- Returns: AltSource

- Refer to the official Documentation: https://faq.altstore.io/sources/make-a-source#source

`AltSource.toJSON()`
Returns a JSON representation of this AltSource instance.


## Class: App

` App`

- e: Object - The configuration object for this instance of App
  - name: String - The name of the app
  - bundleIdentifier: String - The bundle identifier of the app
  - beta?: Boolean - Whether the app is in beta (optional)
  - developerName?: String - The name of the app's developer (optional)
  - versions?: AppVersion[] - An array of AppVersion objects associated with this app (optional)
  - version: String - The version of the app
  - versionDate?: Date - The date of the app version (optional)
  - versionDescription?: String - A description of the app version (optional)
  - downloadURL: String | URL | null - The download URL of the app (optional)
  - localizedDescription: String - The localized description of the app
  - iconURL: String | URL - The URL of the app's icon
  - tintColor: String | Color | null - The tint color of the app (optional)
  - size: Number - The size of the app
  - screenshotURLs: String[] | URL[] | null - An array of screenshot URLs (optional)
  - permissions?: AppPermissions[] - An array of AppPermissions objects associated with this app (optional)
- altsource?: AltSource - The AltSource instance associated with this app (optional), used for `developerName` is isn't defined

Returns: `App`

**WARNING**: if versions exists but version and other dependent values don't, they are automatically created based on versions[0], if otherwise versions doesn't exist then based on version and other dependent values versions[0] is created

Refer to the official Documentation: https://faq.altstore.io/sources/make-a-source#apps

Refer to the official Documentation: https://faq.altstore.io/sources/updating-apps

`<App>.permissions` {AppPermissions[]} • Observed Property from apps.altstore.io, this property might break your source or