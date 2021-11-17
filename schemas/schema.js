const graphql = require('graphql');
const { dbQuery } = require('../utils/database');
const { ProductType } = require('../types/types');
const { GraphQLObjectType, GraphQLSchema, GraphQLList } = graphql;


const RootQuery = new GraphQLObjectType({
        name: 'RootQueryType',
        description: 'This is the root query',
        fields: ()=>({
            products: {
                type: new GraphQLList(ProductType),
                async resolve(parent, args){
                    let res = await dbQuery('SELECT * FROM products');
                    return res;
                }
            },
        })
}); 


const schema = new GraphQLSchema({
    query: RootQuery
});


module.exports = schema;