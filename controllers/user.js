const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.user_Create = async(req,res,next)=>{
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
}

exports.user_Login = async (req, res, next) => {
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
  }