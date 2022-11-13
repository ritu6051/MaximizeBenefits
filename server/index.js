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

// BOTH ROLES
app.post('/login', async(req, res) => { // Login.js
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

app.post('/register', async(req, res) => { //Register.js
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

app.get('/read', async(req, res) => { //Register.js
    const username = req.body.username
    const role = req.body.role
    User.find({}, (err,result) =>{
        if(err) {
            res.send(err)
        }
        res.send(result)
    })
});

// COMPANY
app.post('/insertInsurancePlan', async(req, res) => { //AddBenefits.js
    try {
        const insuranceName = req.body.insuranceName
        const insuranceType = req.body.insuranceType
        const planName = req.body.planName
        const yearlyCost = req.body.yearlyCost
        const maxAge = req.body.maxAge
        const coverageDetails = req.body.coverageDetails
        const plans = req.body.plans
        
        const insurance = await Insurance.findOne({insuranceName: insuranceName});
        
        if(insurance) {
            console.log("This insurance already exixts")
            var redir = { redirect: "insurance_already_exists" };
            return res.json(redir);
        } else {
            // console.log("Coverage Name = " +coverageDetails[0].coverageName)
            // console.log("Coverage Amount = " +coverageDetails[0].coverageAmount)

            const newInsurance = new Insurance ({
                insuranceName: insuranceName,
                insuranceType: insuranceType,
                plans: {
                    planName: planName,
                    yearlyCost: yearlyCost,
                    age: maxAge,
                    coverages: coverageDetails,
                }
            });
            await newInsurance.save()
            var redir = { redirect: "new_insurance_added_successfully" };
            return res.json(redir);
        }

        // DO NOT REMOVE - prachiti - this takes care of multiple plans
        // const newInsurance = new Insurance ({
        //     insuranceName: insuranceName,
        //     insuranceType: insuranceType,
        //     plans: plans,
        //     // coverages: coverageDetails
        // });
    } catch (err) {
        res.send(err)
    }
});

// CUSTOMER
app.get('/getAvailableInsuranceTypes', async(req, res) => { //FindInsuranceForCustomer.js
    try {
        Insurance.distinct("insuranceType", (err,result) =>{
            if(err) {
                res.send(err)
            }
            res.send(result)
        })
    } catch(err) {
        console.log(err);
    }
});

app.post('/findInsurances', async(req, res) => { //FindInsuranceForCustomer.js
    try {
        const insuranceType = req.body.insuranceType
        const budget = req.body.budget
        const maxAge = req.body.maxAge

        console.log("Insurance Type = " +insuranceType)
        console.log("Budget = " +budget)
        console.log("Max Age = " +maxAge)
    } catch(err) {
        res.send(err)
    }
});

app.get('/print', async(req, res) => { //FindInsuranceForCustomer.js
    try {
        const insuranceType = req.body.insuranceType
        const insuranceName = req.body.insuranceName
        
        Insurance.find({insuranceType: 'Home'}, (err,result) =>{ //insuranceType: insuranceType
            if(err) {
                res.send(err)
            }
            res.send(result)
        })
    } catch(err) {
        console.log(err);
    }
});


// NOT USED
app.post('/insertInsurance', async(req, res) => {
    
    console.log("Inside server/index.js/app.post/insertInsurance")
    const insuranceType = req.body.insuranceType
    const insuranceName = req.body.insuranceName
    const cost = req.body.cost
    const age = req.body.age
    const offerings = req.body.benefits

    const newInsuranceCompany = await Insurance.findOne({insuranceName: insuranceName});
    console.log(newInsuranceCompany)
    if(newInsuranceCompany) {
        console.log("Insurance Company already exists!")
        var redir = { redirect: "NotGood_InsuranceCompanyExist" };
        return res.json(redir);
    } 
    else { 
        try {
            console.log("Insurance Company Name Already Exists!")
            
            console.log("Type = " +insuranceType)
            console.log("Name = " +insuranceName)
            console.log("Cost = " +cost)
            console.log("Age = " +age)
            const insuranceCompany = new Insurance({
                insuranceType: insuranceType,
                insuranceName: insuranceName,
                cost: cost,
                age: age,
                offerings: offerings,
            });
            
            await insuranceCompany.save()
   
            } catch(err) {
                console.log(err);
            }
        }
});

app.get('/testDisplay', async(req, res) => {
    const username = req.body.username
    const role = req.body.role
    Insurance.find({}, (err,result) =>{
        if(err) {
            res.send(err)
        }
        res.send(result)
    })
});

app.listen(portNum, () => {
    console.log("Yes, your port is running on port " +portNum);
});
