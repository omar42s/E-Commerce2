const router = require("express").Router();
const Cart = require("../models/cart");
const {
  verifyToken,
  verifyTokenAuthorization,
  verifyTokenAdmin,
} = require("./verifyToken");

//Create
router.post("/",verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});
// update
router.put("/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    const updatedCart= await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete
router.delete("/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user cart

router.get("/find/:id",verifyTokenAuthorization, async (req, res) => {
  try {
    const Cart = await Cart.findOne(req.params.id)
    res.status(200).json(Cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all 

router.get('/',verifyTokenAdmin,async(req,res)=>{
    try {
       const carts = await Cart.find() ;
       res.status(200).json(carts)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;
