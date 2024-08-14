import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Course from "../components/Course";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Details() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authUser] = useAuth();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    setLoading(true);
    const url = `http://localhost:4001/details/${id}`;
    axios
      .get(url)
      .then((response) => {
        setBook(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to fetch book details");
        setLoading(false);
      });
  }, [id]);

  const addToCart = async () => {
    try {
      const response = await axios.post(`http://localhost:4001/addcart/${id}`, {
        email: authUser.email,
      });
      console.log("Item added to cart:", response.data.cart);
      toast.success("Item Added to Cart");
    } catch (error) {
      console.error(
        "Failed to add item to cart:",
        error.response ? error.response.data.message : error.message
      );
    }
  };

  const handleReviewSubmit = async () => {
    try {
      // Send the new review to the server
      const response = await axios.post(`http://localhost:4001/addreview/${id}`, {
        review: newReview,
        email: authUser.email,
      });
      // Update the reviews state with the new review
      setReviews([...reviews, response.data.review]);
      // Clear the input field
      setNewReview("");
      toast.success("Review Added");
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };
  
  // Inside useEffect of Details component
useEffect(() => {
  // Fetch reviews
  axios.get(`http://localhost:4001/reviews/${id}`)
    .then((response) => {
      setReviews(response.data.reviews);
     
    })
    .catch((error) => {
      console.error("Failed to fetch reviews:", error);
    });
}, [id]);


  return (
    <>
      <Navbar />
      <div className="mt-16 container mx-auto mt-8 details-container custom-margin-top" style={{ marginTop: "100px" }}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {book && (
          <div className="details-content grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="details-image">
              <img style={{ margin: "0 50px" }} src={book.image} alt="Book" />
            </div>
            <div className="details-info">
              <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
              <h6>by-{book.name}</h6>
              <p className="text-xl mb-2">Price: ₹{book.price}</p>
              <p className="text-xl mb-2">Category: {book.category}</p>
              <p className="text-lg mb-4">Description: {book.description}</p>

              <div className="button-group">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 shadow-md">
                  Buy Now
                </button>
                <button
                  onClick={addToCart}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md">
                  Add to Cart
                </button>
              </div>

            
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
                {reviews.length === 0 ? (
  <p>No reviews yet.</p>
) : (
  <ul>
    {reviews.map((review, index) => (
      <li key={index}>
        {/* Assuming 'review' in the object contains the actual review text */}
        {review.review} - test@gmail.com 
        <li><br /></li>
      </li>
      
    ))}
  </ul>
)}


                {authUser && (
                  <div className="mt-4">
                    <textarea
                      className="w-full h-24 border border-gray-300 rounded p-2"
                      placeholder="Write your review..."
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                    />
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                      onClick={handleReviewSubmit}>
                      Submit Review
                    </button>
                  </div>
                )}
              </div>
             
            </div>
          </div>
        )}
      </div>
      <div className="related-books-section">{/* Add related books section here */}</div>
      <Course />
      <Footer />
    </>
  );
}

export default Details;
