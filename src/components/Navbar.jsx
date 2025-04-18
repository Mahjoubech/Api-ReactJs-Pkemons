import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll listener
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-4">
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <img
                src="/pokeball.svg"
                alt="Pokeball"
                className="w-8 h-8"
              />
            </motion.div>
            <div>
              <motion.h1 
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                PokéVerse
              </motion.h1>
              <motion.p 
                className="text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Discover Your Perfect Pokemon
              </motion.p>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/favorites">Favorites</NavLink>
            <NavLink href="/types">Types</NavLink>
          </nav>

          <motion.button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      to={href}
      className="relative text-gray-300 hover:text-white transition-colors group"
    >
      {children}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
        initial={false}
        transition={{ duration: 0.2 }}
      />
    </Link>
  );
}

export default Navbar;