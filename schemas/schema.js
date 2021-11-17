const graphql = require('graphql');
const { dbQuery } = require('../utils/database');
const { ProductType, ImageType } = require('../types/types');
const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLID, GraphQLInt, GraphQLString } = graphql;


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
            product: {
                type: ProductType,
                args: {id: {type: GraphQLID}},
                async resolve(parent, args){
                    let res = await dbQuery(`SELECT * FROM PRODUCTS WHERE id = ${args.id}`);
                    return res[0];
                }
            }
        })
}); 

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: ()=>({
        addImage: {
            type: ImageType,
            args:{
                id: {type: GraphQLInt},
                url: {type: GraphQLString}
            },
            async resolve(parent, args){
                let _ = await dbQuery(`INSERT INTO images(id, url) values('${args.id}', '${args.url}')`);
                let id = _.insertId;
                let res = await dbQuery(`SELECT * FROM images WHERE image_id = ${id}`);
                return res[0];
            }
        }   
    })
})


const Schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});


module.exports = { Schema };