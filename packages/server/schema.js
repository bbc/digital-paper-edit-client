// const graphql = require('graphql');

const { buildSchema } = require('graphql');

/* The Schema */
const schema = buildSchema(`
type Query {
  hello: String,
}
`);


/* Maps id to User object */
// var fakeDatabase = {
//     'a': {
//       id: 'a',
//       name: 'alice',
//     },
//     'b': {
//       id: 'b',
//       name: 'bob',
//     },
//   };
  


/* Define the User type - schema */

// const userType = new graphql.GraphQLObjectType({
//     name: 'User',
//     fields: {
//         id: { type: graphql.GraphQLString },
//         name: { type: graphql.GraphQLString },
//     }
// });



// const schema = new graphql.GraphQLSchema({ query: queryType });
/**/


module.exports.schema = schema;
