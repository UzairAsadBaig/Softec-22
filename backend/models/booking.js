const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    doctor: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    patient: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    clinic: { type: mongoose.Schema.Types.ObjectID, ref: "Clinic" },
    bookedTimeSlots: {
      from: { type: String },
      to: { type: String },
    },
  },
  { timestamps: true }
);

const booking = mongoose.model("Booking", bookingSchema);

module.exports = booking;
