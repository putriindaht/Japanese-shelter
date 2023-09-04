const USER_SERVER_URL = process.env.USER_SERVER_URL;
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

const typeDefs = `#graphql
type User {
    _id: ID!
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
}

input UserInput {
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
}

type Response {
    message: String
}

type Query {
    getAllUsers: [User]
    getOneUser(_id:ID): User
    
}

type Mutation {
    createUser(newUser: UserInput): User
    deleteUser(_id:ID): Response
}
`;

const resolvers = {
  Query: {
    getAllUsers: async () => {
      try {
        const userCache = await redis.get("users:users");
        if (userCache) {
          const users = JSON.parse(userCache);
          return users;
        } else {
          const { data } = await axios.get(`${USER_SERVER_URL}/users`);
          await redis.set("users:users", JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.log(err);
        return { message: err.response.data.message };
      }
    },
    getOneUser: async (_, args) => {
      try {
        const { _id } = args;
        const { data } = await axios.get(`${USER_SERVER_URL}/users/${_id}`);
        return data;
      } catch (err) {
        console.log(err);
        return { message: err.response.data.message };
      }
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      try {
        const { username, email, password, role, phoneNumber, address } =
          args.newUser;
        const { data } = await axios.post(`${USER_SERVER_URL}/users`, {
          username,
          email,
          password,
          role,
          phoneNumber,
          address,
        });
        await redis.del("users:users");
        return data;
      } catch (err) {
        console.log(err);
        return { message: err.response.data.message };
      }
    },
    deleteUser: async (_, args) => {
      try {
        const { _id } = args;
        const { data } = await axios.delete(`${USER_SERVER_URL}/users/${_id}`);
        await redis.del("users:users");
        return {
          message: "User deleted",
        };
      } catch (err) {
        console.log(err);
        return { message: err.response.data.message };
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
