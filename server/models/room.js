module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "rooms",
    {
      roomname: DataTypes.STRING,
      roomowner: DataTypes.STRING,
      roommode: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
};
