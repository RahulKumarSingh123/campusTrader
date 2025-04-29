const mongoose = require("mongoose");

const listingSchema = mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Book', 'Engineering Equipment', 'Stationary', 'Electronics', 'Sports Equipments', 'Clothing', 'Other'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        enum: ['New', 'Good', 'Poor'],
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    imageName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Available', 'Sold']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
})


module.exports = mongoose.model('Listings', listingSchema);