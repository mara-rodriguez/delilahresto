const root = 'root';
const password = 'admin';
const port = '3306';


const Sequelize = require ('sequelize');
const sequelize = new Sequelize (`mysql://${root}:${password}@localhost:${port}/delilah`);



async function createUser(user) {
    const result = await sequelize.query(`INSERT INTO delilah.users (username, name, lastname, email, phone, address, password) VALUES ('${user.username}','${user.name}','${user.lastname}','${user.email}',${user.phone},'${user.address}','${user.password}')`);
    user.id = result[0];
    return user;
}



async function getUser(username, password) {
    var user = await sequelize.query(`SELECT username, role from delilah.users WHERE username= '${username}' AND password= '${password}'`, 
    { type: Sequelize.QueryTypes.SELECT });
    return user[0];
}


async function getUserByUsername(username) {
    var user = await sequelize.query(`SELECT * from delilah.users WHERE username= '${username}'`, 
    { type: Sequelize.QueryTypes.SELECT });
    return user[0];
}


async function getAll() {
    var user = await sequelize.query('SELECT * from delilah.users',
    { type: Sequelize.QueryTypes.SELECT });
    return user;
}

module.exports = { createUser, getUser, getUserByUsername, getAll }