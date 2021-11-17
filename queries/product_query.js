const graphql = require('graphql');
const { ProductType } = require('../types/types');
const { dbQuery } = require('../utils/database');
const { GraphQLList, GraphQLID } = graphql;

//get list of products
const products = {
    type: new GraphQLList(ProductType),
    async resolve(parent, args){
        let res = await dbQuery('SELECT * FROM products');
        return res;
    }
}

//get specific product
const product = {
    type: ProductType,
    args: {id: {type: GraphQLID}},
    async resolve(parent, args){
        let res = await dbQuery(`SELECT * FROM PRODUCTS WHERE id = ${args.id}`);
        return res[0];
    }
}


module.exports = { products, product };