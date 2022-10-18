const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const CustomerModel = require("./models/Food");

app.use(express.json());
app.use(cors());

mongoose.connect(
    'mongodb+srv://cs431-thepurs:thepurs123@cluster0.u8zkruf.mongodb.net/MaximizeBenefits?retryWrites=true&w=majority', 
    {
        useNewUrlParser: true,
    }
);

app.post('/insert', async(req, res) => {
    const fullName = req.body.fullName
    const username = req.body.username
    const password = req.body.password
    const role = req.body.role

    // const food = new FoodeModel({foodName: foodName, foodAge: foodAge});
    const customer = new CustomerModel({
        fullName: fullName, 
        username: username, 
        password: password,
        role: role,
    });

    try {
        await customer.save();
        res.send("Data inserted into database");
    } catch(err) {
        console.log(err);
    }
});

app.get('/read', async(req, res) => {
    const username = req.body.username
    const role = req.body.role
    CustomerModel.find({}, (err,result) =>{
        if(err) {
            res.send(err)
        }

        res.send(result)
    })
    
});

app.listen(3001, () => {
    console.log("Yes, your port is running on port 3001");
});
