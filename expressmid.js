const {AltSource} = require('./classes')
/**
 * Express Middleware for AltSource
 * @param {{}|AltSource} Conf
 * @param {{path: String?}} Ext
 * @returns {any}
 */
module.exports = function (Conf, Ext={}) {
    //logthat(Conf)
    let Alt;
    if (Conf.constructor.name === "AltSource") {
        Alt = Conf
    } else {
        Alt = new AltSource(Conf)
    }

    //logthat("Alt @ mid:", Alt)

    /**
     * Middleware function
     * @param {Request} req
     * @param {Response} res
     * @param {Next} next
     * @returns {void}
     * 
     * If the path is `Ext.path?` or `/altstore.json` then the middleware will respond with the json of the AltSource
     * 
     * Else it will call `next()` and it will add `Altsource` to the `req` property
     */
    return (req, res, next) => {
        //logthat("Passed AltSource",Conf)
        //logthat("mid:", req, res, next)
        if (Ext.hasOwnProperty('path')) {
            if (String(req.baseUrl + req.path) === Conf.path) {
                logthat('path: custom', String(req.baseUrl + req.path));
                res.json(Alt.toJSON())
            } else {
                logthat('outside of the scope with path')
                res.Altsource = Alt;
                next(); 
            }
        } else if (!Ext.hasOwnProperty('path') && String(req.baseUrl + req.path) === '/altstore.json') {
            logthat('path: default', '/altstore.json');
            res.json(Alt.toJSON())
        } else {
            logthat('outside of the scope')
            req.Altsource = Alt;
            next(); 
        }
    }
}

function logthat(where, what) {
    if (process.env.DEBUGING === 'y') {
        return console.log(where, what)
    } else {
        return `${where} ${what}`
    }
}