const express = require('express');
const router = express.Router()
const login = require('../middleware/login')
const multer = require('multer')

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


const categoriesContollers = require('../controllers/category-controllers');

router.get('/', categoriesContollers.getCategories)
router.post('/',  
        upload.single('categoryImage'), categoriesContollers.postCategories)
router.put('/:categoryId', categoriesContollers.putCategories)
router.delete('/:categoryId', categoriesContollers.deleteCategories)
router.get('/:categoryId', categoriesContollers.getOneCategories)




module.exports = router