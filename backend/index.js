const express = require('express');
const app = express();
require('./db/db')
require('dotenv').config()
const cors = require('cors');
const bodyparser = require('body-parser');
const { userSchema, product } = require('./modals/schema')
const stripe = require("stripe")(`${process.env.STRIPE_KEY}`)


const Port = process.env.DEV_PORT || 4006
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get('/', async (req, res) => {
    try {
        const data = await product.find()
        // console.log(data);
        res.status(200).send(data)
    } catch (err) {
        console.log(err)
        res.status(401).send("failed to load")
    }
})


app.post('/login', async (req, res) => {
    const username = req.body.username;
    const pass = req.body.password;
    // console.log(username)
    try {
        const user = await userSchema.findOne({ username: username });
        if (user.password === pass) {
            res.status(201).send(' login success')
        } else {
            // type a text :" invalid login details " bcz of security purpose
            res.status(401).send('invalid login details')
        }
    } catch (e) {
        // console.log("invalid username")
        res.status(401).send("invalid username")
    }
});


app.post('/create', async (req, res) => {
    //    console.log(req.body)
    try {
        const signUpData = await new userSchema(req.body);
        signUpData.save().then(() => {
            console.log('Sign Up completed')
            res.status(201).send('Sign Up completed')
        }).catch((e) => {
            // console.log(e)
            res.status(403).send("already exist")
        })
    } catch (e) {
        console.log(e)
        res.status(401).send("SignUp incomplet")
    }
});

app.post('/checkout', async (req, res) => {
    const { product } = req.body;

    const lineItems = product.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.title,
                images: [product.image]
            },
            unit_amount: product.price * 100,
        },
        quantity: product.id
    }));
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.PAYMENT_SUCCESS_URL}`,
            cancel_url: `${process.env.PAYMENT_CANCEL_URL}`,
            // billing_address_collection:"required",
        });
        res.json({ id: session.id })
    } catch (e) {
        //   console.log("backend not connected")
        res.status(401).send("No internet connection")
    }
});

app.listen(Port, () => {
    console.log(`${Port} is running`)
});