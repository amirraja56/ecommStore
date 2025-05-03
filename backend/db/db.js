require('dotenv').config()

const mongoose= require('mongoose');
// const url="mongodb://127.0.0.1/ecommerce";
const url=`${process.env.DB_CONNECT}`;
mongoose.connect(url).then(()=>{
    console.log('DataBase connected');
}).catch((err)=>{
    console.log(`db connection failed---${err}`)
});
