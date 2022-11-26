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
