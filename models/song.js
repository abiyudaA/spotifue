'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.belongsTo(models.User)
      Song.belongsTo(models.Genre)

    }
  }
  Song.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title is required",
          },
          notEmpty: {
            msg: "Title is required",
          },
        },
    },
    duration: DataTypes.INTEGER,
    GenreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Genre Id is required",
        },
        notEmpty: {
          msg: "Genre Id is required",
        },
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "User Id is required",
        },
        notEmpty: {
          msg: "User Id is required",
        },
      },
    },
    songUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Link is required",
        },
        notEmpty: {
          msg: "Link is required",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};