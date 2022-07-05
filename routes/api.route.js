const router = require('express').Router();

const checkAuth = require("../middleware/check-auth");

const total = require("../middleware/total")

// Importing controllers
const orderRoutes = require("../controllers/orders")
const uesrRoutes = require("../controllers/user")
const productRoutes = require("../controllers/products")

// get Products 
router.get("/products",checkAuth,productRoutes.products_getAll)

// create a product
router.post('/products',productRoutes.products_Create);

// get a specific product
router.get('/products/:id',productRoutes.products_getProduct );

// update a product
router.patch('/products/:id',productRoutes.products_Update );

// delete a product
router.delete('/products/:id',productRoutes.products_Delete );

// Orders
// get orders 
router.get("/orders",orderRoutes.orders_getAll)

// create a order
router.post('/orders',total.total_Sum, orderRoutes.orders_create);

// get a specific order
router.get('/orders/:id', orderRoutes.orders_getOrder);


// Delete the order
router.delete('/orders/:id',orderRoutes.orders_delete);

// User
router.post('/user/signup',uesrRoutes.user_Create)

router.post("/user/login",uesrRoutes.user_Login )


module.exports = router;
