'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { //Users
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    encrypted_password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    access_token: {
      allowNull: true,
      type: DataTypes.STRING
    },

  },
    {
      tablename: 'users',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
    })
  return User;  /// ?   Users
};