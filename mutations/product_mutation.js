const graphql = require('graphql');
const { GraphQLInt, GraphQLString, GraphQLNonNull } = graphql;
const { ProductType } = require('../types/types');
const { dbQuery } = require('../utils/database');

const addProduct = {
    type: ProductType,
    args: {
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
    },
    async resolve(parent, args){
        // const imageFile = req.files.path[0];
        let _ = await dbQuery("INSERT INTO products(name, isPending, views, price, description, category, image, datePosted, posterId, posterName, posterProfileAvatar, posterPhoneNumber)\
        VALUES ('"+ args.name +"','"+ args.isPending +"','"+ args.views +"','"+args.price+"','" +args.description+"','"+args.category+"','"+args.image+"','"+args.datePosted+"','"+args.posterId+"','"+args.posterName+"','"+args.posterProfileAvatar+"','"+args.posterPhoneNumber+"')");
        let id = _.insertId;
        let res = await dbQuery(`SELECT * FROM products WHERE id = ${id}`);
        return res[0];
    }
};

module.exports = { addProduct };