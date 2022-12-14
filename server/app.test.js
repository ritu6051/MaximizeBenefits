import request from 'supertest'
import app from './index.js'

/**
 * Checks if a customer and company can successfully login, if the password entered in correct, and if the user exists
 */
describe("POST/login", () => {
    describe("given a username and password", () => {
        test("login customer successfully", async() => {
            await request(app).post("/login").send({
                username: "prachi",
                password: "123"
            }).then(function (response) {
                expect(response.text).toBe("{\"redirect\":\"login_customer_successfully\"}")
            })
        })

        test("login company successfully", async() => {
            await request(app).post("/login").send({
                username: "aetna",
                password: "123"
            }).then(function (response) {
                expect(response.text).toBe("{\"redirect\":\"login_company_successfully\"}")
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

/**
 * Tests for all cases regarding register
 *  - Username already exists
 *  - Register a customer successfully
 *  - Register a company successfully
 *  - Password entered again does not match 
 */
describe("POST/register", () => {
    describe("given a fullName, username, password, password again, role", () => {
        test("username already exists", async() => {
            await request(app).post("/register").send({
                fullName: "Aetna",
                username: "aetna",
                password: "123",
                passwordAgain: "123",
                role: "customer"
            }).then(function (response) {
                expect(response.text).toBe("{\"redirect\":\"username_already_exists\"}")
            })
        })

        test("successfully register a customer", async() => {
            await request(app).post("/register").send({
                fullName: "Test Add Customer",
                username: "testaddcustomer",
                password: "123",
                passwordAgain: "123",
                role: "customer"
            }).then(function (response) {
                expect(response.text).toBe("{\"redirect\":\"login_customer_successfully\"}")
            })
        })

        test("successfully register a company", async() => {
            await request(app).post("/register").send({
                fullName: "Test Add Company",
                username: "testaddcompany",
                password: "123",
                passwordAgain: "123",
                role: "customer"
            }).then(function (response) {
                expect(response.text).toBe("{\"redirect\":\"login_company_successfully\"}")
            })
        })

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

// ------------------------------------------------ COMPANY ------------------------------------------------

/**
 * Checks if a company can successfully view all of the insurances that they offer
 */
describe("POST/getOfferedInsurances", () => {
    describe("given the company username", () => {
        test("company views plans offered by them", async() => {
            await request(app).post("/getOfferedInsurances").send({
                username: "libertymutual"
            }).then(function (response) {
                expect(response.text).toBe("[{\"_id\":\"63977056dbde65fd2884daad\",\"insuranceName\":\"Liberty Mutual\",\"insuranceType\":\"Health\",\"plans\":[{\"planName\":\"Gold\",\"yearlyCost\":\"1000\",\"age\":\"100\",\"coverages\":[{\"coverageName\":\"Physical\",\"coverageAmount\":\"100\"}]}],\"__v\":0}]")
            })
        })
    })
})

/**
 * Checks if a company can succesfully insert an insurance plan
 */
describe("POST/insertInsurancePlan", () => {
    describe("given an insurance name, insurance type, plan name, yearly cost, max age and coverage details that include the coverage name and amount", () => {
        test("insurance already exists", async() => {
            await request(app).post("/insertInsurancePlan").send({
                insuranceName: "AAA",
                insuranceType: "Auto",
                planName: "Platinum",
                yearlyCost: "5000",
                maxAge: 800,
                coverageDetails: [{coverageName: "Tires Replacement", coverageAmount: "1000"}]
            }).then(function (response) {
                expect(response.text).toBe("{\"redirect\":\"insurance_already_exists\",\"insuranceType\":\"Auto\"}")
            })
        })

        test("new insurance added successfully", async() => {
            await request(app).post("/insertInsurancePlan").send({
                insuranceName: "NJFamilyCare",
                insuranceType: "Health",
                planName: "Silver",
                yearlyCost: "2000",
                maxAge: 100,
                coverageDetails: [{coverageName: "Dental", coverageAmount: "100"}, 
                                    {coverageName: "Vision", coverageAmount: "85"}]
            }).then(function (response) {
                expect(response.text).toBe("{\"redirect\":\"new_insurance_added_successfully\"}")
            })
        })    
    })
})

/**
 * Checks if a company can update their insurance plans successfully
 */
describe("POST/updateInsurancePlan", () => {
    describe("given the company username, insurance type, plan name, yearly cost, max age and coverage details that include the coverage name and amount", () => {
        test("company benefits are updated", async() => {
            await request(app).post("/updateInsurancePlan").send({
                insuranceName: "allstate", //It takes username as input, finds full name in user db and sets that as insurance name
                planName: "Silver",
                yearlyCost: "4000",
                maxAge: "100",
                coverageDetails: [{coverageName: "Roof", coverageAmount: "800"}],
                originalPlanName: "Premium"
            }).then(function (response) {
                expect(response.text).toBe("{\"redirect\":\"updated_company_insurance\"}")
            })
        })
    })
})

/**
 * Check if company can successfully delete one of their insurance plans
 */
describe("POST/deleteOfferedInsurance", () => {
    describe("given the company username and plan name", () => {
        test("delete offered insurance", async() => {
            await request(app).post("/deleteOfferedInsurance").send({
                username: "health4all",
                planName: "Gold",
            }).then(function (response) {
                expect(response.text).toBe("{\"redirect\":\"deleted_offered_insurance\"}")
            })
        })
    })
})

/**
 * Checks if the insurance company can successfully unenroll their customer from a plan. 
 * Also checks whether a customer is enrolled in an insurance offered by them
 */
describe("POST/deleteCustomer", () => {
    test("customer was successfully deleted", async() => {
        await request(app).post("/deleteCustomer").send({
            insuranceCompanyUsername: "joeMedicare",
            customerUsername: "arigrande",
        }).then(function (response) {
            expect(response.text).toBe("{\"redirect\":\"successfully_unenrolled_customer\"}")
        })
    })

    test("customer not found", async() => {
        await request(app).post("/deleteCustomer").send({
            insuranceCompanyUsername: "aetna",
            customerUsername: "prachi",
        }).then(function (response) {
            expect(response.text).toBe("{\"redirect\":\"no_customer_found\"}")
        })
    })
})

/**
 * Checks if insurance company can successfully add additional plans to an existing insurance
 */
describe("POST/addAdditionalPlansToInsurance", () => {
    describe("given the company username, plan name, yearly cost, age and coverage details that include the coverage name and amount", () => {
        test("add more plans", async() => {
            await request(app).post("/addAdditionalPlansToInsurance").send({
                username: "libertymutual",
                planName: "Premium Best",
                yearlyCost: "4000",
                age: "100",
                coverages: [{coverageName:"Physical", coverageAmount: "200"}, {coverageName:"Dental", coverageAmount: "500"}]
            }).then(function (response) {
                expect(response.text).toBe("{\"redirect\":\"added_additional_plan_to_insurance\"}")
            })
        })
    })
})

// ------------------------------------------------------------- CUSTOMER ------------------------------------------------------------- 

/**
 * Checks if it correctly gets all the available insurance types from the database
 */
describe("GET/getAvailableInsuranceTypes", () => {
    test("get available insurance types from database", async() => {
        await request(app).get("/getAvailableInsuranceTypes")
        .then(function (response) {
            expect(response.text).toBe("[\"Auto\",\"Health\",\"Home\"]")
        })
    })
})

/**
 * Checks if a customer is able to successfully view all of their current insurances
 */
describe("POST/getUserInsurances", () => {
    describe("given the customer's username", () => {
        test("customer benefits are updated", async() => {
            await request(app).post("/getUserInsurances").send({
                username: "ron123"
            }).then(function (response) {
                expect(response.text).toBe("{\"_id\":\"636ef3fa3daf45f59d56b744\",\"fullName\":\"ron\",\"username\":\"ron123\",\"password\":\"paul123\",\"role\":\"customer\",\"__v\":0,\"enrolledIn\":[{\"insuranceName\":\"Joe Medicare\",\"insuranceType\":\"Health\",\"planName\":\"Platinum\",\"yearlyCost\":\"4000\",\"coverages\":[{\"coverageName\":\"Physical\",\"coverageAmount\":\"150\"},{\"coverageName\":\"Dental\",\"coverageAmount\":\"120\"},{\"coverageName\":\"Vision\",\"coverageAmount\":\"135\"}]}]}")
            })
        })
    })
})

/**
 * Checks if the user is able to successfully enroll in an insurance
 */
describe("POST/addInsuranceToUser", () => {
    describe("given the customer's username, insurance name, insurance type, plan name, yearly cost and coverage details", () => {
        test("add insurance for customer", async() => {
            await request(app).post("/addInsuranceToUser").send({
                username: "MillerMatt",
                insuranceName: "Joe Medicare",
                insuranceType: "Health",
                planName: "Basic",
                yearlyCost: "1000",
                coverages: [{coverageName:"Physical", coverageAmount: "100"}],
            }).then(function (response) {
                expect(response.text).toBe("{\"redirect\":\"added_insurance_to_user\"}")
            })
        })
    })
})

/**
 * Checks if the user is able to successfully upgrade their insurance
 */
describe("POST/upgradeInsuranceToUser", () => {
    describe("given the customer's username and insurance insurance details", () => {
        test("upgrade their insurance", async() => {
            await request(app).post("/upgradeInsuranceToUser").send({
                username: "ReshAmin",
                insuranceName: "Joe Medicare",
                insuranceType: "Health",
                planName: "Basic",
                yearlyCost: "1000",
                coverages: [{coverageName:"Physical", coverageAmount: "100"}],
            }).then(function (response) {
                expect(response.text).toBe("{\"redirect\":\"updated_insurance_to_user\"}")
            })
        })
    })
})

/**
 * Checks if user is able to successfuly unenroll from an insurance
 */
describe("POST/deleteMyInsurance", () => {
    describe("given the customer's username and insurance name that they are enrolled in", () => {
        test("delete my insurance", async() => {
            await request(app).post("/deleteMyInsurance").send({
                username: "patigre",
                insuranceName: "Joe Medicare"
            }).then(function (response) {
                expect(response.text).toBe("{\"redirect\":\"successfully_deleted_insurance_by_customer\"}")
            })
        })
    })
})

