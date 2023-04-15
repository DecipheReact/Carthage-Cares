const asyncHandler = require("express-async-handler")
const Order = require('../Models/order.js')
const User = require('../Models/user.js')
const Product = require('../Models/product.js')
const order = require("../Models/order.js")



// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})


// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
// const getOrderById = asyncHandler(async (req, res) => {

//   try {
//     const order = await Order.findById(req.params.id).populate('orderItems.product');
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }
//     res.json(order.orderItems);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// })
// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

const getProductUsersIdByOrderId = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate({
      path: 'orderItems.product',
      populate: {
        path: 'user',
        model: 'User'
      }
    })
    .populate('user', 'name email');
  const userIds = order.orderItems.map((item) => item.product.user._id.toString());
  console.log(userIds);
  res.status(201).json(userIds);
});


const getProductUsersIdByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const products = await Product.find({ user: userId }).select('_id');

  const productIds = products.map(product => product._id.toString());

  const orders = await Order.find({ 'orderItems.product': { $in: productIds } }).populate('user', 'name email');

  res.status(200).json(orders);
});


const OrderApprove = asyncHandler(async (req, res) => {

  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    order.statusOrder = true
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
});



const OrderNotApprove = asyncHandler(async (req, res) => {
  // const order = await Order.findById(req.params.id)

  // if (order) {
  //   console.log('order to delete : ', order)
  //   await order.remove();
  //   res.json('Order removed succefully')
  // } else {
  //   res.status(404)
  //   throw new Error('Order not found')
  // }

  try {
    const order = await Order.findById(req.params.id)
  if (order) {
    console.log('order to delete : ', order)
    await order.remove();
    res.json({
      success:true,
      message:'Order removed succefully'
    })
  } else {
    res.status(400)
    throw new Error('Order not found')
  }
  } catch (error) {
    res.send({
      success:false,
      message:error.message
    })
  }
});




// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()

    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// get all orders
const getOrders = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId, token: req.headers.authorization });

  if (!user) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  // Find all orders for the authenticated user
  const orders = await Order.find({ user: userId }).populate('user', 'name email');
  if (!orders) {
    res.status(401);
    throw new Error('Order not found for this user');
  }
  res.json(orders);
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// orders in profile
const getProductsOrderByIdOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate({
    path: 'orderItems',
    populate: {
      path: 'product',
      model: 'Product',
      select: 'productName imageProduct countInStock category',
    },
  });

  if (order) {
    const productDetails = order.orderItems.map((item) => ({
      productName: item.product.productName,
      imageProduct: item.product.imageProduct,
      countInStock: item.product.countInStock,
      category: item.product.category,
      qty: item.qty,
    }));
    res.json(productDetails);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }

 })

module.exports = {
  addOrderItems, getOrderById, updateOrderToPaid,
  getOrders, updateOrderToDelivered,
  getProductUsersIdByOrderId,
  getProductUsersIdByUserId,
  OrderApprove
  ,
  OrderNotApprove,
  getProductsOrderByIdOrder
}