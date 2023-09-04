require("dotenv").config();
const PORT = process.env.PORT || 4000;
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("./schemas/user");

const {
  typeDefs: postTypeDefs,
  resolvers: postResolvers,
} = require("./schemas/post");

(async () => {
  const server = new ApolloServer({
    typeDefs: [userTypeDefs, postTypeDefs],
    resolvers: [userResolvers, postResolvers],
    introspection: true,
  });

  const { url } = await startStandaloneServer(server, {
    listen: {
      port: PORT,
    },
  });
  console.log(`server ready at ${url}`);
})();
