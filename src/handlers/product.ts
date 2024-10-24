import prisma from "../modules/db";

/**
 * Get All Products
 * @param req 
 * @param res 
 * @returns 
 * For the getProducts there are two ways to overcome it:
 * 1. The first one is to get directly from the user table and return the data to the client. Because the user table has an field products[] array, you can get the products[] array. So, you can get the products[] array from the user table and return it to the client.
 * 2. The second one you can go to the product table and get all the products and return it to the client by its belongsToId from user id.
 */
export const getAllProducts = async (req, res) =>{
    /**
     * Here's the approach:
     * 1. First you should get the full user instance from the user table by the user id that you get from req.user.id, because the req.user is not return the full user data, it only return the user data that requested by user, not from database.
     * 2. 
     */
    const user = await prisma.user.findUnique({ // this is to get the full user instance from the user table by the user id
        where: { // this is to define the condition to get the user instance, and make query to the database
            id: req.user.id
        },
        include: { //this is to join the user instance with the products[] array, it will trigger the population of the products[] array in mongo
            products: true // this is to include the products[] array in the user, this will populate the products[] array in the user instance, this property depend on your schema
            //you can do specific products that needs to show in the client
        }
    })
    
    // res.json(user.products); // this is to return the products[] array to the client, this approach will rely on the data structure of the user table. If the user table has a products[] array, you can get the products[] array from the user table and return it to the client.
    res.json({data: user.products}); // this is to return the products[] array to the client, the difference is you can add the key data to the response rather than just return the array. You must concernt about prefixing the key data to the response, because it will make the response more readable and easier to understand. And then you could add more properties to the response or sendback, such as status, message, error, etc.
}

/**
 * Get One Product
 */
export const getProduct = async (req, res) => {
    /**
     * Here's the approach:
     * 1. To get product you should make sure the id is valid, because the id is the unique identifier of the product.
     * 2. Get the id from req.params.id, because the id is passed as a parameter in the URL. Example: /product/:id, this that written in our router.
     * 3. After we get the id, we can make a query to the database to get the product by the product id.
     * 4. After we get the product, we can return the product to the client. By get from Product table by it's id.
     */
    const id = req.params.id; // this is to get the id from the URL parameter, the id is passed as a parameter in the URL, so you can get the id from req.params.id

    const product = await prisma.product.findUnique({
        where: {
            id,
            belongsToId: req.user.id // this is to make sure the product belongs to the user, because the user can only access the product that belongs to them
        }
    })

    if(!product || product === null) {
        res.status(404) // this is to set the HTTP status code for the response, send back a 404 status code
        res.json({message: "Product is not found"}) // this is to return the message to the client if the product is not found
    }

    res.json({data: product})
}

export const createProduct = async (req, res) => {
    /**
     * Here's the approach:
     * 1. To create a product you should make sure the data is valid, because the data is the information of the product that you want to create.
     * 2. Get the data from req.body, because the data is passed in the request body. Example: {name: 'Product A'}, this that written in our router.
     * 3. After we get the data, we can make a query to the database to create the product.
     * 4. After we create the product, we can return the product to the client.
     */
    const {name} = req.body; // this is to get the data from the request body, the data is passed in the request body, so you can get the data from req.body
    const product = await prisma.product.create({
        data: {
            name,
            belongsToId: req.user.id // this is to make sure the product belongs to the user, because the user can only create the product that belongs to them
        }
    })

    res.json({data: product})
}

export const updateProduct = async (req, res) => {
    /**
     * Here's the approach:
     * 1. To update a product you should make sure the id is valid, because the id is the unique identifier of the product.
     * 2. Get the id from req.params.id, because the id is passed as a parameter in the URL. Example: /product/:id, this that written in our router.
     * 3. Get the data from req.body, because the data is the information of the product that you want to update.
     */
    const updated = await prisma.product.update({
        where: {
            // id: req.params.id,
            // belongsToId: req.user.id // this is to make sure the product belongs to the user, because the user can only update the product that belongs to them
            id_belongsToId: { // this is to make sure the product belongs to the user, because the user can only update the product that belongs to them
                id: req.params.id,
                belongsToId: req.user.id
            }
        },
        data: {
            name: req.body.name // this is to update the product name, you can update the product name from the request body
        }
    })

    res.json({data: updated}) // this is to return the updated product to the client
}

export const deleteProduct = async (req, res) => {
    /**
     * Here's the approach:
     * 1. To delete a product you should make sure the id is valid, because the id is the unique identifier of the product.
     * 2. Get the id from req.params.id, because the id is passed as a parameter in the URL. Example: /product/:id, this that written in our router.
     */
    const deleted = await prisma.product.delete({
        where: {
            // id: req.params.id,
            // belongsToId: req.user.id // this is to make sure the product belongs to the user, because the user can only delete the product that belongs to them
            id_belongsToId: { // This is because the id and belongsToId is unique identifier of the product
                id: req.params.id,
                belongsToId: req.user.id
            }
        }
    })

    res.json({data: deleted}) // this is to return the deleted product to the client
}