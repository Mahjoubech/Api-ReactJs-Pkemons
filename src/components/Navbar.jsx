import React from 'react';

function Navbar() {
  return (
    <header className="mb-8 text-center relative p-4">
      <h1 className="text-5xl md:text-6xl font-bold text-red-600 mb-2 yasrokh-text">
        Pokémon Monsters
      </h1>
      <p className="text-gray-300 mb-6">Click on any card to unleash its monstrous form</p>
      
      {/* Animated background elements */}
      <div className="fixed w-full h-full top-0 left-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500 rounded-full opacity-5 yasrokh-float"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-purple-500 rounded-full opacity-5 yasrokh-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-blue-500 rounded-full opacity-5 yasrokh-float" style={{animationDelay: '2s'}}></div>
      </div>
    </header>
  );
}

export default Navbar;