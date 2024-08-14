import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import premiumImage from "../assets/bookstore.avif";
import premiumImage2 from  "../assets/bs.jpg";

function AboutUs() {
  return (
    <>
      <Navbar />
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto flex items-center">
          <div className="w-1/2">
            <div className="p-4">
              <h2 className="text-3xl font-bold mb-4 text-blue-600">About Us</h2>
              <p className="text-gray-700 mb-4">
              At BookZone, we're passionate about books. We believe that everyone should have access to affordable reading materials,
               and that used books deserve a second chance to bring joy to new readers. That's why we've created a platform that 
               connects book lovers across India, making it easy and convenient to buy and sell preloved books.
              </p>
              <p className="text-gray-700 mb-4">
              Our mission is simple: to make reading more accessible and sustainable. By providing a marketplace for secondhand books,
             we're not only helping readers save money but also reducing waste and promoting eco-friendly practices. We believe that every 
             book has a story to tell and that by extending its lifespan through reuse, we can create a more vibrant and inclusive reading community.
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <img
              src={premiumImage}
              alt="Premium Image"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto flex items-center">
        <div className="w-1/2">
            <img
              src={premiumImage2}
              alt="Premium Image"
              className="w-full h-auto"
            />
          </div>
          <div className="w-1/2">
            <div className="p-4">
              <h2 className="text-3xl font-bold mb-4 text-blue-600"></h2>
              <p className="text-gray-700 mb-4">
              What sets us apart from other online bookstores is our commitment to customer satisfaction. We strive to provide a seamless
              shopping experience for buyers and sellers alike, with a user-friendly interface, secure payment options, and prompt customer support. Whether you're looking to declutter
              your bookshelf or discover your next literary treasure, BookZone is here to help.
              </p>
              <p className="text-gray-700 mb-4">
              Join us in our mission to make reading more affordable, sustainable, and enjoyable for everyone.
              Browse our extensive collection of secondhand books, or list your own books for sale – the choice is yours.
              Together, we can build a brighter future for books and readers everywhere.
              Thank you for choosing BookZone. Happy reading!
              </p>
            </div>
          </div>
          
        </div>
      </section>

   

      <Footer />
    </>
  );
}

export default AboutUs;
