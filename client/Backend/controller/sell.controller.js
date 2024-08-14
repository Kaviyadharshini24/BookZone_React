import Book from "../model/book.model.js";

export const sell = async (req, res) => {
  try {
    const { name, price, category, image, title, description ,seller ,email ,phone ,address } = req.body;

    // basic validation
    if (!name || !price || !category || !image || !title || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // create a new book instance
    const newBook = new Book({
      name,
      price,
      category,
      image,
      title,
      description,
      address,
      email,
      phone,
      seller,
    });

    // save the book to the database
    await newBook.save();

    // return success response
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
