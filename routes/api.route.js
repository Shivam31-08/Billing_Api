const router = require('express').Router();

const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
// get Products 
router.get("/products",async(req,res,next)=>{
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
    res.json("Delted the product")
  } catch (error) {
    next(error);
  }
});

// Orders

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});  


router.get('/user/signup',async(req,res,next)=>{
  try{
    const email = req.body.email;
    const response = await prisma.user.findUnique({
      where:{email:email}
    });
    if(response)
    {
      return res.json("User already exists")
    }
    const createUser = await prisma.user.create({
      data : req.body
    })
    res.json(createUser)
  }
  catch(error)
  {
    next(error)
  }
})

module.exports = router;
