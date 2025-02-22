import { FC } from 'react';

const Home: FC = () => {
  return (
    <div>
      {/* Header Section */}
      <header className="bg-white shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">yoPretty</h1>
          <nav>
            <ul className="flex space-x-8">
              <li><a href="#services" className="text-gray-600 hover:text-gray-800">Services</a></li>
              <li><a href="#how-it-works" className="text-gray-600 hover:text-gray-800">How It Works</a></li>
              <li><a href="#pricing" className="text-gray-600 hover:text-gray-800">Pricing</a></li>
              <li><a href="/login" className="text-gray-600 hover:text-gray-800">Login</a></li>
              <li><a href="/register" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Sign Up</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('/path/to/hero-image.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="max-w-screen-xl mx-auto text-center text-white relative z-10 pt-32">
          <h2 className="text-5xl font-bold leading-tight mb-6">Find & Book Beauty Services Effortlessly</h2>
          <p className="text-lg mb-8">Browse beauty services, view available slots, and book your appointment instantly.</p>
          <div>
            <a href="#services" className="bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-600">Start Booking Now</a>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-100">
        <div className="max-w-screen-xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-gray-800 mb-12">How It Works</h3>
          <div className="flex justify-around">
            <div className="space-y-4">
              <div className="text-6xl text-blue-500">1</div>
              <h4 className="text-xl font-semibold">Browse Available Services</h4>
              <p className="text-gray-600">Explore a wide variety of beauty services in your area.</p>
            </div>
            <div className="space-y-4">
              <div className="text-6xl text-blue-500">2</div>
              <h4 className="text-xl font-semibold">Select Your Service Provider</h4>
              <p className="text-gray-600">Choose the service provider that best fits your needs.</p>
            </div>
            <div className="space-y-4">
              <div className="text-6xl text-blue-500">3</div>
              <h4 className="text-xl font-semibold">Book Your Appointment</h4>
              <p className="text-gray-600">Pick an available time slot and confirm your appointment instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section id="services" className="py-16">
        <div className="max-w-screen-xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-gray-800 mb-12">Popular Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <img src="/path/to/service1.jpg" alt="Service 1" className="w-full h-48 object-cover rounded-lg mb-6"/>
              <h4 className="text-xl font-semibold mb-2">Hair Styling</h4>
              <p className="text-gray-600 mb-4">Get your hair styled by top professionals.</p>
              <a href="#booking" className="text-blue-500 hover:underline">Book Now</a>
            </div>
            {/* More service cards */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-screen-xl mx-auto text-center">
          <p>&copy; 2025 yoPretty. All rights reserved.</p>
          <div className="mt-4">
            <a href="#privacy-policy" className="text-gray-400 hover:text-white mr-6">Privacy Policy</a>
            <a href="#terms-of-service" className="text-gray-400 hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
