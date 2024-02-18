"use strict";
const bcrypt = require("bcrypt");
require("dotenv").config();
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON(){
      return { ...this.get(), password: undefined };
    }
  }
  Users.init(
    {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const saltRounds = parseInt(process.env.SALT_ROUNDS);
          try {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hash);
          } catch (error) {
            console.log(error.message);
          }
        },
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
