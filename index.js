const express = require('express');
const ctrl = require('./controllers/userControllers')
const app = express();
require('./models/index')
const port = 8000;
app.get('/',(req,res)=>{
    res.send(('home page'))
})
app.get('/add',ctrl.addUser);
app.get('/crud',ctrl.posting);
app.get('/query',ctrl.queryData);
app.get('/find',ctrl.finderData);
app.get('/getter-setter',ctrl.setterGetter)
app.get('/validate',ctrl.validation)
app.get('/oneToone',ctrl.oneToOne);
app.get('/belongs', ctrl.belongsTo);
app.get('/oneTomany',ctrl.oneToMany);
app.get('/manyTomany',ctrl.manyTomany);
app.get('/queryInterface',ctrl.queryInterfaceData);
app.get('/loading',ctrl.loading);
app.get('/softDelete',ctrl.softdelete);
app.get('/Transition',ctrl.Transition);
app.get('/hooks',ctrl.hooks);
app.listen(3500,()=>{
    console.log('Server is running at 3500');
})