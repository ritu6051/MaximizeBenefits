const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const portNum = 3001
const User = require("./models/User");

app.use(express.json());
app.use(cors());

mongoose.connect(
    'mongodb+srv://cs431-thepurs:thepurs123@cluster0.u8zkruf.mongodb.net/MaximizeBenefits?retryWrites=true&w=majority', 
    { useNewUrlParser: true, }
);

let goSignal = ""
app.post('/insert', async(req, res) => {
    
    console.log("Inside server/index.js/app.post/insert")
    const fullName = req.body.fullName
    const username = req.body.username
    const password = req.body.password
    const role = req.body.role

    const newUser = await User.findOne({username: username});
    if(newUser) {
        console.log("Username already exists!")
        var redir = { redirect: "NotGood" };
        return res.json(redir);
    } 
    else { 
        try {
            console.log("Username does not exist")
            
            
            const customer = new User({
                fullName: fullName, 
                username: username, 
                password: password,
                role: role,
            });
            
            await customer.save()
            if(customer.role === "customer") {
                var redir = { redirect: "Good1" };
                return res.json(redir);
            } else if(customer.role === "insurancecompany") {
                var redir = { redirect: "Good2" };
                return res.json(redir);
            }

            
            } catch(err) {
                console.log(err);
            }
        }
});

app.post('/login', async(req, res) => {
    
    console.log("Inside server/index.js/app.post/login")
    const username = req.body.username
    const password = req.body.password
    
    const newUser = await User.findOne({username: username});
    if(newUser) {
        console.log("Username exists!")
        
        if(newUser.password === password) {
            console.log("Password Matches!")

            if(newUser.role === "customer") {
                console.log(username + " is a " +newUser.role+ "!")
                var redir = { redirect: "login_customer_successfully" };
                return res.json(redir);
            }
            else if(newUser.role === "insurancecompany") {
                console.log(username + " is a " +newUser.role+ "!")
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

app.get('/getGoSignal', (req, res) => {
    res.send(goSignal)
});

app.listen(portNum, () => {
    console.log("Yes, your port is running on port " +portNum);
});
