const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

exports.total_Sum = (req,res,next)=>{
    try {
        const findproduct = prisma.product.findUnique({
            where: {
              id: req.body.productId
            }
        })
        .then(prod =>{
            const sum = prod.price * req.body.quantity;
           console.log("Total Order sum: " + sum)
        })/*
        if(!findproduct)
        {
            return res.json("No such product exists")
        }
        else{
            // const sum = product.price * req.body.quantity
            console.log(findproduct.price)
        }*/
        next()
    }
    catch{
        next(error)
    }
}