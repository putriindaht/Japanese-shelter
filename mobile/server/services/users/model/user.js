const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongoConnection");

class User {
  static userCollection() {
    return getDB().collection("users");
  }

  static async findAll() {
    try {
      const users = await this.userCollection().find().toArray();
      return users;
    } catch (err) {
      console.log(err);
    }
  }

  static async findOne(id) {
    try {
      const user = await this.userCollection().findOne({
        _id: new ObjectId(id),
      });
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  static async insertOne(payload) {
    try {
      const user = await this.userCollection().insertOne(payload);
      const newUser = await this.userCollection().findOne({
        _id: new ObjectId(user.insertedId),
      });
      return newUser;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteOne(id) {
    try {
      const userFound = await this.findOne(id);
      if (userFound) {
        await this.userCollection().deleteOne({
          _id: userFound._id,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = User;
