const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();


const users = [
  { id: '1', username: 'user1', email: 'user1@example.com', password: 'password1' },
  { id: '2', username: 'user2', email: 'user2@example.com', password: 'password2' },
];

const typeDefs = gql`
  type User {
    id: ID
    username: String
    email: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    updateUser(id: ID!, username: String, email: String, password: String): User
    deleteUser(id: ID!): String
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find((user) => user.id === id),
  },
  Mutation: {
    createUser: (_, { username, email, password }) => {
      const newUser = { id: String(users.length + 1), username, email, password };
      users.push(newUser);
      return newUser;
    },
    updateUser: (_, { id, username, email, password }) => {
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      const updatedUser = { ...users[userIndex], username, email, password };
      users[userIndex] = updatedUser;
      return updatedUser;
    },
    deleteUser: (_, { id }) => {
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      users.splice(userIndex, 1);
      return 'User deleted successfully';
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
  
  app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000/graphql');
  });
}

startServer();
