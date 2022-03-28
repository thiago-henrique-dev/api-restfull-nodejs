const { restart } = require("nodemon")
const mysql = require(`../mysql`)

exports.getCategories = async (req, res, next) => {
    try {
        const query = `SELECT * FROM categories`
        const result = await mysql.execute(query)
        const response = {
            length: result.length,
            categories: result.map(category => {
                return {
                    categoryId: category.categoryId,
                    name: category.name,
                    categoryImage: category.categoryImage
                }
            })
        }
        res.status(200).send(response)
    } catch (error) {
        res.status(200).send({error:error})
    }
}

exports.getOneCategories = async (req, res, next) => {
    try {
        const query = "SELECT * FROM categories WHERE categoryId=?"
        const result = await mysql.execute(query, [req.params.categoryId])
            return res.status(200).send(result)
    } catch (error) {
            return res.status(500).send({error:error})
    }   
}

exports.postCategories = async (req, res, next) => {
    console.log("req", req.body.categoryImage)
    try {
        const query = `INSERT INTO categories (name, categoryImage) VALUES (?,?)`
        const result = await mysql.execute(query, [req.body.name, req.body.categoryImage])
     
                
                return res.status(200).send(result)
    } catch (error) {
                return res.status(500).send({error:error})
    }
}

exports.putCategories = async (req, res, next) => { 
    console.log("req", req.body.categoryImage)

    try {
        const query = `UPDATE categories SET name = ?, categoryImage = ? WHERE categoryId = ? `
        const result = await mysql.execute(query, [req.body.name, req.body.categoryImage, req.params.categoryId])
        
                res.status(200).send(result)
    }catch(error){
            res.status(400).send({error:error})
    }
 
}

exports.deleteCategories = async (req, res, next) => {
    try {
        const query = `DELETE FROM categories WHERE categoryId = ?`
        const result = await mysql.execute(query, [req.params.categoryId])
          
            res.status(200).send({ deleted: req.params.categoryId})
    } catch (error) {
            res.status(500).send({error:error})
    }
}
