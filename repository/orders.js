const { root, password, sever, port, db_name } = require('../configuration/database-config')

const Sequelize = require ('sequelize');
const sequelize = new Sequelize (`mysql://${root}:${password}@${sever}:${port}/${db_name}`);



function alterStatus(id, status) {
    sequelize.query(`UPDATE orders SET status ='${status.status}' WHERE id = ${id}`,
    { replacements: [`${status.status}`], type: sequelize.QueryTypes.SELECT }
    ).then(results => results)
};



async function insertOrder(userid, description, amount, order) {
    const result = await sequelize.query(`INSERT INTO orders ( userid, description, amount, paymentmethod) VALUES('${userid}','${description}','${amount}','${order.paymentMethod}')`);
    
    var orderID = result[0];

    for (let i = 0; i < order.detail.length; i++) {
        await insertDetail(orderID,order.detail[i])
    };

    return true;
};



async function insertDetail(orders_id,detail) {
    const result = await sequelize.query(`INSERT INTO details (orders_id, products_id, cantidad) VALUES ('${orders_id}','${detail.prod_id}','${detail.cant}')`);
    return true;
};



async function getOrdersByUsername(username,role) {
    const orders = await sequelize.query(`SELECT o.id, o.description, o.amount FROM orders o 
        JOIN users u on u.id = o.userid 
        WHERE (u.username = '${username}' or 'admin' = '${role}')
        ORDER BY o.id`, 
    { type: Sequelize.QueryTypes.SELECT });
    console.log(orders);
    return orders;
} 



function getOrderById(id) {
    const order = sequelize.query(`SELECT * FROM orders o 
    JOIN details d ON d.orders_id=o.id 
    JOIN products p on p.id = d.products_id
    WHERE o.id = '${id}'`, 
    { type: Sequelize.QueryTypes.SELECT });
    return order[0];
} 


function deleteOrder(id) {
    sequelize.query(`UPDATE products SET removed = 1 WHERE id = ${id}`,
    { type: sequelize.QueryTypes.SELECT }
    ).then(results => results)
}


module.exports = { alterStatus, insertOrder, getOrdersByUsername, getOrderById, deleteOrder };