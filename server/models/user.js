module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "users",
    {
      accesscode: DataTypes.STRING,
      roomname: DataTypes.STRING,
      username: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
};
