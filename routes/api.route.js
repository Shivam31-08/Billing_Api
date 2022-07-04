const router = require('express').Router();

const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const checkAuth = require("../middleware/check-auth");

// get Products 
router.get("/products",checkAuth,async(req,res,next)=>{
  try {
    const products = await prisma.product.findMany({})
    res.json(products)
  } catch (error) {
    next(error)
  }
})

// create a product
router.post('/products', async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: req.body
    })
    res.json(product)
  } catch (error) {
    next(error);
  }
});

// get a specific product
router.get('/products/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await prisma.product.findUnique({
     where : {id:Number(id)}
    })
    res.json(product)
  } catch (error) {
    next(error);
  }
});

// update a product
router.patch('/products/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await prisma.product.update({
      where : {
        id : Number(id)
      },
      data: req.body
    })
    res.json(product)
  } catch (error) {
    next(error);
  }
});

// delete a product
router.delete('/products/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await prisma.product.delete({
      where: {
        id:Number(id)
      }
    })
    res.json("Deleted the product")
  } catch (error) {
    next(error);
  }
});

// Orders
// get orders 
router.get("/orders",async(req,res,next)=>{
  try {
    const orders = await prisma.order.findMany({})
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

// create a order
router.post('/orders', async (req, res, next) => {
  try {
    const order = await prisma.order.create({
      data: req.body
    })
    res.json(order)
  } catch (error) {
    next(error);
  }
});

// get a specific order
router.get('/order/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await prisma.product.findUnique({
     where : {id:Number(id)}
    })
    res.json(order)
  } catch (error) {
    next(error);
  }
});


// Delete the order
router.delete('/orders/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await prisma.order.delete({
      where: {
        id:Number(id)
      }
    })
    res.json("Deleted the order")
  } catch (error) {
    next(error);
  }
});

// User
router.post('/user/signup',async(req,res,next)=>{
  try{
    const email = req.body.email;
    const response = await prisma.user.findUnique({
      where:{email:email}
    });

    if(response)
    {
      return res.json("User already exists")
    }
    else{
      const Hash = await bcrypt.hash(req.body.password,10);
      const createUser = await prisma.user.create({
          data : {
            email : req.body.email,
            password : Hash
          }
        })
      res.json(createUser)
    }
  }
  catch(error)
  {
    next(error)
  }
})

router.post("/user/login", async (req, res, next) => {
  try {
    const email = req.body.email;
    const response = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    if (!response) {
      return res.json("User does not exist")
    }
    else {
      bcrypt.compare(req.body.password, response.password, (err, result) => {
        if(result)
        {
          const token = jwt.sign({
            id : response.id,
            email : res.email
          },
          // priv key
          process.env.SECRET_KEY,
          {
            expiresIn : "1h"
          })
          res.json("Token : "+ token)
        }
        else{
          return res.json("Authentication failed")
        }
      })
    }
  } catch (error) {
    res.json("Auth Failed")
    next(error)
  }
})


module.exports = router;
