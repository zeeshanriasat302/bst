const jwt = require('jsonwebtoken');
const adminModel = require('../models/admin.js');

function authMiddleware() {
    return async (req, res, next) => {
        const token = req.headers.authorization?.replace('Bearer ', '');
        let tokenData;
        if (token) {
            tokenData = jwt.decode(token);
        }
        if (!tokenData) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        const _id = tokenData.userId
        const admin = await adminModel.findById({ _id });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        req.user = admin;
        next();
    };
}
module.exports = authMiddleware;