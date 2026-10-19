// Logger hver request i konsollen - nyttigt til debugging.
class RequestLogger {
    static middleware(req, res, next) {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
        next();
    }
}

module.exports = RequestLogger;
