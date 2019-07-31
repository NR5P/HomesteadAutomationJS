const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cycleIrrigationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    pin: {
        type: Number,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    whenCreated: {
        type: Date,
        default: Date.now
    },
    cycleOnTimeHour: {
        type: Number,
        required: false
    },
    cycleOnTimeMin: {
        type: Number,
        required: false
    },
    cycleOnTimeSec: {
        type: Number,
        required: false
    },

});

mongoose.model("cycleIrrigationSchema", cycleIrrigationSchema);