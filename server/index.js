const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const portNum = 3001
const User = require("./models/Food");

app.use(express.json());
app.use(cors());

mongoose.connect(
    'mongodb+srv://cs431-thepurs:thepurs123@cluster0.u8zkruf.mongodb.net/MaximizeBenefits?retryWrites=true&w=majority', 
    {
        useNewUrlParser: true,
    }
);

// const registerRouter = require('./routes/register');
// app.use('/register', registerRouter);

let goSignal = ""
app.post('/insert', async(req, res) => {
    
    console.log("Inside app.get/insert")
    const fullName = req.body.fullName
    const username = req.body.username
    const password = req.body.password
    const role = req.body.role

    console.log("Role = " +role+ " username = " +username)
    const newUser = await User.findOne({username: username});
    if(newUser) {
        if(newUser.username === username) {
            goSignal = "NotGood"
            console.log("Username already exists!")
            console.log("Signal " +goSignal)
            var redir = { redirect: "NotGood" };
            return res.json(redir);
            // res.send(goSignal)
            // res.redirect(307, '/client/src/Pages/TestR.js');
            // res.redirect("/Pages/TestR.js")
        }
    } 
    else { 
        try {
            goSignal = "Good"
            console.log("Username does not exist")
            console.log("Signal " +goSignal)
            // res.send(goSignal)
            var redir = { redirect: "Good" };
            
            const customer = new User({
                fullName: fullName, 
                username: username, 
                password: password,
                role: role,
            });
            await customer.save()
            // .then(() => res.json('Exercise added!'));
            return res.json(redir);
            // res.send("Data inserted into database");
            } catch(err) {
                console.log(err);
            }
        }
});

app.post('/login', async(req, res) => {
    
    console.log("Inside app.post/login")
    const username = req.body.username
    const password = req.body.password

    const newUser = await User.findOne({username: username, password: password});
    if(newUser) {
        if(newUser.username === username && newUser.password === password) {
            goSignal = "NotGood"
            console.log("Username already exists!")
            console.log("Signal " +goSignal)
            var redir = { redirect: "NotGood" };
            return res.json(redir);
            // res.send(goSignal)
            // res.redirect(307, '/client/src/Pages/TestR.js');
            // res.redirect("/Pages/TestR.js")
        }
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
    console.log("Yes, your port is running on port ${portNum}");
});
