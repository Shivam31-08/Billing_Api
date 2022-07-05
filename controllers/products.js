const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

exports.products_getAll = async(req,res,next)=>{
    try {
      const products = await prisma.product.findMany({})
      res.json(products)
    } catch (error) {
      next(error)
    }
  }

  exports.products_Create =  async (req, res, next) => {
    try {
      const product = await prisma.product.create({
        data: req.body
      })
      res.json(product)
    } catch (error) {
      next(error);
    }
  }


exports.products_getProduct = async (req, res, next) => {
    try {
      const id = req.params.id;
      const product = await prisma.product.findUnique({
       where : {id:Number(id)}
      })
      res.json(product)
    } catch (error) {
      next(error);
    }
  }



exports.products_Update = async (req, res, next) => {
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
  }

exports.products_Delete = async (req, res, next) => {
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
  }
