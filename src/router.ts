import {Router} from 'express';

const router = Router();

/**
 * Product API
 * notes:
 * 1. It will cause hanging if you don't put the second argument in the router method.
 */
router.get('/product', (req, res) => {
    console.log('GET request received use Express framework use Router');
    res.json({message: `Hello World use Express framework, and it also can access ${req.yourCustomProperty}`});
})
router.get('/product/:id', () => {})
router.put('/product/:id', () => {})
router.post('/product', () => {})
router.delete('/product/:id', () => {})

/**
 * Update API
 */
router.get('/update', () => {})
router.get('/update/:id', () => {})
router.put('/update/:id', () => {})
router.post('/update', () => {})
router.delete('/update/:id', () => {})

/**
 * Update Point API
 */
router.get('/update-point', () => {})
router.get('/update-point/:id', () => {})
router.put('/update-point/:id', () => {})
router.post('/update-point', () => {})
router.delete('/update-point/:id', () => {})

export default router;