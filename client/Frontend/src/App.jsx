import React from "react";
import Home from "./home/Home";
import AboutUs from "./pages/about";
import Contact from "./pages/contact";
import Sell from "./pages/sell";
import Donate from "./pages/donate";
import Details from "./pages/details";
import SearchBox from "./pages/searchbox";
import Search from "./pages/search";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Cards from "./components/Cards";
import CartPage from "./pages/cart";


function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/cards" element={<Cards />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/donate" element={<Donate />} /> 
          <Route path="/cart" element={<CartPage />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/search' element={<Search />} />
          <Route path="/searchbox" element={<SearchBox />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
