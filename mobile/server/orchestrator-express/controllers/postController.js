const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);
const APP_SERVER_URL = process.env.APP_SERVER_URL;

class PostController {
  static async getPosts(req, res, next) {
    try {
      let postCache = await redis.get("posts:posts");
      if (postCache) {
        let postsResult = JSON.parse(postCache);
        return res.status(200).json(postsResult);
      }
      const { data: response } = await axios.get(`${APP_SERVER_URL}/posts`);

      redis.set("posts:posts", JSON.stringify(response));
      return res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  }

  static async postOnePost(req, res, next) {
    try {
      const { title, content, imgUrl, categoryId, userMongoId, Tags } =
        req.body;
      const { data } = await axios({
        method: "post",
        url: APP_SERVER_URL + "/posts",
        data: {
          title,
          content,
          imgUrl,
          categoryId,
          userMongoId,
          Tags,
        },
        headers: {
          "Content-type": "application/json",
        },
      });
      await redis.del("posts:posts");
      res.status(201).json(data);
    } catch (err) {
      console.log(err);
    }
  }

  static async getOnePost(req, res, next) {
    try {
      const { slug } = req.params;
      const postsCache = await redis.get("posts:posts");
      const userCache = await redis.get("users:users");
      let post;

      if (postsCache) {
        const posts = JSON.parse(postsCache);
        const [foundPost] = posts.filter((post) => post.slug === slug);
        if (foundPost) {
          post = foundPost;
        } else {
          const { data } = await axios.get(APP_SERVER_URL + "/posts/" + slug);
          post = data;
        }
      } else {
        const { data } = await axios.get(APP_SERVER_URL + "/posts/" + slug);
        post = data;
      }

      if (!post) {
        throw { name: "not found" };
      }

      if (userCache) {
        const users = JSON.parse(userCache);
        const [foundUser] = users.filter((user) => {
          return user._id === post.userMongoId;
        });
        if (foundUser) {
          post.User = foundUser;
        } else {
          const { data: user } = await axios.get(
            APP_SERVER_URL + "/posts/" + post.userMongoId,
          );
          post.User = user;
        }
      } else {
        const { data: user } = await axios.get(
          APP_SERVER_URL + "/posts/" + post.userMongoId,
        );
        post.User = user;
      }
      res.status(200).json(post);
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteOnePost(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        method: "delete",
        url: APP_SERVER_URL + "/posts",
      });
      await redis.del("posts:posts");
      res.status(200).json({
        message: `post deleted`,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = PostController;
