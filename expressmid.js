const {AltSource} = require('./classes')
/**
 * Express Middleware for AltSource
 * @param {{}|AltSource} Conf
 * @returns {any}
 */
module.exports = function (Conf) {
    let Alt;
    if (Conf.constructor.name === "AltSource") {
        Alt = Conf
    } else {
        Alt = new AltSource(Conf)
    }

    return (req, res, next) => {
        if (Conf.hasOwnProperty('path')) {
            if (String(req.baseUrl + req.path) === Conf.path) {
                res.json(Alt.toJSON())
            } else {
                res.altsource = Alt;
                next(); 
            }
        } else {
            res.altsource = Alt;
            next(); 
        }
    }
}