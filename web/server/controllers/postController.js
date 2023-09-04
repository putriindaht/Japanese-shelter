const generateSlug = require("../helpers/generateSlug");
const { Post, Tag, Category, User, sequelize } = require("../models");
class PostController {
  static async getPosts(req, res, next) {
    try {
      const { categoryId } = req.query;
      let condition = {};
      categoryId ? (condition["categoryId"] = categoryId) : null;
      const posts = await Post.findAll({
        where: condition,
        order: [["id", "ASC"]],
        include: [
          {
            model: User,
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "password",
                "phoneNumber",
                "address",
              ],
            },
          },
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Tag,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  }

  static async addPost(req, res, next) {
    const { title, content, imgUrl, categoryId, Tags: tags } = req.body;
    const { id: authorId } = req.user;
    const slug = generateSlug(title);
    const trx = await sequelize.transaction();
    try {
      // add post
      if (categoryId === 0) {
        throw { name: "Category is required" };
      }
      const newPost = await Post.create(
        {
          title,
          slug,
          content,
          imgUrl,
          categoryId,
          authorId,
        },
        {
          transaction: trx,
        },
      );

      // add tag
      tags.forEach((tag) => {
        tag.postId = newPost.id;
      });
      const newTag = await Tag.bulkCreate(tags, {
        transaction: trx,
      });
      await trx.commit();
      res.status(201).json({
        message: `Post with title ${title} success to add`,
      });
    } catch (err) {
      await trx.rollback();
      next(err);
    }
  }

  static async editPost(req, res, next) {
    const { title, content, imgUrl, categoryId, Tags: tags } = req.body;
    const { id: postId } = req.params;
    const { id: authorId } = req.user;
    const slug = generateSlug(title);
    const trx = await sequelize.transaction();
    try {
      const postFound = await Post.findByPk(postId);
      if (!postFound) {
        throw { name: "Not found" };
      }
      await Post.update(
        {
          title,
          slug,
          content,
          imgUrl,
          categoryId,
          authorId,
        },
        {
          where: {
            id: postId,
          },
          transaction: trx,
        },
      );

      //edit tags
      // temukan tag bds post ID

      const tagFound = await Tag.findAll({ where: { postId } });
      if (!tagFound) {
        throw { name: "Not found" };
      }
      // kalo ada hapus aja langsung where post id
      await Tag.destroy({ where: { postId } });

      // dapet tags dari body, kita looping tambahin post idnya
      tags.forEach((tag) => {
        tag.postId = postFound.id;
      });

      // bulkcreate pake si tag yg udh dilooping
      await Tag.bulkCreate(tags, {
        transaction: trx,
      });

      await trx.commit();
      res.status(201).json({
        message: `Post with title ${title} success to update`,
      });
    } catch (err) {
      await trx.rollback();
      next(err);
    }
  }

  static async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const postFound = await Post.findByPk(id);
      if (!postFound) {
        throw { name: "Not found" };
      }
      const deletedPost = await Post.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: `Post with id ${id} deleted`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async detailPost(req, res, next) {
    try {
      const { slug } = req.params;
      const postFound = await Post.findOne({
        where: {
          slug,
        },
        include: [Category, Tag],
      });
      if (!postFound) {
        throw { name: "Not Found" };
      }
      res.status(200).json(postFound);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = PostController;
