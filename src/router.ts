import {Router} from 'express';
import {body, oneOf} from 'express-validator';
import { handleInputsError } from './modules/middleware';
import { getAllProducts, getProduct, createProduct, deleteProduct, updateProduct } from './handlers/product';
import { createUdpate, deleteUpdate, getAllUpdates, getUpdatesByID, putUpdate } from './handlers/update';

const router = Router();

/**
 * Product API
 * notes:
 * 1. It will cause hanging if you don't put the second argument in the router method.
 */
router.get('/product', 
    getAllProducts,
    (req, res) => {
        console.log('GET request received use Express framework use Router');
        // res.json({message: `Hello World use Express framework, and it also can access ${req.yourCustomProperty}`});
    }
)
router.get('/product/:id', 
    getProduct,
    (req, res) => {
        console.log('GET product by its ID');
    }
)
router.put('/product/:id', 
    body('name').isString(), // this is to validate the name, the name should be a string
    handleInputsError, // this is a custom middleware function, it will be executed
    updateProduct,
    (req, res) => { 
        res.send('Update API');    
    }
)
router.post('/product', 
    body('name').isString(),
    handleInputsError,
    createProduct,
    (req, res) => {
        res.send('Create Product successful');
    }
)
router.delete('/product/:id', 
    deleteProduct,
    (req, res) => {
        console.log('Delete product by its ID');
    }
)

/**
 * Update API
 */
router.get('/update',
    getAllUpdates,
    (req, res) => {
        console.log('GET request received for Get All Updates');
    }
)
router.get('/update/:id', 
    getUpdatesByID,
    (req, res) => {
        console.log('GET request received for Get Update by its ID');
    }
)
router.put('/update/:id',
    body(['title','body']).exists().isString(),
    body(['version', 'asset']).optional(),
    oneOf([body('status').equals('IN_PROGRESS'), body('status').equals('SHIPPED'), body('status').equals('DEPRECATED')]),
    handleInputsError, // this is a custom middleware function, it will be executed before the callback function
    putUpdate,
    (req, res) => {
        res.send('Update API for Update');
    }
)
router.post('/update',
    body(['title','body','productId']).exists().isString(),
    body(['version', 'asset']).optional(),
    oneOf([body('status').optional().equals('IN_PROGRESS'), body('status').optional().equals('SHIPPED'), body('status').optional().equals('DEPRECATED')]),
    handleInputsError,
    createUdpate,
    (req, res) => {
        console.log('Create Update successful');
        // res.send('Create Update successful');
    }
)
router.delete('/update/:id', 
    deleteUpdate,
    (req, res) => {
        console.log('Delete Update by its ID');
    }
)

/**
 * Update Point API
 */
router.get('/update-point', () => {})
router.get('/update-point/:id', () => {})
router.put('/update-point/:id', 
    body(['name', 'description']).isString(), 
    handleInputsError,
    (req,res) => {
        res.send('Update API for Update Point');
    }
)
router.post('/update-point',
    body(['name', 'description']).isString(),
    handleInputsError,
    (req, res) => {
        res.send('Create Update Point successful');
    }
)
router.delete('/update-point/:id', () => {})

export default router;