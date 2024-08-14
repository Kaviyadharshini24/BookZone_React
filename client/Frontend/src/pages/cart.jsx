import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider'; // assuming context for user authentication
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from 'react-hot-toast';

const CartPage = () => {
  const [authUser] = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    email: '',
    address: '',
    contact: ''
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      if (authUser) {
        try {
          const response = await axios.get(`http://localhost:4001/api/cart/${authUser.email}`);
          const fetchedCartItems = response.data;

          // fetch product details for each cart item
          const productDetails = await Promise.all(
            fetchedCartItems.map(async (cartItem) => {
              const productResponse = await axios.get(`http://localhost:4001/api/products/${cartItem.productId}`);
              return { ...cartItem, ...productResponse.data }; // Combine cart item data with product details
            })
          );

          setCartItems(productDetails);
        } catch (error) {
          console.error('Error fetching cart items:', error);
          setCartItems([]); // set to empty array or display an error message
        }
      }
    };

    fetchCartItems();
  }, [authUser]);

  const calculateTotalCost = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  useEffect(() => {
    const loadRazorpayScript = async () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []); // load script only once on component mount

  const handleProceedToBuy = async (totalCost) => {
    const amount = totalCost * 100; // convert to paise (1 rupee = 100 paise)
  
    try {
      // fetch order details from backend
      const orderResponse = await axios.post('http://localhost:4001/api/payment/order', { amount });
      const { orderId, keyId } = orderResponse.data;
  
      const options = {
        key: keyId, // razorpay key id from db
        amount,
        currency: 'INR',
        name: 'Bookzone',
        description: 'Purchase Description',
        order_id: orderId,
        handler: async (response) => {
          // update payment status in db
          const verificationResponse = await axios.post('http://localhost:4001/api/payment/verify', response);
          if (verificationResponse.data.success) {
            // save order details to the database
            const orderSaveResponse = await axios.post('http://localhost:4001/api/order/save', {
              name: checkoutData.name,
              email: checkoutData.email,
              address: checkoutData.address,
              contact: checkoutData.contact,
              amount: totalCost, // amount in rupees
              paymentStatus: 'Success'
            });
  
            if (orderSaveResponse.data.success) {
              // Clear the cart for the user
              await axios.put(`http://localhost:4001/user/clearcart/${authUser.email}`);
              
           
              toast.success("Payment successful! Your order has been placed.");
            } else {
              alert('Payment was successful, but there was an error saving the order. Please contact support.');
            }
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: checkoutData.name,
          email: checkoutData.email,
          contact: checkoutData.contact,
        },
        theme: {
          color: '#3399cc',
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Error processing payment. Please try again.');
    }
  };
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData({ ...checkoutData, [name]: value });
  };

  const handleSubmitCheckout = (e) => {
    e.preventDefault();
    setShowCheckoutForm(false);
    handleProceedToBuy(calculateTotalCost());
  };
  

  return (
    <>
      <Navbar />
      {cartItems.length > 0 ? (
        <div style={{ marginTop: '150px' }}>
          <table style={{ width: '80vw' }} className="table-auto mx-auto rounded-lg shadow m-4">
            <thead className="bg-blue-300 text-white">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id} className="border-b border-gray-200">
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2 text-center">{item.quantity}</td>
                  <td className="px-4 py-2 text-center">&#8377;{item.price.toFixed(2)}</td>
                  <td className="px-4 py-2 text-center">&#8377;{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-200">
                <td colSpan="3" className="text-right px-4 py-2">
                  Total Cost:
                </td>
                <td className="px-4 py-2 text-center">&#8377;{calculateTotalCost().toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 m-4 mr-16 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowCheckoutForm(true)}
            >
              Proceed to Checkout
            </button>
          </div>

          {showCheckoutForm && (
            <form onSubmit={handleSubmitCheckout} className="max-w-lg mx-auto p-4 shadow-lg rounded-lg bg-white">
              <h2 className="text-2xl font-bold mb-4">Checkout Form</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={checkoutData.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={checkoutData.email}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={checkoutData.address}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={checkoutData.contact}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Pay Now
              </button>
            </form>
          )}
        </div>
      ) : (
        <p className="text-center p-4" style={{marginTop: '150px'}}>Your cart is empty.</p>
      )}

      <Footer />
    </>
  );
};

export default CartPage;
