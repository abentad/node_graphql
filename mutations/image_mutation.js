const graphql = require('graphql');
const { GraphQLInt, GraphQLString, GraphQLNonNull } = graphql;
const { ImageType } = require('../types/types');
const { dbQuery } = require('../utils/database');


const addImage = {
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

module.exports = { addImage };