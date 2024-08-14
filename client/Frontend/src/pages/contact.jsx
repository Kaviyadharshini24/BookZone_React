import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import premiumImage from "../assets/contact.jpg";

function Contact() {
  return (
    <>
      <Navbar />
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <div className="flex items-center border border-gray-300 rounded-lg p-8">
            <div className="w-1/2">
              <div className="p-4">
                <h2 className="text-3xl font-bold mb-4 text-blue-600">Contact Us</h2>
                <p className="text-gray-700 mb-4">
                Have a question about an order, a listing, or our platform in general? Our dedicated customer support team is ready to help. You can reach us via email at support@bookzone.in 
                </p>
                <p className="text-gray-700 mb-4">
                Our customer support team is available to assist you from 9.00 am to 7.00 pm(week days).<b> Please note:</b> That responses may be delayed outside of business hours and during public holidays.
                </p>
              </div>
            </div>
            <div className="w-1/2">
              <img
                src={premiumImage}
                alt="Premium Image"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>


      <section className="bg-gray-200 py-16">
        <div className="container mx-auto">
          <div className="flex items-center border border-gray-300 rounded-lg p-8">
            <div className="w-1/2">
              <div className="p-4">
                <h2 className="text-3xl font-bold mb-4 text-blue-600">Contact Details</h2>
                <p className="text-gray-700 mb-4">
                  Address: kct college,
                  coimbatore-641049
                </p>
                <p className="text-gray-700 mb-4">
                  Phone: 0422-4576908
                </p>
                <p className="text-gray-700 mb-4">
                  Email: info@bookzone.com
                </p>
              </div>
            </div>
            <div className="w-1/2 flex justify-center items-center">
              <div className="rounded-lg overflow-hidden shadow-md">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62654.103623434865!2d76.94492670669226!3d11.047512140001944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f81b7514a15f%3A0x155e29f8d14154fc!2sKumaraguru%20College%20of%20Technology!5e0!3m2!1sen!2sin!4v1715604141552!5m2!1sen!2sin" width="800" height="300" style={{border:'0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;
