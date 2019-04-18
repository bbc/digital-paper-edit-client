// The root provides a resolver function for each API endpoint
// root field of the query.
const root = { 
    hello: () => {
      return 'Hello world!' 
    }
  };


  /* Define the Query type - resolvers */
// const queryType = new graphql.GraphQLObjectType({
//   name: 'Query',
//   fields: {
//       users: {
//           type: userType,
//           // `args` describes the arguments that the `user` query accepts
//           args: {
//               id: { type: graphql.GraphQLString }
//           },
//           resolve: function (_, { id }) {
//               return fakeDatabase[id];
//           }
//       }
//   }
// });
  
module.exports.root = root;
