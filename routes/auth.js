const router = require("express").Router();
const User = require('../models/user')
const cryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
// register


router.post('/register',async (req,res)=>{
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });
    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
       res.status(500).json(err)
    }
})

// login
router.post('/login',async (req,res)=>{
   try {
       const user = await User.findOne({username: req.body.username})

        !user && res.status(401).json('wrong credentials');

       const hashedPassword = cryptoJS.AES.decrypt(
         user.password,
         process.env.PASS_SEC
       );

    const Originalpassword = hashedPassword.toString(cryptoJS.enc.Utf8);


    Originalpassword !== req.body.password &&
      res.status(401).json("wrong credentials");


    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {expiresIn:'30d'}
    );

    const { password,...others} = user._doc;

     res.status(200).json({...others,accessToken})
   } catch (error) {
     res.send(5000).json(error)
   }   
})


module.exports = router;
