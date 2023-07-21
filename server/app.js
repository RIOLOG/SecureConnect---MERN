const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var cors = require("cors");
const cookieParser = require('cookie-parser');


app.use(cors());
app.use(cookieParser())

dotenv.config({path:'./config.env'});

require('./db/conn');


app.use(express.json());

// const User = require('./model/userSchema');


//Router
app.use(require('./router/auth'));



//database
const PORT = process.env.PORT;





//middleware
// const middleware = (req,res,next) => {
//     console.log("Ankit MIddleware");
//     next();
// }



// app.get('/',(req,res) =>{
//     res.send("Ankit Singh app.js")
// });


// app.get('/about',(req,res) =>{
//     res.send("Ankit Singh About me")
// });


// app.get('/contact',(req,res) =>{
//     res.send("Ankit Singh contant")
// });


app.get('/login',(req,res) =>{
    res.send("Ankit Singh login")
});

// app.get('/register',(req,res) =>{
//     res.send("Ankit Singh Register")
// });
console.log("RISHUUUUU");
 
app.listen(PORT); 