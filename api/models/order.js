const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},//ref - shows that we create relation
    quantity:{type:Number, default:1}
})


module.exports = mongoose.model('Order', orderSchema)