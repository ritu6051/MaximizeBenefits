import request from 'supertest'
import app from './index.js'

describe("POST /login", () => {
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

// describe("POST /register", () => {
//     describe("given a fullName, username, password, passwordAgain, role", () => {
//         test("successfully register a customer", async() => {
//             await request(app).post("/register").send({
//                 fullName: "Priyanka Chopra",
//                 username: "priyanka123",
//                 password: "123",
//                 passwordAgain: "123",
//                 role: "customer"
//             }).then(function (response) {
//                 expect(response.text).toBe("{\"redirect\":\"login_customer_successfully\"}")
//             })
//         })
//     })
// })

describe("POST /insertInsurancePlan", () => {
    test("insurance company already exists", async() => {
        await request(app).post("/insertInsurancePlan").send({
            insuranceName: "AAA"
        }).then(function (response) {
            expect(response.text).toBe("{\"redirect\":\"insurance_already_exists\"}")
        })
    })

    // test("insurance company can be added", async() => {
    //     await request(app).post("/insertInsurancePlan").send({
    //         insuranceName: "Geico",
    //         insuranceType: "Auto",
    //         plans:[{planName: "Silver", yearlyCost: "1000", age: "100", coverages: [{coverageName: "Accident", coverageAmount: "1000"}]}]
    //     }).then(function (response) {
    //         expect(response.text).toBe("{\"redirect\":\"new_insurance_added_successfully\"}")
    //     })
    // })
})

// describe("POST /updateInsurancePlan", () => {
//     test("customer benefits are updated", async() => {
//         await request(app).post("/updateInsurancePlan").send({
//             insuranceName: "American Cross",
//             insuranceType: "Health",
//             planName: "Gold",
//             yearlyCost: "900",
//             maxAge: "50",
//             coverageDetails: [{coverageName:"Dental", coverageAmount: 200}]
//         }).then(function (response) {
//             expect(response.text).toBe("{\"redirect\":\"insurance_already_exists\"}")
//         })
//     })

        // test("customer benefits are updated", async() => {
        //     await request(app).post("/updateInsurancePlan").send({
        //         insuranceName: "American Cross",
        //         insuranceType: "Health",
        //         planName: "Gold",
        //         yearlyCost: "900",
        //         maxAge: "50",
        //         coverageDetails: [{coverageName:"Dental", coverageAmount: 200}]
        //     }).then(function (response) {
        //         expect(response.text).toBe("{\"redirect\":\"updated_company_insurance\"}")
        //     })
        // })
// })

describe("POST /deleteCustomer", () => {
    test("customer was successfully deleted", async() => {
        await request(app).post("/deleteCustomer").send({
            username: "john.kennedy",
            insuranceName: "American Cross",
            planName: "Platinum",
            yearlyCost: "1200",
        }).then(function (response) {
            expect(200)
        })
    })
})

describe("POST /getOfferedInsurances", () => {
    test("view plans offered", async() => {
        await request(app).post("/getOfferedInsurances").send({
            username: "AAA"
        }).then(function (response) {
            expect(200)
        })
    })
})

// describe("POST /deleteMyInsurance", () => {
//     test("delete my insurance", async() => {
//         await request(app).post("/deleteMyInsurance").send({
//             username: "john.kennedy",
//             insuranceName: "American Cross"
//         }).then(function (response) {
//             expect(response.text).toBe("{\"redirect\":\"added_insurance_to_user\"}")
//         })
//     })
// })

// describe("POST /addInsuranceToUser", () => {
//     test("add insurance for customer", async() => {
//         await request(app).post("/addInsuranceToUser").send({
//             username: "john.kennedy",
//             insuranceName: "American Cross",
//             insuranceType: "Health",
//             planName: "Platinum",
//             yearlyCost: "1200",
//             coverages: selectedCoverages,
//             plans: plans
//         }).then(function (response) {
//             expect(response.text).toBe("{\"redirect\":\"updated_company_insurance\"}")
//         })
//     })
// })

// describe("GET /getAvailableInsuranceTypes", () => {
//     test("select insurance type", async() => {
//         await request(app).get("/getAvailableInsuranceTypes").then(function (response) {
//             expect(response)
//         })
//     })
// })

describe("POST /testFilter", () => {
    test("test filter", async() => {
        await request(app).post("/testFilter").send({
            insuranceType: "Health",
            budget: "1200",
            maxAge: "50"
        }).then(function (response) {
            expect(200)
        })
    })
})

describe("POST /getUserInsurances", () => {
    test("customer benefits are updated", async() => {
        await request(app).post("/getUserInsurances").send({
            username: "john.kennedy"
        }).then(function (response) {
            expect(200)
        })
    })
})