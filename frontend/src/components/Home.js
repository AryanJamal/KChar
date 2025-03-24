import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to KChar</h1>
          <p className="text-xl mb-8">
            Kurdish Character Recognition - Revolutionizing the way we interact with Kurdish scripts.
          </p>
          <a
            href="/tools"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose KChar?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 m-3 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4">Accurate Recognition</h3>
            <p className="text-gray-700">
              Our advanced algorithms ensure high accuracy in recognizing Kurdish characters.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 m-3 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4">User-Friendly Tools</h3>
            <p className="text-gray-700">
              Easy-to-use tools designed for both beginners and experts.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 m-3 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4">Support for All Dialects</h3>
            <p className="text-gray-700">
              We support multiple Kurdish dialects, making it versatile for all users.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-xl mb-8">
            Join us today and experience the power of Kurdish Character Recognition.
          </p>
          <a
            href="/login-register"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
          >
            Sign Up Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;