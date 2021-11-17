const graphql = require('graphql');
const { GraphQLID, GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLList } = graphql;
const { dbQuery } = require('../utils/database');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ()=>({
        deviceToken: {type: GraphQLString},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        phoneNumber: {type: GraphQLString},
        password: {type: GraphQLString},
        profile_image: {type: GraphQLString},
        dateJoined: {type: GraphQLString},
        products:{
            type: new GraphQLList(ProductType),
            async resolve(parent, args){
                let res = await dbQuery(`SELECT * FROM products WHERE posterId = ${parent.id}`);
                return res;
            }
        }
    })
})

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: ()=>({
        id: {type: GraphQLID},
        isPending: {type: new GraphQLNonNull(GraphQLString)},
        views: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        price: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        category: {type: new GraphQLNonNull(GraphQLString)},
        image: {type: new GraphQLNonNull(GraphQLString)},
        datePosted: {type: new GraphQLNonNull(GraphQLString)},
        posterId: {type: new GraphQLNonNull(GraphQLString)},
        posterName: {type: new GraphQLNonNull(GraphQLString)},
        posterProfileAvatar: {type: new GraphQLNonNull(GraphQLString)},
        posterPhoneNumber: {type: new GraphQLNonNull(GraphQLString)},
        images: {
            type: new GraphQLList(ImageType),
            async resolve(parent, args){
                let res = await dbQuery(`SELECT * FROM images WHERE id = ${parent.id}`);
                return res;
            }
        }
    })
});

const ImageType = new GraphQLObjectType({
    name: 'Image',
    fields: ()=>({
        image_id: {type: GraphQLInt},
        id: {type: GraphQLInt},
        url: {type: GraphQLString}
    })
});

module.exports = { UserType, ProductType, ImageType };