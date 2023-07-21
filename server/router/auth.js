const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate")
var cors = require("cors");



require('../db/conn');
const User = require("../model/userSchema");


router.get('/',(req,res) => {
    res.send("auth.js router");
});




//REGISTER
router.post('/register', async (req,res) =>{

    const {name , email, phone, work, password, cpassword} = req.body;


    //ADhish
    // const user = new User({name , email, phone, work, password, cpassword});
    // const userRegister = await user.save();
    // console.log(user);

    if (!name|| !email || !phone || !work || !password || !cpassword)
    {
        return res.status(422).json({error:'something is invalid'})
    }

    try{
        const userExist = await User.findOne({email:email});

        if (userExist)
        {
            return res.status(422).json({error:"email aready existed"});
        }

        else if (password != cpassword)
        {
            return res.status(422).json({error:"password not match"})
        }
        else
        {
            const user = new User({name , email, phone, work, password, cpassword});

         

            const userRegister = await user.save();
            //console.log(userRegister);
    
            if (userRegister)
            {
                res.status(201).json({message:"user registred Successfully"});
            }
        }

    
    }catch(err ){
        console.log(err)
    }


});




//LOGIN:
router.post('/signin', async(req,res) => {
    try{
        let token;
        const{email,password} = req.body;
        if (!email || !password)
        {
            return res.status(400).json({error:"data fill plaease"})
        }

        const userLogin = await User.findOne({email:email});
        
        // console.log(userLogin);

        if (userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);

            //cookies
            res.cookie("jwtoken",token,{
                expires: new Date(Date.now()+258920000),
                httpOnly:true
            });


        if (!isMatch){
            res.status(400).json({message:"user error cred. pass signin"})
        } else{
            res.json({message:"user signin success "});
        }
        } else {
            res.status(400).json({message:"user error cred. signin"});
        }


    } catch (err) {
        console.log(err);
    }
});


//ABOUT
router.get('/about', authenticate, (req,res) => {
    //console.log("Hello my About");
    res.send(req.rootUser);
});



//user data from contact form:
router.get('/getdata',authenticate, (req,res) => {
    res.send(req.rootUser);
});


//contact us page:
router.post('/contact',authenticate, async (req,res) =>{
    try{
        const{name,email,phone,message} = req.body;

        if (!name || !email || !phone || !message){
            console.log("error in contact form");
            return res.json({error:"please fill the contact form"});
        }

        const userContact = await User.findOne({_id:req.userID});

        if (userContact){
            const userMessage = await userContact.addMessage(name,email,phone,message);

            await userContact.save();

            res.status(201).json({message:"user contact usccessfully"});
        }


    } catch(error){
        console.log(error);
    }

});


//logout
router.get('/logout', (req,res) => {
    //console.log("Hello my About");
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('User Logout');
});


module.exports = router;