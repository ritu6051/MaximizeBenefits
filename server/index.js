const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

const Vehicle = require("./models/Vehicle");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://cs431-thepurs:thepurs123@cluster0.u8zkruf.mongodb.net/vehicle?retryWrites=true&w=majority", 
{
    useNewURLParser: true,
});

app.post("/insert", async (req, res) => {
    const vehicleMake = req.body.vehicleMake
    const vehicleModel = req.body.vehicleModel
    const vehicle = new Vehicle({ vehicleMake: vehicleMake, vehicleModel: vehicleModel});
    try
    {
        await vehicle.save();
        res.send("inserted data");
    } 
    catch (err) 
    {
        console.log(err)
    }
})

app.listen(3001, () => {
    console.log("Server running on port 3001...");
});