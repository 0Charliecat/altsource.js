const AltSource = require('./index')

function AMidTester(middleware, reqArg) {
    let req = {...reqArg}
    let res = {
        json: (out) => {console.log(`res.json: called`, out)},
        end: (out) => {console.log(`res.end: called`, out)}
    }
    let next = () => {console.log(`next(): called`)}

    console.log("tester passes", req, res, next)

    console.log("Middleware:", middleware(req, res, next))
}

AMidTester(AltSource.middleware({
    name: "AltSource.js Test",
    identifier: "space.charliecat.altsource.test",
    website: "https://github.com/0Charliecat/altsource.js#readme",
    subtitle: "Altsource.js Test Source",
    description: "beeb boop",
    publisher: "0CharlieCat",
    path: "/alt.json"
}), {
    baseUrl: "/alt.json",
    path: ""
})