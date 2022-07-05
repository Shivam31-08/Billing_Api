const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()


exports.orders_getAll=async(req,res,next)=>{
    try {
      const orders = await prisma.order.findMany({})
      res.json(orders)
    } catch (error) {
      next(error)
    }
}

exports.orders_create = async (req, res, next) => {
    try {
      let sum = 0;
      const findProduct = prisma.product.findUnique({
        where : {
          id : req.body.productId
        }
      })
      .then(prod => {
        if(!prod)
        {
          return res.json("Product not available currently!")
        }
        sum = prod.price * req.body.quantity;
      })
      const order =  await prisma.order.create({
          data: req.body
        })
        res.json({
          order : order,
          Total : sum
      })
    } catch (error) {
      next(error);
    }
}

exports.orders_getOrder = async (req, res, next) => {
    try {
      const id = req.params.id;
      const order = await prisma.order.findUnique({
       where : {id:Number(id)}
      })
      const total = await prisma.product.findUnique
      res.json(order)
    } catch (error) {
      next(error);
    }
  }

exports.orders_delete =  async (req, res, next) => {
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
  }