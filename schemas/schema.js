const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLID, GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLSchema, GraphQLList } = graphql;

const products = [ 
    {"id": "1", "posterId": "2", "name": "Laptop"}, {"id": "2", "posterId": "1", "name": "Shoe"},
    {"id": "3", "posterId": "2", "name": "Keyboard"}, {"id": "4", "posterId": "1", "name": "Car"},
    {"id": "5", "posterId": "2", "name": "Bike"}, {"id": "6", "posterId": "1", "name": "House"},
];
const users = [ 
    {"id": "1", "name": "Abeni", "age": 22}, {"id": "2", "name": "David", "age": 44}, {"id": "3", "name": "Liza", "age": 32}
];

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        poster:{
            type: UserType,
            resolve(parent, args){
                return _.find(users, {id: parent.posterId});
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ()=>({
         id: {type: GraphQLID},
         name: {type: new GraphQLNonNull(GraphQLString)},
         age: {type: new GraphQLNonNull(GraphQLInt)},
         products: {
             type: new GraphQLList(ProductType),
             resolve(parent, args){
                 return _.filter(products, {posterId: parent.id});
             }
         }   
    })
});


const RootQuery = new GraphQLObjectType({
        name: 'RootQueryType',
        description: 'This is the root query',
        fields: ()=>({
            product: {
                type: ProductType,
                args: {id: {type: GraphQLID}},
                resolve(parent, args){
                    //code to get data from db / other source
                    return _.find(products,{ id: args.id });
                }
            },
            products: {
                type: new GraphQLList(ProductType),
                resolve(parent, args){
                    return products;
                }
            },
            user: {
                type: UserType,
                args: {id: {type: GraphQLID}},
                resolve(parent, args){
                    return _.find(users,{ id: args.id});
                }
            },
            users: {
                type: new GraphQLList(UserType),
                resolve(parent,args){
                    return users;
                }
            }
    
        })
}); 


const schema = new GraphQLSchema({
    query: RootQuery
});


module.exports = schema;