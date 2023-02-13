const { Sequelize, Op, DataTypes } = require("sequelize");

const { sequelize, empolyee } = require("../models/index");
var db = require("../models/index");
// console.log(db.users);
const Users = db.users;
const Posts = db.posts;
const tags = db.tags;
const employee = db.empolyee;
var addUser = async (req, res) => {
  // by build
  //     let data = await Users.build({name:'Test' , email:"test@gmail.com"})
  //  await data.save();

  // by create :- this create as well as save at the same time
  let data = await Users.create({ name: "Ashish", email: "@213.gmailcom" });

  // update to update data after saving

  // data.name = 'dummy'
  // data.save()

  // to delete
  // data.destroy();

  // reload  it will change the old value and simultaneouly again take the previous value
  // data.name = 'dummy'
  // data.reload()
  console.log(data.dataValues);
  let response = {
    data: "ok",
  };

  res.status(200).json(response);
};

// perforimg crud operation
var crud = async (req, res) => {
  // insert
  // let data = await Users.create({name:"Ankita", email:"123@gmail.com", gender:"f"})
  //   console.log(data.id);

  // update
  // let data = await Users.update({name:'final'},{
  //     where:{
  //         id:2
  //     }
  // });

  // delete
  // let data = Users.destroy({
  //     where:{
  //         id:2
  //     }
  // })
  // to delete whole table
  // truncate
  // let data = await Users.destroy ({
  //     truncate:true
  // })

  // bulk insert
  let data = await Users.bulkCreate([
    { name: "first", email: "first@gmail.com6", gender: "male" },
    { name: "first2", email: "first@gmail.com7", gender: "male" },
    { name: "first3", email: "first@gmail.com8", gender: "male" },
    { name: "first4", email: "first@gmail.com9", gender: "male" },
    { name: "first5", email: "first@gmail.com10", gender: "male" },
  ]);

  // find
  // return all data
  // let data = await Users.findAll({});
  // return only first data
  // let data = await Users.findOne({});

  let response = {
    data: data,
  };
  res.status(200).json(response);
};

// mysql query
var queryData = async (req, res) => {
  // insert  with specific we have to store only email and name
  //  let data = await Users.create({name:"Moni", email:"123@gmail.com", gender:"f"},{
  //     fields:['email','name']
  //  })

  // to get count
  // let cnt = await Users.count({})
  // select  with filters
  // let data = await Users.findAll({
  // attributes:[
  //     'name',
  //     'email',
  //     ['gender', 'sex'] ,// gender ka naam sex se aayega
  //     // to use functions
  //     // which function , on which field , name of the output
  //    // [Sequelize.fn('Count', Sequelize.col('email')), 'emailCount']
  //     // concate
  //    // [Sequelize.fn('CONCAT', Sequelize.col('email'),'addme'), 'newEmail']
  // ]
  // })

  // include and exclude
  //  let data = await Users.findAll({
  //     attributes:{exclude:['gender'],
  //  include:[
  //     [Sequelize.fn('CONCAT',Sequelize.col('name'), 'Patel'), 'fullName']
  //  ]},
  //  })

  // condition
  let data = await Users.findAll({
    where: {
      //    id:2
      id: {
        [Op.gt]: 2,
      },
      //   email:{
      //     [Op.like]:'@'
      //   }
    },
    order: [
      ["name", "DESC"],
      ["id", "DESC"],
    ],
    //    limit:2,
    //    offset:1,
    //    group:['eamil','name']
  });
  let response = {
    data: data,
  };
  res.status(200).json(response);
};
// find
var finderData = async (req, res) => {
  let data = await Users.findAll({});
  // let data = await Users.findByPK(4)
  res.status(200).json({ data: data });
};

// Setter getter
var setterGetter = async (req, res) => {
  let data = await Users.create({ name: "Manish", email: "test@gmail.com" });

  await data.save();

  let response = {
    data: data,
  };
  res.status(200).json(response);
};

// validation and constrain
// constrain , condition wich are using at mysql lavel
// validation , sequalization like name should be string only we cant take numbers

var validation = async (req, res) => {
  try {
    let data = await Users.create({
      name: "Test",
      email: "newmail@gmail.co",
      gender: "male",
      section: "A",
    });
    res.json({ data: data });
  } catch (e) {
    // handling errors
    const messages = {};
    e.errors.forEach((errors) => {
      let message;
      console.log(errors);
      // validatorKey gives us error
      // path told where the error exist
      switch (errors.validatorKey) {
        case "not_unique":
          message = "dublicate Email";
          break;
        // similarly can make different test cases for different validators
      }
      messages[errors.path] = message;
      console.log(messages);
    });
  }
};
// Association

// posting posts
var posting = async (req, res) => {
  let post = await tags.create({ name: "recent" });
  //   await post.save()
  res.json({ data: "ok" });
};

// oneToone means source has unly one row in target here target is post database and source is users database
// here we are reaching from user to post
var oneToOne = async (req, res) => {
  try {
    let data = await Users.findAll({
      include: Posts,
      // in case you want to specific fields of Posts
      // include:[{
      //       model:Posts,
      // if you have made alias then
      // as: 'Post Details'
      // which attributes you want inside post here we are getting only name
      //         attributes:['name']
      //    }]
      //  where: {id:3}
    });
    res.json({ data: data });
  } catch (error) {
    console.log("getting error", error);
  }
};

// now we have to reach from posts to user like which post is of which user
var belongsTo = async (req, res) => {
  try {
    let data = await Posts.findAll({
      attributes: ["name", "title"],
      include: [
        {
          model: Users,
          attributes: ["name", "email"],
        },
      ],
    });
    res.json({ data: data });
  } catch (error) {
    console.log("getting error", error);
  }
};

// one to many association
var oneToMany = async (req, res) => {
  try {
    let data = await Users.findAll({
      // in case you want to specific fields of Posts
      include: [
        {
          model: Posts,
          // if you have made alias then
          as: "Post Details",
          // which attributes you want inside post here we are getting only name
          attributes: ["name", "title"],
        },
      ],
      //  where: {id:3}
    });
    res.json({ data: data });
  } catch (error) {
    console.log("getting error", error);
  }
};

//........ manyto many ..........//
// post to tags
// var manyTomany = async (req,res) =>{
//     try {
//         let data = await Posts.findAll({

//              // in case you want to specific fields of Posts
//              include:[{
//                 model:tags,

//             }]
//           //  where: {id:3}
//         });
//         res.json({data:data});
//     } catch (error) {
//         console.log('getting error' , error);
//     }
// }

// tags to post
var manyTomany = async (req, res) => {
  try {
    let data = await tags.findAll({
      // in case you want to specific fields of Posts
      include: [
        {
          model: Posts,
        },
      ],
      //  where: {id:3}
    });
    res.json({ data: data });
  } catch (error) {
    console.log("getting error", error);
  }
};

//....... Query Interface ........ //
// it is used to make table , insert column in exisitng table , delete column , delete table , delete database
const queryInterface = sequelize.getQueryInterface();
var queryInterfaceData = async (req, res) => {
  try {
    // for making table
    // await  queryInterface.createTable('avon',{
    //     name:{type:DataTypes.STRING,
    //     allowNull:false,
    //     defaultValue:"Unknown"
    //     }
    // });

    // for inserting a column inside a table
    // await queryInterface.addColumn('avon','email',{
    //     type:DataTypes.STRING
    // })

    // // To update column or alter column
    // // note you have to write all attributes of that particular column when u are altering
    // await queryInterface.changeColumn('avon','email',{

    //     type:DataTypes.STRING,
    //      defaultValue:"123@gmail.com"
    // })

    // deleting a column
    // first parameter is table name second is column name
    // await queryInterface.removeColumn('avon','email');

    // deleting a table
    //  await queryInterface.dropTable('avon');
    res.json({ data: "ok" });
  } catch (error) {
    console.log(error, "is error");
  }
};
// In associations we have to methods of laoding data lazy loading and eger loading 
// eger loading use include keyword to load the data while lazy loading is :-
// loading
var loading = async (req, res) => {
  //lazy loading
  try {
    let data = await Users.findOne({
      where: { id: 1 },
    });
    let postData = await data.getPosts();

    res.status(200).json({ data,postData});
  } catch (error) {
    console.log(error);
  }
};

// soft delete 
var softdelete = async(req,res)=>{
  try {
    // deleting
    // still data wull be in database but it will marked as deleted 
    // let data = await employee.destroy({
    //  where:{
    //   id:1
    //  }
    // });
 // getting the all data note that deleted data will not come 
  // let alldata = await employee.findAll({})
   

   // getting all data which are also deleted 
   
  //  const data = await employee.findAll({
  //   // now it we enables for us to check weather data is deletd or not 
  //    paranoid:false
  //  })
  
   // To restore all the data 
   
  const data = await employee.restore({
    // condition which data you have to restore 
    where:{id:1}
  })
   res.status(200).json({data:data});
   } 
 

  catch (error) {
    
  }
}

 var Transition = async(req,res)=>
  {
  const t = await sequelize.transaction();
try {
  const data = await Users.create({
    name:"Raja" , email:"Raja@gmail.com" , gender:"male"
  })
  // if everything is fine we are comming herer 
  // error when come suppose we have defined here email as unique but we are trying to enter dublicate value then error can occur
  console.log('Commiting');
  t.commit();
  
} catch (error) {
  console.log("roll back ");
  t.rollback();


}
// to fatch data using transition 
//  const data =  await Users.findAll ({
//     transaction:t,
//     lock:true
//  })


res.json({data:'ok'})
  }
 
var hooks = async(req,res) =>{


  const data = await Users.create({
    name:"Shivam" , email:"shivam@gmail.com", gender:"male", section:"A"
  });
   res.json({
    data:data
   })
}
 

module.exports = {
  addUser,
  crud,
  queryData,
  finderData,
  setterGetter,
  validation,
  oneToOne,
  posting,
  belongsTo,
  oneToMany,
  manyTomany,
  queryInterfaceData,
  loading,
  softdelete,
  Transition,
  hooks
};
