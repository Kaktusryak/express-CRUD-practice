const express = require('express')
const router = express.Router()

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'products'
    })
})

router.post('/',(req,res,next)=>{
    const product = {
        name:req.body.name,
        price:req.body.price
    }
    res.status(201).json({
        message:'post products',
        createdProduct:product
    })
})

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId
    res.status(200).json({
        message:`product ${id}`
    })
})

router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId
    res.status(200).json({
        message:`updated product ${id}`
    })
})

router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId
    res.status(200).json({
        message:`deleted product ${id}`
    })
})




module.exports = router
