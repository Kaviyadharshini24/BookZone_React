// models/CartItem.js
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    quantity: { type: Number, default: 1 },
});

const CartItem = mongoose.model('CartItem', cartItemSchema);
export default CartItem;
