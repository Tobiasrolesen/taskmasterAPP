//Logger hver request i konsollen - nyttigt til debugging.
//Vi bruger kun den her sidde til console print.
class RequestLogger {
    static middleware(req, res, next) {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
        next();
    }
}

module.exports = RequestLogger;
