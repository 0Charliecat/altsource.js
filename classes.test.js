const AltSource = require('./index')

console.log(`Required AltSource`, AltSource)

let alt = new AltSource({
    name: "AltSource.js Test",
    identifier: "space.charliecat.altsource.test",
    website: "https://github.com/0Charliecat/altsource.js#readme",
    subtitle: "Altsource.js Test Source",
    description: "beeb boop",
    publisher: "0CharlieCat"
})
console.log('alt:', alt)

alt.addApp({
    name: 'Test App',
    bundleIdentifier: "space.charliecat.altsource.testapp",
    version: "1.0",
    versionDate: new Date(),
    versionDescription: "Test app version 1.0",
    downloadURL: "https://example.com/myapp_v1.1.ipa",
    size: "100"
})
console.log('alt: after adding the app:', alt)

alt.addNewsItem({
    title: "Hello from AltSource.js",
    url: "http://localhost"
})
console.log('alt: after adding news:', alt)