// schemas/resolvers.js
import User from '../models/User.js'; // Adjust path if needed
import { signToken, AuthenticationError } from '../utils/auth.js';

const resolvers = {
  Query: {
    me: async (_parent, _args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in');
      }
      return await User.findById(context.user._id);
    },
  },

  Mutation: {
    loginUser: async (_parent, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError('Invalid username or password');
      }

      const valid = await user.isCorrectPassword(password);
      if (!valid) {
        throw new AuthenticationError('Invalid username or password');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    addUser: async (_parent, args) => {
      const user = await User.create(args);
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
  },
};

export default resolvers;
