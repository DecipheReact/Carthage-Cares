const express = require('express');
const router = express.Router()
const {addOrderItems,getOrderById,updateOrderToPaid, getOrders,updateOrderToDelivered, 
    getProductUsersIdByOrderId, getProductUsersIdByUserId,OrderApprove,OrderNotApprove,
    getProductsOrderByIdOrder} 
    =require ('../Controllers/orderController.js')
const { protectSimpleUser,validator,isAdmin,isCoach }= require('../Middelware/userMiddelware.js')


router.post('/',protectSimpleUser,addOrderItems)
router.get('/:id',getOrderById)
router.put('/:id/pay',protectSimpleUser,updateOrderToPaid)
router.get('/getAll/:id',protectSimpleUser,getOrders)
router.put('/approveOrder/:id',OrderApprove)
router.get('/ProductsOrderByIdOrder/:id',getProductsOrderByIdOrder)
router.delete('/NotapproveOrder/:id',OrderNotApprove)
router.get('/getOrderOwner/:id',getProductUsersIdByOrderId)
router.get('/getOrderbyIdUser/:userId',getProductUsersIdByUserId)
router.put('/:id/deliver',protectSimpleUser,isCoach,updateOrderToDelivered)

module.exports = router