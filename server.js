const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const Establishment = require("./models/establishment");

app.use(cors());
app.use(express.json());

// connect to mongodb & listen for requests
const dbURI =
  "mongodb+srv://joshthomas:Slash2406@myautopal.w3obbyl.mongodb.net/my-auto-pal?retryWrites=true&w=majority&appName=myautopal";

mongoose
  .connect(dbURI)
  .then((result) => app.listen(8000))
  .catch((err) => console.log(err));

// retrieve vehicle data from user reg input
app.post("/vehicle-info", async (req, res) => {
  try {
    const { registrationNumber } = req.body;
    const config = {
      headers: {
        "x-api-key": "BRxejLyZYo4yi19lLmbVV3eZ9DkAh1pi9u9Dl0iq",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles",
      { registrationNumber },
      config
    );

    const vehicleInfo = response.data;
    res.json(vehicleInfo);
  } catch (error) {
    console.error("Error fetching vehicle information:", error);
    res.status(500).json({ error: "Unable to fetch vehicle information" });
  }
});

// add new establishment
app.post("/add-establishment", (req, res) => {
  try {
    const establishmentData = req.body;
    const establishment = new Establishment(establishmentData);

    establishment
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error adding establishment");
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error adding establishment");
  }
});

// fetch all establishments
app.get("/all-establishments", (req, res) => {
  Establishment.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// fetch single establishment by id
app.get("/single-establishment", (req, res) => {
  Establishment.findById("6624539e7e152d0f7762e396")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
