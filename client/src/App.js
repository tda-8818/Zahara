import React from 'react';

// Main App component to display the Zahara homepage.
const App = () => {
  return (
    <div className="bg-[#F9F7F5] font-serif text-[#1A1A1A] min-h-screen">
      
      {/* Navigation Bar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-8 py-6 flex items-center justify-between">
          <div className="text-3xl font-extralight tracking-widest uppercase">Zahara</div>
          <div className="hidden md:flex space-x-10 text-lg">
            <a href="#" className="hover:text-[#A38B52] transition-colors duration-300">Home</a>
            <a href="#" className="hover:text-[#A38B52] transition-colors duration-300">Shop</a>
            <a href="#" className="hover:text-[#A38B52] transition-colors duration-300">About</a>
            <a href="#" className="hover:text-[#A38B52] transition-colors duration-300">Contact</a>
          </div>
          <div className="flex items-center space-x-6">
            <button className="hidden md:block bg-transparent border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] px-6 py-2 rounded-none transition-colors duration-300 text-sm tracking-widest uppercase">
              Account
            </button>
            <button className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A38B52]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1A1A1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-96 md:h-[700px] flex items-center justify-center text-center">
        {/* Placeholder image from a service that provides images based on keywords */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?luxury-fashion,modest-activewear,woman')" }}
          role="img"
          aria-label="Woman wearing modest activewear running outdoors"
        ></div>
        <div className="relative z-10 p-12 rounded-lg bg-black bg-opacity-30 text-white">
          <h1 className="text-5xl md:text-7xl font-light mb-4 drop-shadow-md tracking-wider uppercase">Timeless Movement</h1>
          <p className="text-lg md:text-2xl drop-shadow-md font-sans">Elegance that transcends the everyday.</p>
          <button className="mt-8 bg-[#A38B52] hover:bg-opacity-80 text-white font-semibold py-3 px-10 rounded-none transition-colors duration-300 text-sm tracking-widest uppercase">
            Explore the Collection
          </button>
        </div>
      </section>

      {/* Product Highlight Section */}
      <section className="container mx-auto px-8 py-20">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-16 tracking-wider uppercase">The Zahara Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Product Card 1 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img
              src="https://source.unsplash.com/600x600/?luxury-modest-activewear,hijab,running"
              alt="Modest activewear outfit with hijab"
              className="w-full h-80 object-cover"
              role="img"
            />
            <div className="p-8">
              <h3 className="text-xl font-light mb-2 uppercase tracking-wide">The Zen Tunic</h3>
              <p className="text-[#1A1A1A] font-sans text-sm">Comfortable, breathable, and elegant.</p>
              <div className="mt-4 text-xl font-bold text-[#A38B52] tracking-wider">$79.99</div>
            </div>
          </div>
          {/* Product Card 2 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img
              src="https://source.unsplash.com/600x600/?luxury-modest-activewear,women,yoga"
              alt="Woman in a yoga pose wearing modest activewear"
              className="w-full h-80 object-cover"
              role="img"
            />
            <div className="p-8">
              <h3 className="text-xl font-light mb-2 uppercase tracking-wide">The Flow Trousers</h3>
              <p className="text-[#1A1A1A] font-sans text-sm">Designed for movement and flexibility.</p>
              <div className="mt-4 text-xl font-bold text-[#A38B52] tracking-wider">$64.50</div>
            </div>
          </div>
          {/* Product Card 3 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img
              src="https://source.unsplash.com/600x600/?luxury-modest-activewear,jogging,park"
              alt="Person jogging in the park wearing modest activewear"
              className="w-full h-80 object-cover"
              role="img"
            />
            <div className="p-8">
              <h3 className="text-xl font-light mb-2 uppercase tracking-wide">The Serenity Jacket</h3>
              <p className="text-[#1A1A1A] font-sans text-sm">A lightweight layer for any season.</p>
              <div className="mt-4 text-xl font-bold text-[#A38B52] tracking-wider">$99.00</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 mt-16">
        <div className="container mx-auto px-8 text-center text-[#1A1A1A] font-sans">
          <p className="text-sm">© 2025 Zahara. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
