const { Sequelize, DataTypes } = require("sequelize");

// creating model
module.exports = (Sequelize, DataTypes) => {
  // first parameter is table name then its fields
  const Users = Sequelize.define(
    "users",
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        // here constrain
        allowNull: false,
        unique: true,
        defaultValue: "ashish@gmail.com",
      },
      gender: {
        type: DataTypes.STRING,
        // here using setter
        // to set before sending the database it will set the valude then modified value will save in backend
        set(value) {
          this.setDataValue("gender", value + " is Person Gender");
        },

        // here using getter whenever we will get value from database then it will modify data comming from
        // database and return note there will be no change in data stored in database
        get() {
          return this.getDataValue("gender") + " using getter";
        },
      },
      section: {
        type: DataTypes.STRING,
        // using validation
        validate: {
          // means we will accept only male
          equals: "A",
        },
      },
    },
    {
      // if you want to change your tableName
      // tableName:'userdata'
      // as we have seen CreatedAt and UpdatedAt automatically created on table
      // if both should not create by itself
      // timestamps:false
      // for a particular
      // updatedAt:false
      // if you want to give your name
      // createdAt:'create_at'

      // defining hook here
      hooks: {
        beforeValidate: (record, options) => {
          console.log("calling hooks ");
          // we can also change data depending upon our requirement
          // for example if i want before validation section of user should be change
          //  record.section = 'B'
        },
        afterValidate: (record, options) => {
          // here write conditions
        },
        // similarly other hooks can also be defined
      },
    }
  );
  return Users;
};
