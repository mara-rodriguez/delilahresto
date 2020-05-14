const { root, password, server, port, db_name } = require('../configuration/database-config')

const Sequelize = require ('sequelize');
const sequelize = new Sequelize (`mysql://${root}:${password}@${server}:${port}/${db_name}`);



async function createUser(user) {
    const result = await sequelize.query(`INSERT INTO users (username, name, lastname, email, phone, address, password, role) VALUES ('${user.username}','${user.name}','${user.lastname}','${user.email}',${user.phone},'${user.address}','${user.password}', '${user.role}')`);
    user.id = result[0];
    return user;
}



async function getUser(username, password) {
    var user = await sequelize.query(`SELECT username, role from users WHERE removed = 0 AND username = '${username}' AND password = '${password}'`, 
    { type: Sequelize.QueryTypes.SELECT });
    return user[0];
}



async function getUserByUsername(username) {
    var user = await sequelize.query(`SELECT * from users WHERE  username = '${username}'`, 
    { type: Sequelize.QueryTypes.SELECT });
    return user[0];
}



async function getAll() {
    var user = await sequelize.query('SELECT * from users',
    { type: Sequelize.QueryTypes.SELECT });
    return user;
}


function removeUser(id) {
    sequelize.query(`UPDATE users SET removed = 1 WHERE id = ${id}`,
    { type: sequelize.QueryTypes.SELECT }
    ).then(results => results)
}



function alterUser(id, user) {
    sequelize.query(`UPDATE products SET username = '${user.username}', user = '${user.name}', lastname = '${user.lastname}', email = '${user.email}', phone = ${user.phone}, address = '${user.address}', password = '${user.password}',  role = '${user.role}' WHERE id = ${id}`,
    { replacements: id }
); return user; 
}



module.exports = { createUser, getUser, getUserByUsername, getAll, removeUser, alterUser }