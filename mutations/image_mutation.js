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

const updateImage = {
    type: GraphQLString,
    args:{
        imageId: {type: GraphQLInt},
        id: {type: GraphQLInt},
        url: {type: GraphQLString}
    },
    async resolve(parent, args){
        let _ = await dbQuery(`UPDATE images SET id = '${args.id}', url = '${args.url}' WHERE image_id = '${args.imageId}'`);
        return "Update Success.";
    }
}

const deleteImage = {
    type: GraphQLString,
    args: {
        imageId: {type: GraphQLInt}
    },
    async resolve(parent, args){
        let _ = await dbQuery(`DELETE FROM images WHERE image_id = '${args.imageId}'`);
        return "Remove Success.";
    }
}

module.exports = { addImage, updateImage, deleteImage };