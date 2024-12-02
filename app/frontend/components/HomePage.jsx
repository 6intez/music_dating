import React from "react";
import PhoneImage from "../../assets/images/phone-2.3YMrk_V5.png"; // Path to image
import CatImage from "../../assets/images/1813100-2196f3.png";
import HeartImage from "../../assets/images/2756906-2196f3.png";
import EarPhonesImage from "../../assets/images/2781422-2196f3.png";
import PlastImage from "../../assets/images/plast.jpg";

const HomePage = () => {


  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="relative bg-cover bg-center" style={{ backgroundImage: `url(${PlastImage})` }}>

        <div className="bg-black bg-opacity-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Empower Your Music Journey</h1>
            <p className="text-lg mb-8">Connect with another musicians and showcase your talent on the ultimate music platform.</p>
            <a
              href="/users/sign_in"
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-semibold transition duration-300"
            >
              Get Started Now
            </a>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <img
                src={CatImage}
                alt="Feature 1"
                className="mx-auto mb-4 rounded-lg shadow-lg w-36 h-36"
              />
              <h3 className="text-xl font-semibold mb-2">Showcase Your Music</h3>
              <p className="text-gray-400">Upload your tracks and let the world hear your music.</p>
            </div>
            {/* Feature 2 */}
            <div className="text-center">
              <img
                src={HeartImage}
                alt="Feature 2"
                className="mx-auto mb-4 rounded-lg shadow-lg w-36 h-36" 
              />
              <h3 className="text-xl font-semibold mb-2">Increase the number of your feats</h3>
              <p className="text-gray-400">Reach new highs and work with musicians you want.</p>
            </div>
            {/* Feature 3 */}
            <div className="text-center">
              <img
                src={EarPhonesImage}
                alt="Feature 3"
                className="mx-auto mb-4 rounded-lg shadow-lg w-36 h-36"
              />
              <h3 className="text-xl font-semibold mb-2">Full Free Use</h3>
              <p className="text-gray-400">You can use all opportunities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Artists Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
              <p className="italic mb-4">
                "Revolutionized how I share my music. Connecting with fans has never been easier!"
              </p>
              <h4 className="font-semibold">— Artist Name</h4>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
              <p className="italic mb-4">
                "A fantastic platform that helped me monetize my music effortlessly."
              </p>
              <h4 className="font-semibold">— Another Artist</h4>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
              <p className="italic mb-4">
                "The best way to grow your fanbase and showcase your talent!"
              </p>
              <h4 className="font-semibold">— Famous Musician</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center bg-gradient-to-r from-blue-500 to-purple-500">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <a
          href="/users/sign_in"
          className="bg-white text-blue-500 py-3 px-6 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
        >
          Join Now
        </a>
      </section>

    
    </div>
  );
};

export default HomePage;
