const router = require('express').Router();

const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

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
