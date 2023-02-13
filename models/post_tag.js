// it is use to make relation between post and tag 
// it will store foreignKey of both post and tag 
// many to many relation


module.exports = (sequelize,Datatypes) =>{
    const Post_Tags = sequelize.define(
        'post_tag' , {
            postId:Datatypes.INTEGER,
            tagId:Datatypes.INTEGER,
        },{
            timestamps:false 
          
        }
    )
    return Post_Tags
}
