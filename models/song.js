'use strict';
const {
  Model
} = require('sequelize');
const {Genre} = require ('./')
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

    get minutes(){
      let minutes = Math.floor(this.duration / 60)
      let second = Math.floor(this.duration % 60)

      return `${minutes} : ${second} minutes`
    }

    static songbyArtist(id){
      let songs = Song.findAll({
        where:{
          UserId: id
        }
      })

      return songs
    }

  }
  Song.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "title is required",
        },
        notEmpty: {
          msg: "title should not be empty!!!",
        },
      },
    },
    duration: DataTypes.INTEGER,
    GenreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Genre is required",
        },
        notEmpty: {
          msg: "Genre should not be empty!!!",
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
    songURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "songURL is required",
        },
        notEmpty: {
          msg: "SongURL should not be empty!!!",
        },
      },
    },
    songImage: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};