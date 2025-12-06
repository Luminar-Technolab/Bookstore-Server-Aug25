const mongoose = require('mongoose')

const connectionString = process.env.ATLASCONNECTION

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB Atlas Database connected successfully!!!");
}).catch(error=>{
    console.log("Database connection failed!!!!");
    console.log(error);    
})