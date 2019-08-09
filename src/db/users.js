const fs = require('fs');
const path = require('path');

let raw = fs.readFileSync(path.join(__dirname, 'users.json'));
let db = JSON.parse(raw);

function getUserById(id) {
    return db.users.find(el => el.id === id);
}

function getUserByEmail(email) {
    let user = db.users.find(el => el.email === email);
    return user;
}

function getLoginUser() {
    return db.users.find(el => !!el.token);
}

function updateUser(user) {
    db.users = db.users.map(el => el.id === user.id ? user : el);
}

function addUser(user) {
    db.users.push(user);
}

module.exports.getUserById = getUserById;
module.exports.getUserByEmail = getUserByEmail;
module.exports.getLoginUser = getLoginUser;
module.exports.updateUser = updateUser;
module.exports.addUser = addUser;
