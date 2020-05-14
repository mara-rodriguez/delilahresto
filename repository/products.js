const { root, password, sever, port, db_name } = require('../configuration/database-config')

const Sequelize = require ('sequelize');
const sequelize = new Sequelize (`mysql://${root}:${password}@${sever}:${port}/${db_name}`);



function getProducts() {
    const products = sequelize.query('SELECT * FROM products WHERE removed = 0', 
    { type: Sequelize.QueryTypes.SELECT });
    return products;
} 



async function getProductById(id) {
    const prod = await sequelize.query(`SELECT * FROM products WHERE id = '${id}'`, 
    { type: Sequelize.QueryTypes.SELECT });
    return prod[0];
} 



async function addProduct(product) {
    console.log(product);
    const result = await sequelize.query(`INSERT INTO delilah.products (name, description, cost, image) VALUES ('${product.name}','${product.description}',${product.cost},'${product.image}')`);
    console.log(result);
    product.id = result[0];
    return product;
}


function removeProduct(id) {
    sequelize.query(`UPDATE products SET removed = 1 WHERE id = ${id}`,
    { type: sequelize.QueryTypes.SELECT }
    ).then(results => results)
}



function alterProduct(id, product) {
    sequelize.query(`UPDATE products SET name = '${product.name}', description = '${product.description}', cost = ${product.cost}, image = '${product.image}' WHERE id = ${id}`,
    { replacements: id }
); return product; 
}




module.exports = { getProducts, addProduct, removeProduct, alterProduct,getProductById }