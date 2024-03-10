const mongoose = require('mongoose')

const Product = require('../models/product')

exports.productsGetAll = (req, res, next) => {//GET
    Product.find().select('name price _id productImage').exec().then(docs => {
        console.log(docs)
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    productImage: doc.productImage,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response)
    }).catch(err => {
        console.log(err)
        res.status(404).json({ error: err })
    })
}

exports.productsPost = (req, res, next) => {//POST
    console.log(req.file)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    })
    product.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Created product successfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                productImage: result.productImage,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + result._id
                }
            }
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    })
}

exports.productsGetOne = (req, res, next) => {//GET by ID
    const id = req.params.productId
    Product.findById(id).select('name price _id productImage').exec().then(doc => {
        console.log(doc)
        if (doc) {
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    message: 'To get all the products',
                    url: 'http://localhost:3000/products'
                }
            })
        } else {
            res.status(404).json({ message: 'no valid entry found for this id' })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    })
}

exports.productsPatchOne = (req, res, next) => {//PATCH by ID
    const id = req.params.productId
    Product.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true }).exec().then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Product updated',
            product: {
                name: result.name,
                price: result.price,
                _id: result._id
            }
        })

    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    })
}

exports.productsDeleteOne = (req, res, next) => {//DELETE by ID
    const id = req.params.productId
    Product.deleteOne({ _id: id }).exec().then(result => {
        console.log(result)
        res.status(200).json({ message: 'deleted ' + id })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    })
}