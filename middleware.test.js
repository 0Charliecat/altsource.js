const AltSource = require('./index')

/**
 * @param {Function} middleware
 * @param {any} reqArg
 * @returns {void}
 */
function AMidTester(middleware, reqArg) {
    let req = {...reqArg}
    let res = {
        json: (out) => {console.log(`res.json: called`, JSON.stringify(out))},
        end: (out) => {console.log(`res.end: called`, out)}
    }
    let next = () => {console.log(`next(): called`)}

    console.log("tester vars", req, res, next)

    console.log("Middleware:", middleware(req, res, next))
}

/*AMidTester(AltSource.middleware({
    name: "AltSource.js Test",
    identifier: "space.charliecat.altsource.test",
    website: "https://github.com/0Charliecat/altsource.js#readme",
    subtitle: "Altsource.js Test Source",
    description: "beeb boop",
    publisher: "0CharlieCat",
}, { path: "/altsource.json" }), {
    baseUrl: "/alt.json",
    path: ""
})*/

const alt = new AltSource({
    name: "AltSource.js Test",
    identifier: "space.charliecat.altsource.test",
    website: "https://github.com/0Charliecat/altsource.js#readme",
    subtitle: "Altsource.js Test Source",
    description: "beeb boop",
    publisher: "0CharlieCat",
    
}, { path: "/altsource.json" })

AMidTester(AltSource.middleware(alt), {
    baseUrl: "/altstore.json",
    path: ""
})

alt.addApp({
    name: "test App",
    bundle: "space.charliecat.test.altsource.app",
    version: "0",
    versionDate: new Date(),
    versionDescription: "Test app version 1.0",
    downloadURL: "https://example.com/myapp_v1.1.ipa",
    size: "100"
})

AMidTester(AltSource.middleware(alt), {
    baseUrl: "/altstore.json",
    path: ""
})