const root = 'root';
const password = 'admin';
const port = '3306';


const Sequelize = require ('sequelize');
const sequelize = new Sequelize (`mysql://${root}:${password}@localhost:${port}/delilah`);


function getProducts() {
    const products = sequelize.query('SELECT * FROM products', 
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


function removeProduct(id, status) {
    sequelize.query(`UPDATE products SET status ='${status.status}' WHERE id = ${id}`,
    { replacements: [`${status.status}`], type: sequelize.QueryTypes.SELECT }
    ).then(results => results)
}



function alterProduct(id, product) {
    sequelize.query(`UPDATE products SET name = '${product.name}', description = '${product.description}', cost = ${product.cost}, image = '${product.image}' WHERE id = ${id}`,
    { replacements: id }
); return product; 
}




module.exports = { getProducts, addProduct, removeProduct, alterProduct,getProductById }