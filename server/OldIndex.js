// ------------------------------------------------------------- NOT USED -------------------------------------------------------------

app.post('/findInsurances', async(req, res) => { //FindInsuranceForCustomer.js
    try {
        const insuranceType = req.body.insuranceType
        const budget = req.body.budget
        const maxAge = req.body.maxAge

        res.send(insuranceType)
    } catch(err) {
        res.send(err)
    }
});

app.get('/print', async(req, res) => { //FindInsuranceForCustomer.js
    try {
        const insuranceType = req.body.insuranceType
        const insuranceName = req.body.insuranceName
        
        Insurance.find({insuranceType: 'Home'}, (err,result) =>{
            if(err) {
                res.send(err)
            }
            res.send(result)
        })
    } catch(err) {
        console.log(err);
    }
});

app.post('/insertInsurance', async(req, res) => {
    
    console.log("Inside server/index.js/app.post/insertInsurance")
    const insuranceType = req.body.insuranceType
    const insuranceName = req.body.insuranceName
    const cost = req.body.cost
    const age = req.body.age
    const offerings = req.body.benefits

    const newInsuranceCompany = await Insurance.findOne({insuranceName: insuranceName});
    
    // if(newInsuranceCompany) {
    //     console.log("Insurance Company already exists!")
    //     var redir = { redirect: "NotGood_InsuranceCompanyExist" };
    //     return res.json(redir);
    // } 
    // else { 
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
        // }
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

app.post('/deleteMyInsurance', async(req, res) => {
    try {
        const username = req.body.username
        const insuranceName = req.body.insuranceName
        const planName = req.body.planName
        const yearlyCost =  req.body.yearlyCost
        const plans = [{insuranceName: insuranceName, planName: planName, yearlyCost: yearlyCost}]
        console.log("Inside index.js/deleteMyInsurance")
        console.log("Username = " +username)
        User.updateOne({username: username}, {$set:{enrolledIn: plans}}, (err, result) => {
            if(err) {
                res.send(err)
            }
            res.send(result)
        })
        // console.log(user)
    } catch (err) {
        console.log(err)
    }
});

app.post('/testFilter', async(req, res) => {
    try {
        const insuranceType = req.body.insuranceType
        const budget = req.body.budget
        const maxAge = req.body.maxAge
        // yearlyCost:{$lt:yearlyCost}
        console.log("Insurance Type = " +insuranceType)
        Insurance.find({insuranceType: insuranceType}, (err,result) =>{ 
            if(err) {
                res.send(err)
            }
            else {
                res.send(result)  
            }
        })
    } catch(err) {
        console.log(err);
    }
});