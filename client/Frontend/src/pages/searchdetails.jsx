import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Course from "../components/Course";

function Searchdetails() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [book, setBook] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4001/details/:id"); 
        setBook(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-16 container mx-auto mt-8 details-container">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {book && (
          <div className="details-content grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="details-image">
              <img src={book.image} alt="Book" />
            </div>
            <div className="details-info">
              <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
              <p className="text-xl mb-2">Price: ₹{book.price}</p>
              <p className="text-xl mb-2">Category: {book.category}</p>
              <p className="text-lg mb-4">Description: {book.description}</p>

              <div className="button-group">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 shadow-md">
                  Buy Now
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="related-books-section">
        {/* Add related books section here */}
      </div>
      <Course />
      <Footer />
    </>
  );
}

export default Searchdetails;
