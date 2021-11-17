const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLNonNull } = graphql;
const { dbQuery } = require('../utils/database');
const { ImageType } = require('../types/types');
const productQuery = require('../queries/product_query');
const productMutation = require('../mutations/product_mutation');
const imageMutation = require('../mutations/image_mutation');


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
        addProduct: productMutation.addProduct,
        addImage: imageMutation.addImage,
        updateImage: imageMutation.updateImage 
    })
})


const Schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});


module.exports = { Schema };