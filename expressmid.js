const {AltSource} = require('./classes')
/**
 * Express Middleware for AltSource
 * @param {{}|AltSource} Conf
 * @param {{path: String?}} Ext
 * @returns {any}
 */
module.exports = function (Conf, Ext={}) {
    //console.log(Conf)
    let Alt;
    if (Conf.constructor.name === "AltSource") {
        Alt = Conf
    } else {
        Alt = new AltSource(Conf)
    }

    //console.log("Alt @ mid:", Alt)

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
        //console.log("Passed AltSource",Conf)
        //console.log("mid:", req, res, next)
        if (Ext.hasOwnProperty('path')) {
            if (String(req.baseUrl + req.path) === Conf.path) {
                console.log('path: custom', String(req.baseUrl + req.path));
                res.json(Alt.toJSON())
            } else {
                console.log('outside of the scope with path')
                res.Altsource = Alt;
                next(); 
            }
        } else if (!Ext.hasOwnProperty('path') && String(req.baseUrl + req.path) === '/altstore.json') {
            console.log('path: default', '/altstore.json');
            res.json(Alt.toJSON())
        } else {
            console.log('outside of the scope')
            req.Altsource = Alt;
            next(); 
        }
    }
}