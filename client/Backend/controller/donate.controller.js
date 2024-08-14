import Donation from '../model/donation.model.js';

// Controller function to handle donation submissions
export const donation = async (req, res) => {
    try {
        // Extract form data from request body
        const { name, price, category, image, title, description,email ,phone ,address,donor } = req.body;

        // Create a new Donation object
        const newDonation = new Donation({
            name,
            price,
            category,
            image,
            title,
            description,
            address,
            email,
            phone,
            donor
        });

        
        await newDonation.save();

      
        res.status(201).json({ message: 'Donation submitted successfully' });
    } catch (error) {
        
        res.status(500).json({ message: 'Internal server error' });
    }
};
