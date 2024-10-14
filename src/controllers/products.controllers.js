import { getConnection } from '../database/connection.js'


export const getProducts = async(req, res)=>{
    const pool = await getConnection()
    const result = await pool.request().query('SELECT * FROM products')
    res.json(result.recordset)
}

export const getProduct = async (req, res)=>{
    const pool = await getConnection()
    const result = await pool.request().input('id', req.params.id).query('SELECT * FROM products WHERE id = @id')
    if(result.rowsAffected[0] === 0){
        return res.status(404).json(({message: "Product not found"}))
    }
    return res.json(result.recordset[0])
}

export const createProduct = async (req, res)=>{
    const pool = await getConnection()
    const result = await pool.request().input('name', req.body.name)
                                        .input('price', req.body.price)
                                        .input('quantity', req.body.quantity)
                                        .input('description', req.body.description)
                                        .query('INSERT INTO products(name, price, quantity, description) VALUES(@name, @price, @quantity, @description); SELECT SCOPE_IDENTITY() AS id')
    res.json({
        id: result.recordset[0].id,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description
    })
    console.log(`Producto ${req.body.name} creado con exito`)
}

export const updateProduct = async(req, res)=>{
    const id = req.params.id;
    const pool = await getConnection()
    const result = await pool.request().input('id', req.params.id)
                                        .input('name', req.body.name)
                                        .input('price', req.body.price)
                                        .input('quantity', req.body.quantity)
                                        .input('description', req.body.description)
                                        .query('UPDATE products SET name = @name, price = @price, quantity = @quantity, description = @description WHERE id = @id')
    if(result.rowsAffected[0] === 0){
        return res.status(404).json(({ message: "Product not found" }))
    }
    console.log('Producto Actualizado');
    res.json( {message: "Product Update"} )
}

export const deleteProduct = async(req, res)=>{
    const pool = await getConnection()
    const result = await pool.request().input('id', req.params.id).query('DELETE FROM products WHERE id = @id')
    if(result.rowsAffected[0] === 0){
        return res.status(404).json(({ message: "Product not found" }))
    }
    console.log('Producto Eliminado');
    return res.json({message: "Product Delete"})
}


