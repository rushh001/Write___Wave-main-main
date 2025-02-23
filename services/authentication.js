const JWT = require('jsonwebtoken');

const secret = "$uperMan@123";

function createTokenForUser(user) {
    const payload = {
        _id: user.id,
        email: user.email,
        fullName: user.fullName,
        profile: user.profile,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
    };
    return JWT.sign(payload, secret);
}

function validateToken(token) {
    return JWT.verify(token, secret);
}

module.exports = {
    createTokenForUser,
    validateToken,
};
