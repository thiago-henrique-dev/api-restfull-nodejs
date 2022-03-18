const express = require('express');
const router = express.Router()
const multer = require('multer')
const login = require('../middleware/login')
const productController = require('../controllers/products-controller');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
         cb(null, new Date().toISOString() + file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === `image/png`){
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
        fileFilter: fileFilter
})


router.get('/', productController.getProducts)
router.post(
    '/',
    login.required,
    upload.single('productImage'),
    productController.productPost
);
router.get('/:productId', productController.getOneProduct)
router.patch('/', login.required, productController.updateProducts)
router.delete('/', login.required, productController.deleteProducts)
router.post('/:productId/image',
     login.required,
     upload.single('productImage'),
     productController.postImagem
)
router.get('/:productId/images',
    productController.getImagens
)
module.exports = router;
