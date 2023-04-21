const express = require('express');
const router = express.Router()
const {addOrderItems,getOrderById,updateOrderToPaid, getOrders,updateOrderToDelivered, 
    getProductUsersIdByOrderId, getProductUsersIdByUserId,OrderApprove,OrderNotApprove,
    getProductsOrderByIdOrder,
    getProductsDashboard,
    removeProductFromOrder} 
    =require ('../Controllers/orderController.js')
const { protectSimpleUser,validator,isAdmin,isCoach }= require('../Middelware/userMiddelware.js')


router.post('/',protectSimpleUser,addOrderItems)
router.get('/:id',getOrderById)
router.put('/:id/pay',protectSimpleUser,updateOrderToPaid)
router.get('/getAll/:id',protectSimpleUser,getOrders)
router.put('/approveOrder/:id',OrderApprove)
router.get('/ProductsOrderByIdOrder/:id',getProductsOrderByIdOrder)
router.delete('/NotapproveOrder/:id',OrderNotApprove)
router.delete('/deleteProduct/:userId/:orderId/:productId',removeProductFromOrder)
router.get('/getOrderOwner/:id',getProductUsersIdByOrderId)
router.get('/getOrderbyIdUser/:userId',getProductUsersIdByUserId)
router.put('/:id/deliver',protectSimpleUser,isCoach,updateOrderToDelivered)
router.get('/dashboard/:id/:userId',getProductsDashboard)


module.exports = router