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

mongoose.connect(
    'mongodb+srv://cs431-thepurs:thepurs123@cluster0.u8zkruf.mongodb.net/MaximizeBenefits?retryWrites=true&w=majority', 
    { useNewUrlParser: true, }
);

// ------------------------------------------------ BOTH ROLES ------------------------------------------------ 

/*
 *  Called in: Login.js
 *  Purpose: Checks whether the user exists; if it does, checks if the password matches; if it does,
 *  redirects to the appropriate pages
 *  Params: username, password
*/
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

// ------------------------------------------------ COMPANY ------------------------------------------------

// AddBenefits.js
app.post('/insertInsurancePlan', async(req, res) => { 
    try {
        const insuranceName = req.body.insuranceName
        const insuranceType = req.body.insuranceType
        const planName = req.body.planName
        const yearlyCost = req.body.yearlyCost
        const maxAge = req.body.maxAge
        const coverageDetails = req.body.coverageDetails

        const plans = [{planName: planName, yearlyCost: yearlyCost, age: maxAge, coverages: coverageDetails}]
        
        const user = await User.findOne({username: insuranceName})
        const insurance = await Insurance.findOne({insuranceName: user.fullName});

        if(insurance) {
            console.log("This insurance already exixts")
            var redir = { redirect: "insurance_already_exists" , insuranceType: insuranceType};
            return res.json(redir);
        } else {
            console.log("New insurance added successfully")
            console.log(insuranceName)
            console.log(insuranceType)
            console.log(JSON.stringify(plans))
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

        const plans = [{planName: planName, yearlyCost: yearlyCost, age: maxAge, coverages: coverageDetails}]
        
        const user = await User.findOne({username: insuranceName})
        console.log(user)

        Insurance.updateOne(
            {insuranceName: user.fullName}, 
            {$set:{insuranceType: insuranceType, plans: plans}}, 
            (err, result) => {
                if(err) {
                    res.send(err)
                }
                console.log("Insurance plan successfully updated")
                var redir = { redirect: "updated_company_insurance" };
                return res.json(redir);
            }
        )
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
        
        User.updateOne(
            {username: username}, 
            {$set:{plans: plans}}, 
            (err, result) => {
                if(err) {
                    res.send(err)
                }
                res.send(result)
            }
        )
    } catch (err) {
        console.log(err)
    }
});

app.post('/getOfferedInsurances', async(req, res) => { 
    try {
        const username = req.body.username
        const user = await User.findOne({username: username});
        
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
        const username = req.body.username
        const planName = req.body.planName
        const yearlyCost = req.body.yearlyCost
        const age = req.body.maxAge
        const coverages = req.body.coverageDetails

        const user = await User.findOne({username: username});
        
        Insurance.updateOne(
            {insuranceName: user.fullName}, 
            {$push: {plans: {planName: planName, yearlyCost: yearlyCost, age: age, coverages: coverages}}}, 
            (err, result) => {
                if(err) {
                    res.send(err)
                }
                var redir = { redirect: "added_additional_plan_to_insurance" };
                return res.json(redir);
            }
        )
    } catch (err) {
        console.log(err)
    }
});

app.post('/deleteOfferedInsurance', async(req, res) => {
    const username = req.body.username
    const planName = req.body.planName

    const user = await User.findOne({username: username});

    Insurance.updateOne(
        {insuranceName: user.fullName},
        {$pull: {plans: {planName: planName}}}, 
        (err, result) => {
            if(err) {
                res.send(err)
            }
            var redir = { redirect: "deleted_offered_insurance" };
            return res.json(redir);
        }
    )
});

// ------------------------------------------------ CUSTOMER ------------------------------------------------ 

/*
 *  Called in: FindInsuranceForCustomer.js
 *  Purpose: Gets the list of available insurance types from the database
 *  Params: none
*/
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

/*
 *  Called in: FindInsuranceForCustomer.js
 *  Purpose: Gets the list of insurances that the user is enrolled in
 *  Params: username
*/
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

/*
 *  Called in: FindInsuranceForCustomer.js
 *  Purpose: Gets the list of insurances that fits the criteria entered by the user
 *  Params: insuranceType, budget, age
*/
app.post('/getInsurancesThatFitUserCriteria', async(req, res) => {
    try {
        const insuranceType = req.body.insuranceType
        const budget = req.body.budget
        const maxAge = req.body.maxAge
        
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

/*
 *  Called in: FindInsuranceForCustomer.js
 *  Purpose: Gets the list of insurance types that the user is enrolled in
 *  Params: username
*/
app.post('/getEnrolledInsuranceTypes', async(req, res) => { 
    try {
        const username = req.body.username
        const checkUser = await User.findOne({username: username});
        if(checkUser) {
            res.send(checkUser.enrolledIn.insuranceType)
        }
    } catch(err) {
        console.log(err);
    }
});

/*
 *  Called in: DisplayFilteredInsurances.js
 *  Purpose: Checks whether the user is already enrolled in that insurance
 *      If not, adds the insurance selected by the user
 *      If yes, asks if the user wants to upgrade or degrade
 *  Params: username, insuranceName, insuranceType, planName, yearlyCost, coverages
*/
app.post('/addInsuranceToUser', async(req, res) => {
    try {
        const username = req.body.username
        const insuranceName = req.body.insuranceName
        const insuranceType = req.body.insuranceType
        const planName = req.body.planName
        const yearlyCost = req.body.yearlyCost
        const coverages = req.body.coverages
        
        const plans = [{insuranceName: insuranceName, planName: planName, yearlyCost: yearlyCost, coverages: coverages}]
        
        // console.log("Here " +plans[0].insuranceName)
        // const checkUser = await User.findOne({username: username})
        
        User.updateOne(
            {username: username}, 
            {$push: {enrolledIn: {insuranceName: insuranceName, insuranceType: insuranceType, planName: planName, yearlyCost: yearlyCost, coverages: coverages}}}, 
            (err, result) => {
                if(err) {
                    res.send(err)
                }
                var redir = { redirect: "added_insurance_to_user" };
                return res.json(redir);
            }
        )
    } catch (err) {
        console.log(err)
    }
});

/*
 *  Called in: UpgradeInsurance.js
 *  Purpose: If the user is already enrolled in that type of insurance, they can upgrade
 *          to another insurance. This takes care of deleting the one they are already enrolled
 *          in and adding the new one
 *  Params: username, insuranceName, insuranceType, planName, yearlyCost, coverages
*/
app.post('/upgradeInsuranceToUser', async(req, res) => {
    try {
        const username = req.body.username
        const insuranceName = req.body.insuranceName
        const insuranceType = req.body.insuranceType
        const planName = req.body.planName
        const yearlyCost = req.body.yearlyCost
        const coverages = req.body.coverages
        
        const plans = [{insuranceName: insuranceName, planName: planName, yearlyCost: yearlyCost, coverages: coverages}]
        
        // console.log("Here " +plans[0].insuranceName)
        const checkUser = await User.findOne({username: username, "enrolledIn.insuranceType": "Health"})
        console.log(checkUser.enrolledIn)

        User.updateOne(
            {username: username},
            {$pull: {enrolledIn: {insuranceType: insuranceType}}},
        )

        User.updateOne(
            {username: username}, 
            {$push: {enrolledIn: {insuranceName: insuranceName, insuranceType: insuranceType, planName: planName, yearlyCost: yearlyCost, coverages: coverages}}}, 
            (err, result) => {
                if(err) {
                    res.send(err)
                }
                var redir = { redirect: "updated_insurance_to_user" };
                return res.json(redir);
            }
        )
    } catch (err) {
        console.log(err)
    }
});

/*
 *  Called in: DeleteMyInsurance.js
 *  Purpose: De-enroll the user from that insurance
 *  Params: username, insuranceName
*/
app.post('/deleteMyInsurance', async(req, res) => {
    try {
        const username = req.body.username
        const insuranceName = req.body.insuranceName

        User.updateOne(
            {username: username},
            {$pull: {enrolledIn: {insuranceName: insuranceName}}}, 
            (err, result) => {
                if(err) {
                    res.send(err)
                }
                var redir = { redirect: "successfully_deleted_insurance_by_customer" };
                return res.json(redir);
            }
        )
    } catch (err) {
        console.log(err)
    }
});

app.listen(portNum, () => {
    console.log("Yes, your port is running on port " +portNum);
});

export default app;