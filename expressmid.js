const {AltSource} = require('./classes')
/**
 * Express Middleware for AltSource
 * @param {{}|AltSource} Conf
 * @returns {any}
 */
module.exports = function (Conf) {
    //console.log(Conf)
    let Alt;
    if (Conf.constructor.name === "AltSource") {
        Alt = Conf
    } else {
        Alt = new AltSource(Conf)
    }

    return (req, res, next) => {
        //console.log("mid:", req, res, next)
        if (Conf.hasOwnProperty('path')) {
            if (String(req.baseUrl + req.path) === Conf.path) {
                //console.log('path: custom', String(req.baseUrl + req.path));
                res.json(Alt.toJSON())
            } else {
                //console.log('outside of the scope with path')
                res.altsource = Alt;
                next(); 
            }
        } else if (!Conf.hasOwnProperty('path') && String(req.baseUrl + req.path) === '/altstore.json') {
            //console.log('path: default', '/altstore.json');
            res.json(Alt.toJSON())
        } else {
            //console.log('outside of the scope')
            req.altsource = Alt;
            next(); 
        }
    }
}