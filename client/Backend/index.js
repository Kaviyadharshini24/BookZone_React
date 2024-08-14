import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Razorpay from 'razorpay'
import crypto from 'crypto'
import userRoute from './route/user.route.js';



import User from './model/user.model.js';
import sellRoute from './route/sell.route.js';
import bookRoute from './route/book.route.js';
import donateRoute from './route/donate.route.js';
import Book from './model/book.model.js';
import CartItem from './model/cart.model.js';
import orderRoutes from './route/order.route.js'



dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Error handling function
const handleServerError = (res, error) => {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
};


app.use('/user', userRoute);

app.use('/api/order', orderRoutes);
app.use('/api/sell', sellRoute);
app.use('/api/donate', donateRoute);
app.use('/book', bookRoute);

app.get("/details/:id", async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        res.json({ data: book });
    } catch (error) {
        handleServerError(res, error);
    }
});

app.get("/search/:searchTerm", async (req, res) => {
    try {
        const booksearchTerm = req.params.searchTerm;
        
        const books = await Book.find({ title: { $regex: booksearchTerm, $options: "i" } });
        
        if (books.length === 0) {
            return res.status(404).json({ error: "No books found" });
        }
        
        const firstResultId = books[0]._id;
        const redirectUrl = `http://localhost:5173/details/${firstResultId}`;
        
        res.json({ redirectUrl });
    } catch (error) {
        handleServerError(res, error);
    }
});


app.post('/addcart/:productId', async (req, res) => {
    const { productId } = req.params;
    const { email } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let cartItem = await CartItem.findOne({ productId });

        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cartItem = new CartItem({ productId });
            user.cart.push(cartItem);
        }

        await cartItem.save();
        await user.save();

        res.status(200).json({ message: 'Item added to cart', cart: user.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.get('/cart/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email }).populate('cart');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ cart: user.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

import Review from './model/review.model.js';

// Add review endpoint
app.post('/addreview/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const { email, review } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newReview = new Review({
      bookId,
      user: user._id,
      review
    });

    await newReview.save();

    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch reviews endpoint
app.get('/reviews/:bookId', async (req, res) => {
    const { bookId } = req.params;
  
    try {
      const reviews = await Review.find({ bookId }).populate('user', 'email'); // Assuming 'user' field in Review model is ObjectId referencing User model
      res.status(200).json({ reviews });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Get cart items for a user
app.get('/api/cart/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email }).populate('cart'); // Populate cart items
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.cart);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// (Optional) Get a specific product by ID (if not already implemented elsewhere)
app.get('/api/products/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Book.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


const razorpay = new Razorpay({
  key_id: 'rzp_test_HAcecAK39GRy0O',
  key_secret: 'doOZdiJokcymPEczItvmp4lv',
});
const generateRandomOrderId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

app.post('/api/payment/order', async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: amount, // amount in the smallest currency unit
    currency: 'INR',
    receipt: generateRandomOrderId(), // Generate a random 6-digit receipt/order ID
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, keyId: razorpay.key_id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Error creating order');
  }
});

app.post('/api/payment/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const expectedSignature = crypto.createHmac('sha256', razorpay.key_secret)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (razorpay_signature === expectedSignature) {
    // Save the payment information in the database (not implemented here)
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
