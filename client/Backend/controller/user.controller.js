import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const createdUser = new User({
      fullname,
      email,
      password: hashPassword,
    });

    await createdUser.save();

    // Send signup email
    const transporter = nodemailer.createTransport({
      service: 'Gmail', 
      auth: {
        user: 'bookzonekct@gmail.com',
        pass: 'afdm fprc dxdo khjk'
      }
    });

    const mailOptions = {
      from: 'bookzonekct@gmail.com',
      to: email,
      subject: 'Welcome to BookZone! Your Journey into the World of Books Begins Here!',
      text: `Dear ${fullname},\n\n 

      
      
      Welcome to BookZone! We’re thrilled to have you join our community of book lovers and avid readers.
      
      At BookZone, we believe that every book is a gateway to new worlds, ideas, and adventures. Whether you’re here to find the latest bestseller, a timeless classic, or a hidden gem, we’re here to help you discover the perfect read.
      
      Here’s a little of what you can expect as a member of our community:
      
      1. A Vast Collection of Books: From fiction to non-fiction, sci-fi to romance, self-help to biographies, we have a diverse collection to satisfy every reader’s taste.
      
      2. Book Reviews : Read what other members think and share your own reviews to help fellow readers find their next favorite book.
      
      If you have any questions or need assistance, our friendly customer support team is here to help. Just reply to this email or visit our Help Center.
      
      Once again, welcome to BookZone. We’re excited to accompany you on your reading journey!
      
      Happy Reading!
      
      Best regards,
      The BookZone Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: createdUser._id,
        fullname: createdUser.fullname,
        email: createdUser.email,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
