const jwt = require('jsonwebtoken');

function generateToken({ id, nome, role }) {
    return jwt.sign({ id, nome, role }, process.env.JWT_SECRET, { expiresIn: '2min' });
}

module.exports = generateToken;