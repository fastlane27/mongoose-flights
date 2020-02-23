const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: {
        type: String,
        required: true,
        enum: ['American', 'Southwest', 'United']
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999
    }, 
    departs: {
        type: Date,
        default: function() {
            return new Date;
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);
