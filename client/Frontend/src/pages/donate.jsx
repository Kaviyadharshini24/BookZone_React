import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Donate() {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: '',
    image: '',
    title: '',
    description: '',
    address: '',
    email: '',
    phone: '',
    donor: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      const response = await axios.post('http://localhost:4001/api/donate', formData);
      console.log('Book donated:', response.data);
      setFormSubmitted(true);
      setFormData({
        name: '',
        price: '',
        category: '',
        image: '',
        title: '',
        description: '',
        address: '',
        email: '',
        phone: '',
        donor: '',
      });
    } catch (error) {
      console.error('Error donating book:', error);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name) {
      errors.name = 'Name is required';
    }
    if (!formData.category) {
      errors.category = 'Category is required';
    }
    if (!formData.image) {
      errors.image = 'Image URL is required';
    }
    if (!formData.title) {
      errors.title = 'Title is required';
    }
    if (!formData.description) {
      errors.description = 'Description is required';
    }
    return errors;
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Give Book For Donation</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Charity Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input mt-1 block w-full rounded-md border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-500`}
            />
            {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-input mt-1 block w-full rounded-md border ${formErrors.title ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-500`}
            />
            {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`form-input mt-1 block w-full rounded-md border ${formErrors.category ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-500`}
            />
            {formErrors.category && <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image URL:</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={`form-input mt-1 block w-full rounded-md border ${formErrors.image ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-500`}
            />
            {formErrors.image && <p className="text-red-500 text-sm mt-1">{formErrors.image}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`form-textarea mt-1 block w-full rounded-md border ${formErrors.description ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-500`}
            ></textarea>
            {formErrors.description && <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
          </div>
          <div className="mb-4">
          <label className="block text-gray-700">Name of Donor:</label>
          <input
            type="text"
            name="donor"
            value={formData.donor}
            onChange={handleChange}
            className="form-input mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone no of Donor:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email of Donor:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address of Donor:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-input mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
          />
        </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
        {formSubmitted && (
          <p className="text-green-500 mt-4">Book Donated successfully!</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Donate;
