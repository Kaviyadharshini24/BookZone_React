import express from 'express';
import Order from '../model/order.model.js';
import nodemailer from "nodemailer";

const router = express.Router();

router.post('/save', async (req, res) => {
  const { name, email, address, contact, amount, paymentStatus } = req.body;

  try {
    const newOrder = new Order({
      name,
      email,
      address,
      contact,
      amount,
      paymentStatus,
    });

    await newOrder.save();

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // You can use other services
      auth: {
        user: 'bookzonekct@gmail.com',
        pass: 'afdm fprc dxdo khjk'
      }
    });

    const mailOptions = {
      from: 'bookzonekct@gmail.com',
      to: email,
      subject: 'Order Confirmation',
      text: `Dear ${name},\n\n

      Thank you for your purchase at Bookzone !
      
      We are excited to confirm that your order has been successfully placed.

      YOUR TOTAL AMOUNT:₹${amount} 
      SHIPPING INFORMATION:${address}
       
      If you have any questions or need assistance, please do not hesitate to contact our customer support team  or Customer Service . We are here to help!

      Thank you for shopping with us. We hope you enjoy your new books!
      
      Happy reading!
      
      Warm regards,
      The BookZone Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, message: 'Error sending confirmation email' });
      } else {
        console.log('Email sent:', info.response);
        res.status(201).json({ success: true, message: 'Order saved successfully' });
      }
    });

  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ success: false, message: 'Error saving order', error });
  }
});

export default router;
