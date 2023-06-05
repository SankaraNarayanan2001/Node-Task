const express=require('express');

require('dotenv').config();

const adminrouter=require('./app/routes/adminRoutes');

const userrouter=require('./app/routes/userRoutes');

const PORT = process.env.DB_PORT;

const app=express();

app.use(express.json());

app.use(adminrouter);

app.use(userrouter);

app.listen(PORT,()=>{
    console.log(`server is listening at port ${PORT}`)
});