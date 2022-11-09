const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const portNum = 3001
const User = require("./models/User");
const Insurance = require("./models/Insurance");

app.use(express.json());
app.use(cors());

mongoose.connect(
    'mongodb+srv://cs431-thepurs:thepurs123@cluster0.u8zkruf.mongodb.net/MaximizeBenefits?retryWrites=true&w=majority', 
    { useNewUrlParser: true, }
);

app.get('/findInsurances', async(req, res) => {
    try {
        console.log("Inside server/index.js/app.post/findInsurances")

        User.distinct("username", (err,result) =>{
            if(err) {
                res.send(err)
            }
            res.send(result)
        })

        // const checkUser = await User.distinct("username");
        // var redir = { redirect: checkUser };
        // console.log("redir = " +redir)
        // return res.json(redir);
         
    } catch(err) {
        console.log(err);
    }
});

app.post('/register', async(req, res) => {
    try {
        console.log("Inside server/index.js/app.post/register")
        const fullName = req.body.fullName
        const username = req.body.username
        const password = req.body.password
        const passwordAgain = req.body.passwordAgain
        const role = req.body.role

        const checkUser = await User.findOne({username: username});
        
        if(checkUser) {
            console.log("Username already exists!")
            var redir = { redirect: "username_already_exists" };
            return res.json(redir);
        } 
        else { 
            console.log("Username does not exist, can create account")
            const newUser = new User ({
                fullName: fullName, 
                username: username, 
                password: password,
                role: role,
            });
            
            console.log(newUser.username + " is a " +newUser.role+ "!")
            if(password === passwordAgain) {
                console.log("Both passwords match!")

                if(newUser.role === "customer") {
                    var redir = { redirect: "login_customer_successfully" };
                    await newUser.save()
                    return res.json(redir);
                } else if(newUser.role === "insurancecompany") {
                    await newUser.save()
                    var redir = { redirect: "login_company_successfully" };
                    return res.json(redir);
                }
            }
            else {
                console.log("Both passwords do not match!")
                var redir = { redirect: "passwords_do_not_match" };
                return res.json(redir);
            }
        } 
    } catch(err) {
        console.log(err);
    }
});

app.post('/login', async(req, res) => {
    try {
        console.log("Inside server/index.js/app.post/login")
        const username = req.body.username
        const password = req.body.password
        
        const loginUser = await User.findOne({username: username});
        if(loginUser) {
            console.log("Username exists!")
            
            if(loginUser.password === password) {
                console.log("Password Matches!")

                console.log(username + " is a " +loginUser.role+ "!")
                if(loginUser.role === "customer") {
                    var redir = { redirect: "login_customer_successfully" };
                    return res.json(redir);
                }
                else if(loginUser.role === "insurancecompany") {
                    var redir = { redirect: "login_company_successfully" };
                    return res.json(redir);
                }
            }
            else {
                console.log("Password does not match!")
                var redir = { redirect: "incorrect_password" };
                return res.json(redir);
            }
        }
        else {  
            console.log("Username does not exist!")
            var redir = { redirect: "user_does_not_exist" };
            return res.json(redir);
        } 
    } catch(err) {
        console.log(err);
    }
});

app.get('/read', async(req, res) => {
    const username = req.body.username
    const role = req.body.role
    User.find({}, (err,result) =>{
        if(err) {
            res.send(err)
        }
        res.send(result)
    })
    
});

app.listen(portNum, () => {
    console.log("Yes, your port is running on port " +portNum);
});
