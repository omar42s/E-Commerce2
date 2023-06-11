require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const stripeRoute = require('./routes/stripe')
const orderRoute = require('./routes/order')ؤ
const cors = require('cors')


mongoose 
  .connect(
    process.env.MONGO_URI)
  .then(() => console.log("db connection successful"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors())  
app.use(express.json())
app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/products',productRoute)
app.use('/api/carts',cartRoute)
app.use('/api/orders',orderRoute)
app.use('/api/stripe',stripeRoute)


app.listen(process.env.PORT|| 5000,()=>{
    console.log('server is running')
})   