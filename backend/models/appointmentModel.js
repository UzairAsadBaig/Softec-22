const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
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

const appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = appointment;
