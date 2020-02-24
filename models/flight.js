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
            const date = new Date();
            const nextYear = new Date().getFullYear() + 1;
            date.setFullYear(nextYear);
            return date;
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);
