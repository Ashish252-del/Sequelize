

module.exports = (sequelize,DataTypes) =>{
    const Person = sequelize.define('person', {
        name: DataTypes.STRING
    },{
        // here we are saying that table name should be person that is mysql will not change its name 
        tableName:'person',
        // for using underscored in defaults fields made my mysql 
        underscored:true
    })
    return Person;
}