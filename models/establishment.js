const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const establishmentSchema = new Schema(
  {
    establishmentName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Convert email to lowercase before saving
      validate: {
        validator: function (value) {
          // Email validation regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Establishment = mongoose.model("Establishment", establishmentSchema);
module.exports = Establishment;
