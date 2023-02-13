const { Sequelize, DataTypes } = require("sequelize");
// first parameter is name of your database second is user name third is password then an object with details
const sequelize = new Sequelize("youtubestu", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  pool: { max: 5, min: 0, idle: 10000 }, // maximum 5 connections minimum 0 connection time to go from one connection to anither connection is 10000
});

// to check weather connection is done or not
sequelize
  .authenticate()
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.log("error", error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// now we hsve to sync the models
// if we sync forcefully then it will delete the existing table and then recreate the table
// sync({force:true})
// if you want to drop database and create new for testing purpose
// sync({force:true, match:/-test$/}) means do force true if database name contains text

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("yes re-sync done!");
  })
  .catch((e) => console.log("Can't syncronize", e));

// inside db object we have user model with key users
db.users = require("./user")(sequelize, DataTypes);
db.posts = require("./post")(sequelize, DataTypes);
db.tags = require("./tag")(sequelize, DataTypes);
db.post_tag = require("./post")(sequelize, DataTypes);
db.person = require('../models/person')(sequelize,DataTypes);
db.empolyee = require('../models/empolyee')(sequelize,DataTypes);
//  console.log(db.posts);

//........oneToone relation ................//

// making one to one relation that means one user has only one post in post database
// foreignKey will be in post model
// to make alias you can pass one more parameter in both
//  db.users.hasOne(db.posts, { foreignKey:'user_id', as: 'Post Details'});
//      db.posts.belongsTo(db.users,{ foreignKey:'user_id', as: 'User Details'});
//  db.users.hasOne(db.posts, { foreignKey:'user_id'}); // by default foreignKey is userId but if you have with changed name then you have to specify here // here defining that posts belongs to

//.......oneTOmany.............//
// for oneTomany like we a user has multiple post
db.users.hasMany(db.posts, { foreignKey: "user_id", as: "Post Details" });
db.posts.belongsTo(db.users, { foreignKey: "user_id" });

//.......ManyTOMAny........//
db.posts.belongsToMany(db.tags, { through: "post_tag" });
db.tags.belongsToMany(db.posts, { through: "post_tag" });
module.exports = db;
