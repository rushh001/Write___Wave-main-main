const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if (!tokenCookieValue) {
            return next(); // No token, continue
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload; // Attach user data to `req.user`
        } catch (error) {
            console.error("❌ Invalid Token:", error.message);
        }

        next();
    };
}

module.exports = {
    checkForAuthenticationCookie,
};
