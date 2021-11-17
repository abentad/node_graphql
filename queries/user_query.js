const graphql = require('graphql');
const { UserType } = require('../types/types');
const { dbQuery } = require('../utils/database');
const { GraphQLInt } = graphql;

const getUser = {
    type: UserType,
    args: {id: {type: GraphQLInt}},
    async resolve(parent, args){
        let res = await dbQuery(`SELECT * FROM users WHERE id = ${args.id}`);
        return res[0];
    }
}

module.exports = { getUser };