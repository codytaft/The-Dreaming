let express = require('express');
let express_graphql = require('express-graphql');
let { buildSchema } = require('graphql');

//GraphQL schema
let schema = buildSchema(`type Query {
  message: String
}`);

//Root resolver
let root = {
  message: () => 'Hello World!'
};

//Create an express server and a GraphQL endpoint
let app = express();
app.use(
  '/graphql',
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000, () =>
  console.log('Express GraphQL Server Now Running On localhost:4000/graphql')
);
