const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Route handler for POST request to "/vehicle-info"
app.post("/vehicle-info", async (req, res) => {
  try {
    const { registrationNumber } = req.body; // Extract registrationNumber from req.body

    const config = {
      headers: {
        "x-api-key": "BRxejLyZYo4yi19lLmbVV3eZ9DkAh1pi9u9Dl0iq",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles",
      { registrationNumber }, // Pass registrationNumber as an object
      config
    );

    const vehicleInfo = response.data;
    res.json(vehicleInfo);
  } catch (error) {
    console.error("Error fetching vehicle information:", error);
    res.status(500).json({ error: "Unable to fetch vehicle information" });
  }
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
