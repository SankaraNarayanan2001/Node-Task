const express=require('express');

const bodyParser = require('body-parser');

const adminrouter=require('./app/routes/adminRoutes');

const userrouter=require('./app/routes/userRoutes');

const PORT = 3000;

const app=express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(adminrouter);

app.use(userrouter);

app.listen(PORT,()=>{
    console.log(`server is listening at port ${PORT}`)
});