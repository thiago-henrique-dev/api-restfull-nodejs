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
                    name: category.name
                }
            })
        }
                res.status(200).send(response)
    } catch (error) {
        res.status(200).send({error:error})
    }
}

exports.postCategories = async (req, res, next) => {
    try {
        const query = `INSERT INTO categories (name) VALUES (?)`
        const result = await mysql.execute(query, [req.body.name])
        const response = {
            message: 'Category entered successfully',
            createdCategory: {
                categoryId: result.insertId,
                name: req.body.name,
                request: {
                    type: 'GET',
                    description: 'Return all categories',
                    url: process.env.URL_API + 'categories'
                }
            }
        }
                
                return res.status(200).send(response)
    } catch (error) {
                return res.status(500).send({error:error})
    }
}

exports.putCategories = async (req, res, next) => {
    try {
        const query = `UPDATE categories SET name = ?  WHERE categoryId = ? `
        const result = await mysql.execute(query, [req.body.name, req.body.categoryId])
            const response = {
                message: 'Category edit sucessfull'
            }
                res.status(200).send(response)
    }catch(error){
            res.status(400).send({error:error})
    }
 
}

