
module.exports = (sequelize,DataTypes)=>{
    const Employee = sequelize.define('employee',{
        name:DataTypes.STRING,
        email:DataTypes.STRING
    },{
        tableName:'employee',
        // enabling here soft delete
        paranoid:true,
        // when we made paranoid true then deletedAt field is automatically added by mysql
        deletedAt:'softDeleted',
        createdAt:'created_at',
        updatedAt:'updated_at' 

    });
    return Employee;
}