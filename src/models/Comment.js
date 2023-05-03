const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/db');

const Comment = sequelize.define('comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  comment_date:{
    type: "DATE",
    defaultValue: sequelize.literal("CURRENT_DATE"),
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING(1234)
  },
  response: {
    type: DataTypes.STRING(1234)
  },
  response_date:{
    type: "DATE",
  },
}, {
  timestamps: false
})

module.exports={
  Comment
}