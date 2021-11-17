const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString } = graphql;
const { dbQuery } = require('../utils/database');
const { ImageType } = require('../types/types');
const productQuery = require('../queries/product_query');


const RootQuery = new GraphQLObjectType({
        name: 'RootQueryType',
        description: 'This is the root query',
        fields: ()=>({
            products: productQuery.products,
            product: productQuery.product
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