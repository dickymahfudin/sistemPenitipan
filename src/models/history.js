"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  history.init(
    {
      user_id: DataTypes.INTEGER,
      loker: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "history",
    }
  );
  return history;
};
