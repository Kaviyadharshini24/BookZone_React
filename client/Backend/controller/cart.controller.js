
import CartItem from "../model/cart.model.js";
import User from "../model/user.model.js";


export const fetchCartItems = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email }).populate('cart');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.cart); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    const { email } = req.params;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
 
      const cartItemsToDelete = user.cart.map((itemId) => itemId.toString());

      // check if there are any cart items to delete
      if (cartItemsToDelete.length === 0) {
        console.warn("No cart items found for deletion");
        return; 
      }
    
      const deletionResult = await CartItem.deleteMany({ _id: { $in: cartItemsToDelete } });
      console.log("Deletion result:", deletionResult);
      
  
   
      user.cart = [];
      await user.save();
  
      res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  
