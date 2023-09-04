const APP_SERVER_URL = process.env.APP_SERVER_URL;
const USER_SERVER_URL = process.env.USER_SERVER_URL;
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

const typeDefs = `#graphql
    type Post {
        id: ID
        title: String,
        slug: String,
        content: String,
        imgUrl: String,
        categoryId: Int,
        userMongoId: String,
        createdAt: String,
        updatedAt: String,
        Category: Category,
        Tags: [Tag],
        Author: Author
    }

    type Category {
        id: ID
        name: String
    }

    type Author {
      username: String
    }

    type Tag {
        name: String
    }
    
    input postInput {
        title: String
        content: String
        imgUrl: String
        categoryId: Int
        userMongoId: String
        Tags: [tagInput]
    }

    input tagInput {
        name: String
    }

    type Response {
        message: String
    }


    type Query {
        getPosts: [Post]
        getPost(slug:String): Post
        getCategories: [Category]
        getCategory(id:ID) : Category
    }

    type Mutation {
        createPost(newPost: postInput): Response
        deletePost(id:ID): Response
        updatePost(id:ID, updatedPost: postInput): Response 
    }
`;

const resolvers = {
  Query: {
    getPosts: async () => {
      try {
        const postChace = await redis.get("posts:posts");
        if (postChace) {
          const posts = JSON.parse(postChace);
          return posts;
        } else {
          const { data } = await axios.get(`${APP_SERVER_URL}/posts`);
          await redis.set("posts:posts", JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.log(err);
        return {
          message: err.response.data.message,
        };
      }
    },
    getPost: async (_, args) => {
      try {
        const { slug } = args;
        const { data: post } = await axios.get(
          `${APP_SERVER_URL}/posts/${slug}`,
        );
        console.log(post, 1);
        const { data: user } = await axios.get(
          `${USER_SERVER_URL}/users/${post.userMongoId}`,
        );
        // console.log(user, "<<<<<<<<<");
        post.Author = user;
        return post;
      } catch (err) {
        console.log(err);
        return {
          message: err.response.data.message,
        };
      }
    },
    getCategories: async () => {
      try {
        const categoryChace = await redis.get("categories:categories");
        if (categoryChace) {
          const posts = JSON.parse(categoryChace);
          return posts;
        } else {
          const { data } = await axios.get(`${APP_SERVER_URL}/categories`);
          await redis.set("categories:categories", JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.log(err);
        return {
          message: err.response.data.message,
        };
      }
    },
    getCategory: async (_, args) => {
      try {
        const { id } = args;
        const { data: category } = await axios.get(
          `${APP_SERVER_URL}/categories/${id}`,
        );
        return category;
      } catch (err) {
        console.log(err);
        return {
          message: err.response.data.message,
        };
      }
    },
  },

  Mutation: {
    createPost: async (_, args) => {
      try {
        const { title, content, imgUrl, categoryId, userMongoId, Tags } =
          args.newPost;
        const { data } = await axios.post(`${APP_SERVER_URL}/posts`, {
          title,
          content,
          imgUrl,
          categoryId,
          userMongoId,
          Tags,
        });

        await redis.del("posts:posts");
        const response = {
          title: data.title,
          content: data.content,
          imgUrl: data.imgUrl,
          categoryId: data.categoryId,
          userMongoId: data.userMongoId,
          Tags,
        };
        console.log({ response }, "<<<");
        return {
          message: "Success add post",
        };
      } catch (err) {
        console.log(err);
        return {
          message: err.response.data.message,
        };
      }
    },
    deletePost: async (_, args) => {
      try {
        const { id } = args;
        await axios.delete(`${APP_SERVER_URL}/posts/${id}`);
        await redis.del("posts:posts");
        return {
          message: "Post deleted",
        };
      } catch (error) {
        console.log(err);
        return {
          message: err.response.data.message,
        };
      }
    },
    updatePost: async (_, args) => {
      try {
        const { id } = args;
        const { title, content, imgUrl, categoryId, userMongoId, Tags } =
          args.updatedPost;
        const { data } = await axios({
          method: "put",
          url: `${APP_SERVER_URL}/posts/${id}`,
          headers: "Content-Type': 'application/json",
          data: {
            title,
            content,
            imgUrl,
            categoryId,
            userMongoId,
            Tags,
          },
        });
        await redis.del("posts:posts");
        return {
          message: "Post updated",
        };
      } catch (err) {
        console.log(err, "<<<<");
        return {
          message: err.response.data.message,
        };
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
