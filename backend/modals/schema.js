const mongoose = require('mongoose');
const validator = require('validator');


// model for user collection
const dataSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "user is already present"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalid Email Id')
            }
        }
    },
    number: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const productSchema = new mongoose.Schema({
    id: {
        type: String
    },
    title: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    image: {
        type: String
    },
    quantity: {
        type: Number
    },
    rate: {
        type: Number
    },
    count: {
        type: Number
    }
})

//model for product collection
const product = new mongoose.model('products', productSchema)

const userSchema = new mongoose.model('ecomLogin', dataSchema)
module.exports = { userSchema, product }