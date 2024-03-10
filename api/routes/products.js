const express = require('express')
const router = express.Router()
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')

const ProductsController = require('../controllers/products')

//file storage
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        cb(null,new Date().getTime().toString()+file.originalname)
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024 * 1024 * 5
    },
    fileFilter:fileFilter
})
////

router.get('/',ProductsController.productsGetAll)

router.post('/',checkAuth,upload.single('productImage'),ProductsController.productsPost)

router.get('/:productId',ProductsController.productsGetOne)

router.patch('/:productId',checkAuth,ProductsController.productsPatchOne)

router.delete('/:productId',checkAuth,ProductsController.productsDeleteOne)

module.exports = router
