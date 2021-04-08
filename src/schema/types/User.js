const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');
const { User } = require('../../models');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString }
  })
});

const UserQueryFields = {
  users: {
    type: new GraphQLList(UserType),
    resolve() {
      return User.find({})
    }
  }
};

const UserMutationFields = {
  addUser: {
    type: UserType,
    args: {
      username: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(_, args) {
      const newUser = new User({
        username: args.username,
        password: args.password
      });

      return newUser.save();
    }
  }
};

module.exports = {
  UserQueryFields,
  UserMutationFields,
  User
};
