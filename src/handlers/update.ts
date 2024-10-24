import { title } from "process";
import prisma from "../modules/db";

/**
 * Get All Updates
 * @param req
 * @param res
 * @returns
 * 
 * Conditions:
 * 1. The updates doesn't know the user
 * 2. The updates should be accessed by the authenticated user
 * 3. The user doesn't know about the udpates, there is no relationship between them
 * 4. And there is product which have updates relationship and user relationship
 * 
 * Here's the approach:
 * 1. To get all updates you should make sure the user is authenticated, because only authenticated user can access the updates.
 * 2. Make a query to the database to get all updates based on the product that user has.
 * 3. Call the products data from the database.
 * 4. Make the relationship between the product and the updates.
 * 5. The user who authenticated point to the products they have.
 * 6. The products have the updates relationship with the updates.
 * 7. So the user can access the updates based on the product that they have.
 * 
 */
export const getAllUpdates = async (req, res) => {
    try {
        const products = await prisma.product.findMany({ // this is to get all products that only belongs to the user
            where: {
                belongsToId: req.user.id
            },
            include: {
                updates: true
            }
        })

        /**
         * This function below is to get all updates from the products that the user has
         */
        const updates = products.reduce((allUpdates, product) => { //reduce is a function to get all updates from the products that the user has, here is how it works, the first parameter is the accumulator, the second parameter is the current value, the third parameter is the index, and the fourth parameter is the array
            return [...allUpdates, ...product.updates]
        }, [])
        
        if(!updates || updates === null) {
            res.status(404)
            res.json({message: "Updates are not found"})
        }

        res.json({data: updates})    
    } catch (error) {
        res.json({message: error.message})
    }
}

/**
 * Get Update by its ID
 * @param req
 * @param res
 * @returns
 * 
 * Here's the approach:
 * 1. To get an update by its ID you should make sure the user is authenticated, because only authenticated user can access the update.
 * 2. Make a query to the database to get the update by its ID.
 * 3. Return the update to the client.
 */
export const getUpdatesByID = async (req, res) => {
    try {
        const update = await prisma.update.findUnique({
            where: {
                id: req.params.id
            }
        })
        if(!update || update === null) {
            res.status(404)
            res.json({message: "Update is not found"})
        }
        res.json({data: update})
    } catch (error) {
        res.json({message: error.message})
    }
}

/**
 * Update an Update by its ID
 * @param req
 * @param res
 * @returns
 * 
 * Here's the approach:
 * 1. To update an update by its ID you should make sure the user is authenticated, because only authenticated user can update the update.
 * 2. Make a query to the database to update the update by its ID.
 * 3. Return the updated update to the client.
 * 
 */
export const putUpdate = async (req, res) => {
    try {
        /**
         * This approach is to update the update by its ID
         */
        const updated = await prisma.update.update({
            where: {
                id: req.params.id
            },
            data: {
                ...req.body,
                updateAt: new Date()
            }
        })
        if(!updated || updated === null) {
            res.status(404)
            res.json({message: "Update is not found"})
        }
        res.json({data: updated})
    } catch (error) {
        res.status(400)
        res.json({message: error.message})
    }
}


/**
 * Create an Update
 * @param req
 * @param res
 * @returns
 * 
 * Conditions:
 * 1. To create an update you should make sure the user is authenticated, because only authenticated user can create the update.
 * 2. The update should be created based on the product that the user has.
 * 3. So if the user doesn't have the product, they can't create the update.
 * 4. The user can only create the update based on the product that they have.
 * 5. Get the productId that associated with the user.
 * 
 * Here's the approach:
 * 1. To create an update you should make sure the user is authenticated, because only authenticated user can create the update.
 * 2. Find the productId that associated with the user.
 */
export const createUdpate = async (req, res) => {
    try {
        // This code is to find the product that belongs to the user
        const product = await prisma.product.findUnique({
            where: {
                id: req.body.productId,
                // id_belongsToId: { // this is to make sure the product belongs to the user, because the user can only create the update that belongs to them
                //     id: req.body.productId,
                //     belongsToId: req.user.id
                // }
            }
        })

        // This code is to check if the product belongs to the user
        if(!product){
            // Does not belong to you
            return res.status(401).json({message: "Product does not belong to you"})
        }

        // This code is to create the update that has the body, title, version, asset, status, and productId that associated with the user
        const update = await prisma.update.create({
            // data: {
            //     ...req.body,
            //     updateAt: new Date(),
            // }

            //Or you can use this one
            data: {
                title: req.body.title,
                body: req.body.body,
                updateAt: new Date(),
                product: {
                    connect: {
                        id: req.body.productId
                    }
                }
            }
        })

        if(!update || update === null) {
            res.status(404)
            res.json({message: "Update is not found"})
        }

        res.json({data: update})
    } catch (error) {
        res.status(400)
        res.json({message: error.message})
    }
}

/**
 * Delete Updated
 * @param req
 * @param res
 * @returns
 * 
 * Here's the approach:
 * 1. To delete an update by its ID you should make sure the user is authenticated, because only authenticated user can delete the update.
 * 2. Make a query to the database to delete the update by its ID.
 * 3. Return the deleted update to the client.
 * 
 */
export const deleteUpdate = async (req, res) => {
    try {
        const deleted = await prisma.update.delete({
            where: {
                id: req.params.id
            }
        })
        if(!deleted || deleted === null) {
            res.status(404)
            res.json({message: "Update with that ID is not found"})
        }
        res.json({data: deleted})
    } catch (error) {
        res.status(400)
        res.json({message: error.message})
    }
}