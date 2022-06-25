'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    number: DataTypes.STRING,
    street: DataTypes.STRING,
    state: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  return Address;
};