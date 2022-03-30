import { ApolloServer, gql } from 'apollo-server-micro';
import Cors from 'micro-cors';

const cors = Cors();

const typeDefs = gql`
  type Query {
    test: String
  }
`;

const resolvers = {
  Query: {
    test: () => {
      return 'Hello';
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {},
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
