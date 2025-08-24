// schemas/typeDefs.js
import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Mutation {
    loginUser(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

export default typeDefs;
