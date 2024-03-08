const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Order = require('../models/order')
const Product = require('../models/product')

router.get('/', (req, res, next) => {//GET
    Order.find().populate('product','name').exec().then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/'+ doc._id
                    }
                }
            })

        })
    }).catch(err => {
        res.status(500).json({ error: err })
    })


})

router.post('/', (req, res, next) => {//POST
    Product.findById(req.body.productId).then(product => {
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        })
        return order.save()

    }).then(result => {
        res.status(201).json({
            order: {
                product: result.product,
                quantity: result.quantity,
                _id: result._id
            },
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders/' + result._id
            }
        })
    }).catch(err => {
        res.status(500).json({
            message: 'productId is invalid',
            error: err
        })
    })



})

router.get('/:orderId',(req,res,next)=>{//GET by ID
    Order.findById(req.params.orderId).exec().then(order=>{
        res.status(200).json({order})
    }).catch(err=>{
        res.status(500).json({error:err})
    })
    
})
router.delete('/:orderId',(req,res,next)=>{//DELETE by ID

    Order.deleteOne({_id:req.params.orderId}).exec().then(result=>{
        console.log(result)
        res.status(200).json({message:'deleted '+ req.params.orderId})
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error:err})
    })
})






module.exports = router