import express from "express";
// import User from "../model/user.model.js";
import { signup, login } from "../controller/user.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.put('/clearcart/:email', async (req, res) => {
    const { email } = req.params;
  
    try {
      const user = await User.findOneAndUpdate(
        { email },
        { $set: { cart: [] } }, // Set the cart field to an empty array
        { new: true }
      );
  
      res.status(200).json({ success: true, message: 'Cart cleared successfully', cart: user.cart });
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).json({ success: false, message: 'Error clearing cart' });
    }
  });

export default router;