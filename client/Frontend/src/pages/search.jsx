import React, { useState } from "react";
import axios from "axios";
import SearchBox from "./searchbox";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Course from "../components/Course";

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (searchTerm) => {
    setLoading(true);
    const url = `http://localhost:4001/search/${searchTerm}`;
    axios
      .get(url)
      .then((response) => {
        const { redirectUrl } = response.data; 
        if (redirectUrl) {
          window.location.href = redirectUrl; // redirect to the URL received from the server
        } else {
          alert('No books found or Out Of Stock');
        }
        setLoading(false);
      })
      .catch((error) => {
        alert('No books found or Out Of Stock');
        console.log(error);
        setError(error);
        setLoading(false);
      });
    console.log("Searching for:", searchTerm);
  };

  return (
    <>
       <Navbar />
       <div style={{ textAlign: "right", marginTop: "100px", marginRight: "100px" }}>
         <SearchBox onSearch={handleSearch} />
       </div>
      <Course />
      <Footer />
    </>
  );
}

export default Search;
