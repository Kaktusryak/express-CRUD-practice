const express = require('express')
const app = express();
const morgan = require('morgan')//logging 
const bodyParser = require('body-parser')//to parse body

const productRoutes = require('./api/routes/products')//importing routes
const orderRoutes = require('./api/routes/orders')

app.use(morgan('dev'))//dev - format of usage
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/products', productRoutes)//routes that handle requests
app.use('/orders', orderRoutes)

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept, Authorization")
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH')
        return res.status(200).json({})
    }
    next()

})

app.use((req,res,next)=>{
    const error = new Error('Route is not found');
    error.status=404;
    next(error)
})//throw an error when we reach this because here is no routes 


app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message:error.message
        }
    })
})

module.exports = app;