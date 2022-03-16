const express = require('express');
const router = express.Router()
const multer = require('multer')
const login = require('../middleware/login')
const ProdutosControllers = require('../controllers/produtos-controller');

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


router.get('/', ProdutosControllers.getProdutos)
router.post(
    '/',
    login.obrigatorio,
    upload.single('imagem_produto'),
    ProdutosControllers.postProduto
);
router.get('/:id_produto', ProdutosControllers.getUmProduto)
router.patch('/', login.obrigatorio, ProdutosControllers.updateProdutos)
router.delete('/', login.obrigatorio, ProdutosControllers.deleteProdutos)
router.post('/:id_produto/imagem',
     login.obrigatorio,
     upload.single('imagem_produto'),
     ProdutosControllers.postImagem
)
router.get('/:id_produto/imagens',
    ProdutosControllers.getImagens
)
module.exports = router;
