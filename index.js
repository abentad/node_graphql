const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { Schema } = require('./schemas/schema');

app.use(express.json({extended: false}));
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true
}));


app.listen(3000, ()=> console.log('server started at: http://localhost:3000'));

