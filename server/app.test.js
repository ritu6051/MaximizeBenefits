import { json } from 'express'
import request from 'supertest'
import app from './index.js'

describe("POST/login", () => {
    describe("given a username and password", () => {

        test("login company successfully", async() => {
            await request(app).post("/login").send({
                username: "pie123",
                password: "123"
            }).then(function (response) {
                expect(response.text).toBe("{\"redirect\":\"login_company_successfully\"}")
                // console.log("Value = " +JSON.stringify(response))
            })
            // expect(response).toEqual("login_customer_successfully")
            // expect(response.statusCode).toBe(200)
        })

        test("login customer successfully", async() => {
            await request(app).post("/login").send({
                username: "prachi",
                password: "123"
            }).then(function (response) {
                expect(response.text).toBe("{\"redirect\":\"login_customer_successfully\"}")
            })
        })

        test("incorrect password", async() => {
            await request(app).post("/login").send({
                username: "prachi",
                password: "1234"
            }).then(function (response) {
                expect(response.text).toBe("{\"redirect\":\"incorrect_password\"}")
            })
        })

        test("user does not exist", async() => {
            await request(app).post("/login").send({
                username: "pra1chi",
                password: "123"
            }).then(function (response) {
                expect(response.text).toBe("{\"redirect\":\"user_does_not_exist\"}")
            })
        })
    })
})

describe("POST /register", () => {
    describe("given a fullName, username, password, passwordAgain, role", () => {

        test("username already exists", async() => {
            await request(app).post("/register").send({
                fullName: "American Cross",
                username: "americancross",
                password: "1234",
                passwordAgain: "1234",
                role: "customer"
            }).then(function (response) {
                expect(response.text).toBe("{\"redirect\":\"username_already_exists\"}")
            })
        })

        // -------------- WORKS --------------
        // test("successfully register a customer", async() => {
        //     await request(app).post("/register").send({
        //         fullName: "Priyanka Chopra",
        //         username: "priyanka123",
        //         password: "123",
        //         passwordAgain: "123",
        //         role: "customer"
        //     }).then(function (response) {
        //         expect(response.text).toBe("{\"redirect\":\"login_customer_successfully\"}")
        //     })
        // })

        // -------------- WORKS --------------
        // test("successfully register a company", async() => {
        //     await request(app).post("/register").send({
        //         fullName: "National NJ Health",
        //         username: "nationalnjhealth",
        //         password: "123",
        //         passwordAgain: "123",
        //         role: "customer"
        //     }).then(function (response) {
        //         expect(response.text).toBe("{\"redirect\":\"login_company_successfully\"}")
        //     })
        // })

        test("passwords do not match", async() => {
            await request(app).post("/register").send({
                fullName: "National NJ Health",
                username: "nationalnjhealth",
                password: "123",
                passwordAgain: "1234",
                role: "customer"
            }).then(function (response) {
                expect(response.text).toBe("{\"redirect\":\"passwords_do_not_match\"}")
            })
        })
    })
})

describe("POST/insertInsurancePlan", () => {
    test("insurance company already exists", async() => {
        await request(app).post("/insertInsurancePlan").send({
            insuranceName: "AAA",
            insuranceType: "Auto",
            planName: "Silver",
            yearlyCost: "3000",
            maxAge: 100,
            coverageDetails: [{coverageName: "Tires Replacement", coverageAmount: "800"}, 
                                {coverageName: "Servicing", coverageAmount: "1500"}]
        }).then(function (response) {
            expect(response.text).toBe("{\"redirect\":\"insurance_already_exists\",\"insuranceType\":\"Auto\"}")
        })
    })

    // -------------- WORKS --------------
    // test("insurance company already exists", async() => {
    //     await request(app).post("/updateInsurancePlan").send({
    //         insuranceName: "Health For All",
    //         insuranceType: "Health",
    //         planName: "Silver",
    //         yearlyCost: "2000",
    //         maxAge: 100,
    //         coverageDetails: [{coverageName: "Dental", coverageAmount: "100"}, 
    //                             {coverageName: "Vision", coverageAmount: "85"}]
    //     }).then(function (response) {
    //         expect(response.text).toBe("{\"redirect\":\"new_insurance_added_successfully\"}")
    //     })
    // })    
})

describe("POST/updateInsurancePlan", () => {
    test("company benefits are updated", async() => {
        await request(app).post("/updateInsurancePlan").send({
            insuranceName: "pie123", //It takes username as input, finds full name in user db and sets that as insurance name
            insuranceType: "Health",
            planName: "Gold",
            yearlyCost: "900",
            maxAge: "50",
            coverageDetails: [{coverageName:"Dental", coverageAmount: "200"}]
        }).then(function (response) {
            expect(response.text).toBe("{\"redirect\":\"updated_company_insurance\"}")
        })
    })
})

// ------------ HAVEN'T CHECKED YET ------------
// describe("POST/deleteCustomer", () => {
//     test("customer was successfully deleted", async() => {
//         await request(app).post("/deleteCustomer").send({
//             username: "john.kennedy",
//             insuranceName: "American Cross",
//             planName: "Platinum",
//             yearlyCost: "1200",
//         }).then(function (response) {
//             expect(200)
//         })
//     })
// })

describe("POST/getOfferedInsurances", () => {
    test("company views plans offered by them", async() => {
        await request(app).post("/getOfferedInsurances").send({
            username: "AAA"
        }).then(function (response) {
            expect(response.text).toBe("[{\"plans\":[{\"planName\":\"Premium\",\"yearlyCost\":\"5000\",\"age\":\"100\",\"coverages\":[{\"coverageName\":\"Tires Replacement\",\"coverageAmount\":\"1000\"},{\"coverageName\":\"Servicing\",\"coverageAmount\":\"2000\"}]}],\"_id\":\"637fc80468dc4f7ded025891\",\"insuranceName\":\"AAA\",\"insuranceType\":\"Auto\",\"__v\":0}]")
        })
    })
})

// -------------- WORKS --------------
// describe("POST/addAdditionalPlansToInsurance", () => {
//     test("add more plans", async() => {
//         await request(app).post("/addAdditionalPlansToInsurance").send({
//             username: "AAA",
//             planName: "Silver",
//             yearlyCost: "2500",
//             age: "100",
//             coverages: [{coverageName:"Dental", coverageAmount: "200"}]
//         }).then(function (response) {
//             expect(response.text).toBe("{\"redirect\":\"added_additional_plan_to_insurance\"}")
//         })
//     })
// })

describe("POST/deleteOfferedInsurance", () => {
    test("delete offered insurance", async() => {
        await request(app).post("/deleteOfferedInsurance").send({
            username: "americancross",
            planName: "Silver",
        }).then(function (response) {
            expect(response.text).toBe("{\"redirect\":\"deleted_offered_insurance\"}")
        })
    })
})

// ------------------------------------------------------------- CUSTOMER ------------------------------------------------------------- 

describe("POST/deleteMyInsurance", () => {
    test("delete my insurance", async() => {
        await request(app).post("/deleteMyInsurance").send({
            username: "prachi",
            insuranceName: "Pie"
        }).then(function (response) {
            expect(response.text).toBe("{\"redirect\":\"successfully_deleted_insurance_by_customer\"}")
        })
    })
})

// -------------- WORKS --------------
// describe("POST/addInsuranceToUser", () => {
//     test("add insurance for customer", async() => {
//         await request(app).post("/addInsuranceToUser").send({
//             username: "prachitiatigre",
//             insuranceName: "American Cross",
//             insuranceType: "Health",
//             planName: "Gold",
//             yearlyCost: "2000",
//             coverages: [{coverageName:"Physical", coverageAmount: "100"}],
//         }).then(function (response) {
//             expect(response.text).toBe("{\"redirect\":\"added_insurance_to_user\"}")
//         })
//     })
// })

describe("GET/getAvailableInsuranceTypes", () => {
    test("get available insurance types from database", async() => {
        await request(app).get("/getAvailableInsuranceTypes")
        .then(function (response) {
            expect(response.text).toBe("[\"Auto\",\"Health\"]")
        })
    })
})

describe("POST/testFilter", () => {
    test("test filter", async() => {
        await request(app).post("/testFilter").send({
            insuranceType: "Auto",
        }).then(function (response) {
            expect(response.text).toBe("[{\"plans\":[{\"planName\":\"Premium\",\"yearlyCost\":\"5000\",\"age\":\"100\",\"coverages\":[{\"coverageName\":\"Tires Replacement\",\"coverageAmount\":\"1000\"},{\"coverageName\":\"Servicing\",\"coverageAmount\":\"2000\"}]}],\"_id\":\"637fc80468dc4f7ded025891\",\"insuranceName\":\"AAA\",\"insuranceType\":\"Auto\",\"__v\":0}]")
        })
    })
})

describe("POST /getUserInsurances", () => {
    test("customer benefits are updated", async() => {
        await request(app).post("/getUserInsurances").send({
            username: "prachitiatigre"
        }).then(function (response) {
            expect(response.text).toBe("{\"enrolledIn\":[{\"insuranceName\":\"American Cross\",\"insuranceType\":\"Health\",\"planName\":\"Gold\",\"yearlyCost\":\"2000\",\"coverages\":[{\"coverageName\":\"Physical\",\"coverageAmount\":\"100\"}]},{\"insuranceName\":\"American Cross\",\"insuranceType\":\"Health\",\"planName\":\"Gold\",\"yearlyCost\":\"2000\",\"coverages\":[{\"coverageName\":\"Physical\",\"coverageAmount\":\"100\"}]}],\"_id\":\"63699c0cef98ffed67dacf43\",\"fullName\":\"Prachiti Atigre\",\"username\":\"prachitiatigre\",\"password\":\"123\",\"role\":\"customer\",\"__v\":0}")
        })
    })
})