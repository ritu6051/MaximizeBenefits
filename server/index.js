import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import User from "./models/User.js"
import Insurance from "./models/Insurance.js"
// const express = require("express");
// const mongoose = require('mongoose');
// const cors = require('cors');
const app = express();
const portNum = 3001
// const User = require("./models/User");
// const Insurance = require("./models/Insurance");

app.use(express.json());
app.use(cors());

const insuranceType1 = ""

mongoose.connect(
    'mongodb+srv://cs431-thepurs:thepurs123@cluster0.u8zkruf.mongodb.net/MaximizeBenefits?retryWrites=true&w=majority', 
    { useNewUrlParser: true, }
);

// ------------------------------------------------------------- BOTH ROLES ------------------------------------------------------------- 

// LoginForm.js
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
                    console.log(redir)
                    return res.json(redir);
                    // res.sendStatus(200)
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

// RegisterForm.js
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
            const enrolledIn = [{insuranceName: "", planName: ""}]
            const newUser = new User ({
                fullName: fullName, 
                username: username, 
                password: password,
                role: role,
                // enrolledIn: {
                //     insuranceName: " ",
                //     plans: { 
                //         planName: " ",
                //         yearlyCost: " "
                //     }
                // }
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

// ------------------------------------------------------------- COMPANY ------------------------------------------------------------- 

// AddBenefits.js
app.post('/insertInsurancePlan', async(req, res) => { 
    try {
        const insuranceName = req.body.insuranceName
        const insuranceType = req.body.insuranceType
        const planName = req.body.planName
        const yearlyCost = req.body.yearlyCost
        const maxAge = req.body.maxAge
        const coverageDetails = req.body.coverageDetails
        console.log("Insurance Name = " +insuranceName)

        const plans = [{planName: planName, yearlyCost: yearlyCost, age: maxAge, coverages: coverageDetails}]
        const insurance = await Insurance.findOne({insuranceName: insuranceName});
        
        const user = await User.findOne({username: insuranceName})
        
        if(insurance) {
            console.log("This insurance already exixts")
            var redir = { redirect: "insurance_already_exists" };
            return res.json(redir);
        } else {
            const newInsurance = new Insurance ({
                insuranceName: user.fullName,
                insuranceType: insuranceType,
                plans: plans
            });
            await newInsurance.save()
            var redir = { redirect: "new_insurance_added_successfully" };
            return res.json(redir);
        }
    } catch (err) {
        res.send(err)
    }
});

app.post('/updateInsurancePlan', async(req, res) => { 
    try {
        const insuranceName = req.body.insuranceName
        const insuranceType = req.body.insuranceType
        const planName = req.body.planName
        const yearlyCost = req.body.yearlyCost
        const maxAge = req.body.maxAge
        const coverageDetails = req.body.coverageDetails
        console.log("Insurance Name = " +insuranceName)
        console.log("Insurance Type = " +insuranceType)
        console.log("Plan Name = " +planName)
        console.log("Yearly Cost = " +yearlyCost)
        console.log("Age = " +maxAge)

        const plans = [{planName: planName, yearlyCost: yearlyCost, age: maxAge, coverages: coverageDetails}]
        
        const user = await User.findOne({username: insuranceName})
        const insurance = await Insurance.findOne({insuranceName: user.fullName});
        console.log(user)

        Insurance.updateOne({insuranceName: user.fullName}, {$set:{insuranceType: insuranceType, plans: plans}}, (err, result) => {
            if(err) {
                res.send(err)
            }
            var redir = { redirect: "updated_company_insurance" };
            return res.json(redir);
        })
    } catch (err) {
        res.send(err)
    }
});

// DeleteCustomer.js
app.post('/deleteCustomer', async(req, res) => {
    try {
        const username = req.body.username
        const insuranceName = req.body.insuranceName
        const insuranceType = req.body.insuranceType
        const planName = req.body.planName
        const yearlyCost =  req.body.yearlyCost
        const plans = [{insuranceName: insuranceName, insuranceType: insuranceType, planName: planName, yearlyCost: yearlyCost}]
        
        // User.updateOne({username: username}, {$set:{enrolledIn: plans}}, (err, result) => {

        User.updateOne({username: username}, {$set:{plans: plans}}, (err, result) => {
        
            if(err) {
                res.send(err)
            }
            res.send(result)
        })

    } catch (err) {
    }
});

app.post('/getOfferedInsurances', async(req, res) => { 
    try {
        const username = req.body.username
        // console.log("User = " +username)

        const user = await User.findOne({username: username});
        console.log(user.fullName)

        Insurance.find({insuranceName: user.fullName}, (err, result) => {
            if(err) {
                console.log(err)
                res.send(err)
            }
            else {
                res.send(result)  
            }
        });
    } catch(err) {
        console.log(err);
    }
});

app.post('/addAdditionalPlansToInsurance', async(req, res) => {
    try {
        const insuranceName = req.body.insuranceName
        const planName = req.body.planName
        const yearlyCost = req.body.yearlyCost
        const age = req.body.maxAge
        const coverages = req.body.coverageDetails

        const plans = [{insuranceName: insuranceName, planName: planName, yearlyCost: yearlyCost, age: age, coverages: coverages}]
        // console.log(coverages)
        // Insurance.updateOne({insuranceName: insuranceName}, {$push: {plans: {insuranceName: insuranceName, insuranceType: insuranceType, planName: planName, yearlyCost: yearlyCost, coverages: coverages}}}, (err, result) => {
        Insurance.updateOne({insuranceName: insuranceName}, {$push: {plans: {planName: planName, yearlyCost: yearlyCost, age: age, coverages: coverages}}}, (err, result) => {
            if(err) {
                res.send(err)
            }
            var redir = { redirect: "added_insurance_to_user" };
            return res.json(redir);
        })
    } catch (err) {
        console.log(err)
    }
});

// ------------------------------------------------------------- CUSTOMER ------------------------------------------------------------- 

// DeleteMyInsurance.js
app.post('/deleteMyInsurance', async(req, res) => {
    const username = req.body.username
    const insuranceName = req.body.insuranceName

    User.updateOne(
        {username: username},
        {$pull: {enrolledIn: {insuranceName: insuranceName}}}, (err, result) => {
        if(err) {
            res.send(err)
        }
        res.send(result)
    })
    
});

// DisplayFilteredInsurances.js
app.post('/addInsuranceToUser', async(req, res) => {
    try {
        const username = req.body.username
        const insuranceName = req.body.insuranceName
        const insuranceType = req.body.insuranceType
        const planName = req.body.planName
        const yearlyCost = req.body.yearlyCost
        const coverages = req.body.coverages
        // const plans = req.body.plans
        
        const plans = [{insuranceName: insuranceName, planName: planName, yearlyCost: yearlyCost, coverages: coverages}]
        
        // const insurance = await Insurance.findOne({insuranceName: insuranceName});
        // const user = await User.findOne({username: insuranceName})
        
        console.log("Here " +plans[0].insuranceName)
        User.updateOne({username: username}, {$push: {plans: {insuranceName: insuranceName, insuranceType: insuranceType, planName: planName, yearlyCost: yearlyCost, coverages: coverages}}}, (err, result) => {
            if(err) {
                res.send(err)
            }
            var redir = { redirect: "added_insurance_to_user" };
            return res.json(redir);
        })
    } catch (err) {
        console.log(err)
    }
});

// FindInsuranceForCustomer.js
app.get('/getAvailableInsuranceTypes', async(req, res) => { 
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

// FindInsuranceForCustomer.js
app.post('/testFilter', async(req, res) => {
    try {
        const insuranceType = req.body.insuranceType
        const budget = req.body.budget
        const maxAge = req.body.maxAge
        // Insurance.find({insuranceType: insuranceType}, {plans: {$elemMatch: {yearlyCost: {$lte:budget}}}}, (err, result) => {
        Insurance.find({insuranceType: insuranceType}, (err, result) => {
            if(err) {
                console.log(err)
                res.send(err)
            }
            else {
                res.send(result)  
            }
        });
    } catch(err) {
        console.log(err);
    }
});

// FindInsuranceForCustomer.js
// Display list of insurances that the user is enrolled in
app.post('/getUserInsurances', async(req, res) => {
    const username = req.body.username
    User.findOne({username: username}, (err, result) => {
        if(err) {
            console.log(err)
            res.send(err)
        }
        else {
            res.send(result) 
        }
    });
});

app.listen(portNum, () => {
    console.log("Yes, your port is running on port " +portNum);
});

export default app;