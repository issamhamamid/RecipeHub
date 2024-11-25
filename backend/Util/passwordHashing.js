const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const saltRounds = 10;
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (err) {
        console.error('Error hashing password:', err);
    }
}

const verifyPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = { hashPassword, verifyPassword };
