import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showingDetails, setShowingDetails] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        // Fetch the first 100 Pokemon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
        const data = await response.json();
        
        // Fetch detailed data for each Pokemon
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            return await detailResponse.json();
          })
        );
        
        setPokemon(pokemonDetails);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch Pokémon data');
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const openDetails = (poke) => {
    setSelectedPokemon(poke);
    // Add slight delay for the transformation effect
    setTimeout(() => {
      setShowingDetails(true);
    }, 100);
  };

  const closeDetails = () => {
    setShowingDetails(false);
    // Add delay before completely removing the modal
    setTimeout(() => {
      setSelectedPokemon(null);
    }, 500);
  };

  const getTypeColor = (type) => {
    const typeColors = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-200',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-700',
      flying: 'bg-indigo-300',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-800',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-800',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
    };
    return typeColors[type] || 'bg-gray-400';
  };

  const getTypeGradient = (type) => {
    const typeGradients = {
      normal: 'from-gray-300 to-gray-500',
      fire: 'from-red-500 to-yellow-600',
      water: 'from-blue-500 to-blue-800',
      electric: 'from-yellow-300 to-yellow-600',
      grass: 'from-green-400 to-green-700',
      ice: 'from-blue-200 to-blue-500',
      fighting: 'from-red-600 to-red-900',
      poison: 'from-purple-400 to-purple-800',
      ground: 'from-yellow-600 to-yellow-900',
      flying: 'from-indigo-300 to-indigo-600',
      psychic: 'from-pink-400 to-purple-600',
      bug: 'from-green-400 to-green-700',
      rock: 'from-yellow-700 to-yellow-900',
      ghost: 'from-purple-500 to-indigo-900',
      dragon: 'from-indigo-500 to-purple-800',
      dark: 'from-gray-700 to-gray-900',
      steel: 'from-gray-400 to-blue-800',
      fairy: 'from-pink-300 to-pink-600',
    };
    return typeGradients[type] || 'from-gray-300 to-gray-500';
  };

  // Get monster version of Pokemon
  const getMonsterImage = (poke) => {
    // Try to get alternative art that looks more monstrous
    // Order of preference: shiny, dream world, home, other versions
    if (poke.sprites.other?.home?.front_default) {
      return poke.sprites.other.home.front_default;
    } else if (poke.sprites.other?.['official-artwork']?.front_shiny) {
      return poke.sprites.other['official-artwork'].front_shiny;
    } else if (poke.sprites.other?.dream_world?.front_default) {
      return poke.sprites.other.dream_world.front_default;
    } else if (poke.sprites.front_shiny) {
      return poke.sprites.front_shiny;
    } else {
      return poke.sprites.other?.['official-artwork']?.front_default || poke.sprites.front_default;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-800 to-black">
        <div className="text-center">
          <div className="relative w-28 h-28 mx-auto">
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-white border-t-red-600 animate-spin"></div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-white rounded-full"></div>
              <div className="absolute w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          <p className="mt-6 text-2xl font-bold text-white animate-pulse">Catching Pokémon...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-800 to-black">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg border border-red-500 text-white">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p>{error}</p>
          <button 
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8 overflow-hidden">
      <header className="mb-8 text-center relative">
        <h1 className="text-5xl md:text-6xl font-bold text-red-600 mb-2 yasrokh-text">Pokémon Monsters</h1>
        <p className="text-gray-300 mb-6">Click on any card to unleash its monstrous form</p>
        
        {/* Animated elements in the background */}
        <div className="fixed w-full h-full top-0 left-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-500 rounded-full opacity-5 yasrokh-float"></div>
          <div className="absolute bottom-40 right-20 w-48 h-48 bg-purple-500 rounded-full opacity-5 yasrokh-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-blue-500 rounded-full opacity-5 yasrokh-float" style={{animationDelay: '2s'}}></div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {pokemon.map((poke) => {
          const mainType = poke.types[0].type.name;
          const isHovered = hoveredCard === poke.id;
          
          return (
            <div 
              key={poke.id}
              className={`yasrokh-card bg-gradient-to-br ${getTypeGradient(mainType)} rounded-lg shadow-xl overflow-hidden transition-all duration-500`}
              onMouseEnter={() => setHoveredCard(poke.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => openDetails(poke)}
            >
              <div className="p-4 relative yasrokh-card-inner">
                {/* Card top section - number and HP */}
                <div className="flex justify-between items-center mb-2">
                  <div className="bg-black bg-opacity-30 px-2 py-1 rounded-full">
                    <span className="text-xs font-bold text-white">#{poke.id.toString().padStart(3, '0')}</span>
                  </div>
                  <div className="bg-black bg-opacity-30 px-2 py-1 rounded-full">
                    <span className="text-xs font-bold text-white">{poke.stats[0].base_stat} HP</span>
                  </div>
                </div>
                
                {/* Pokemon image with effects */}
                <div className="relative flex justify-center items-center h-32 mb-2 overflow-hidden">
                  {/* Lightning effects for electric types */}
                  {mainType === 'electric' && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i}
                          className="absolute yasrokh-lightning"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                  
                  {/* Fire effects */}
                  {mainType === 'fire' && (
                    <div className="absolute bottom-0 left-0 w-full pointer-events-none">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i}
                          className="absolute bottom-0 yasrokh-fire"
                          style={{
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${0.8 + Math.random()}s`,
                            width: `${10 + Math.random() * 15}px`,
                            height: `${20 + Math.random() * 30}px`,
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                  
                  <img
                    src={poke.sprites.other?.['official-artwork']?.front_default || poke.sprites.front_default}
                    alt={poke.name}
                    className={`h-28 w-28 object-contain z-10 transition-all duration-500 ${
                      isHovered ? 'yasrokh-monster-hover' : ''
                    }`}
                  />
                  
                  {/* Shadow beneath the Pokemon */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-black opacity-30 rounded-full blur"></div>
                </div>
                
                {/* Pokemon name and type */}
                <div className="text-center">
                  <h2 className="text-xl font-bold capitalize text-white mb-2 yasrokh-glow">{poke.name}</h2>
                  <div className="flex flex-wrap justify-center gap-2">
                    {poke.types.map((type) => (
                      <span
                        key={type.type.name}
                        className={`${getTypeColor(type.type.name)} text-white text-xs font-bold uppercase px-2 py-1 rounded-full transition-transform duration-300 yasrokh-badge ${
                          isHovered ? 'scale-110' : ''
                        }`}
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Quick stats info that appears on hover */}
                <div className={`mt-3 grid grid-cols-2 gap-2 transition-all duration-300 ${
                  isHovered ? 'opacity-100 yasrokh-slide-in' : 'opacity-0 translate-y-10'
                }`}>
                  <div className="text-center p-1 bg-black bg-opacity-30 rounded">
                    <span className="text-xs text-gray-200">ATK</span>
                    <p className="font-bold text-white">{poke.stats[1].base_stat}</p>
                  </div>
                  <div className="text-center p-1 bg-black bg-opacity-30 rounded">
                    <span className="text-xs text-gray-200">DEF</span>
                    <p className="font-bold text-white">{poke.stats[2].base_stat}</p>
                  </div>
                </div>
                
                {/* Monstrous reveal overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 flex flex-col justify-end items-center transition-opacity duration-300 ${
                  isHovered ? 'opacity-70' : ''
                }`}>
                  <div className="text-white font-bold mb-3 yasrokh-pulse">REVEAL MONSTER FORM</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pokemon Detail Modal with Monster Transformation */}
      {selectedPokemon && (
        <div 
          className={`fixed inset-0 bg-black flex items-center justify-center p-4 z-50 transition-all duration-500 ${
            showingDetails ? 'bg-opacity-80' : 'bg-opacity-0'
          }`}
          onClick={closeDetails}
        >
          <div 
            className={`relative bg-gradient-to-br ${getTypeGradient(selectedPokemon.types[0].type.name)} rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden transition-all duration-500 ${
              showingDetails ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Monster transformation effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Electricity sparks for all monster forms */}
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute yasrokh-spark"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      width: `${1 + Math.random() * 2}px`,
                      height: `${5 + Math.random() * 15}px`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${0.5 + Math.random() * 0.5}s`
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Type-specific background effects */}
              {selectedPokemon.types.map((type, index) => {
                if (type.type.name === 'fire') {
                  return (
                    <div key={index} className="absolute inset-0">
                      {[...Array(20)].map((_, i) => (
                        <div 
                          key={i}
                          className="absolute yasrokh-ember"
                          style={{
                            bottom: "-20px",
                            left: `${Math.random() * 100}%`,
                            width: `${2 + Math.random() * 4}px`,
                            height: `${2 + Math.random() * 4}px`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${1 + Math.random() * 2}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  );
                }
                if (type.type.name === 'water') {
                  return (
                    <div key={index} className="absolute inset-0 yasrokh-water-overlay"></div>
                  );
                }
                if (type.type.name === 'ghost' || type.type.name === 'psychic') {
                  return (
                    <div key={index} className="absolute inset-0 yasrokh-ghost-mist"></div>
                  );
                }
                return null;
              })}
            </div>
            
            {/* Modal Header with close button */}
            <div className="relative h-64 flex justify-center items-center yasrokh-header">
              <button 
                className="absolute top-4 right-4 bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition-all z-50 yasrokh-close"
                onClick={closeDetails}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Monster transformation */}
              <div className="relative">
                <div className={`transition-all duration-1000 ${showingDetails ? 'yasrokh-monster-transform' : 'scale-75 opacity-0'}`}>
                  <img
                    src={getMonsterImage(selectedPokemon)}
                    alt={selectedPokemon.name}
                    className="h-48 w-48 object-contain yasrokh-monster"
                  />
                  
                  {/* Monster effects based on type */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    {selectedPokemon.types.some(t => ['electric', 'psychic'].includes(t.type.name)) && (
                      <div className="yasrokh-aura"></div>
                    )}
                  </div>
                </div>
                
                {/* Scary name display */}
                <div className={`absolute -bottom-6 left-0 right-0 text-center transition-all duration-500 ${
                  showingDetails ? 'opacity-100' : 'opacity-0'
                }`}>
                  <h1 className="text-3xl font-bold text-white uppercase yasrokh-monster-name">{selectedPokemon.name}</h1>
                </div>
              </div>
            </div>

            {/* Pokemon Monster Info */}
            <div className="p-6 pt-10 bg-gradient-to-b from-transparent to-black">
              <div className="flex justify-center gap-3 mb-6 yasrokh-fadeIn" style={{animationDelay: '0.3s'}}>
                {selectedPokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`${getTypeColor(type.type.name)} text-white text-sm font-bold uppercase px-3 py-1 rounded-full yasrokh-badge-pulse`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>

              {/* Monster Stats */}
              <div className="mb-6 yasrokh-fadeIn" style={{animationDelay: '0.5s'}}>
                <h2 className="text-xl font-bold mb-3 text-red-500 uppercase">Monster Powers</h2>
                <div className="space-y-3">
                  {selectedPokemon.stats.map((stat, index) => (
                    <div key={stat.stat.name} className="yasrokh-fadeIn" style={{animationDelay: `${0.6 + index * 0.1}s`}}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium capitalize text-gray-300">
                          {stat.stat.name.replace('-', ' ')}
                        </span>
                        <span className="text-sm font-medium text-gray-300">{stat.base_stat}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="yasrokh-stat-bar h-2 rounded-full"
                          style={{ 
                            width: '0%',
                            '--target-width': `${Math.min(100, (stat.base_stat / 255) * 100)}%`,
                            backgroundColor: stat.stat.name.includes('attack') ? '#ef4444' : 
                                            stat.stat.name.includes('defense') ? '#3b82f6' : 
                                            stat.stat.name.includes('speed') ? '#10b981' : '#f59e0b'
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monster Abilities */}
              <div className="mb-6 yasrokh-fadeIn" style={{animationDelay: '0.8s'}}>
                <h2 className="text-xl font-bold mb-3 text-red-500 uppercase">Dark Powers</h2>
                <div className="grid grid-cols-2 gap-2">
                  {selectedPokemon.abilities.map((ability, index) => (
                    <div 
                      key={ability.ability.name}
                      className="bg-black bg-opacity-50 p-3 rounded-lg border border-gray-700 yasrokh-ability"
                      style={{animationDelay: `${0.9 + index * 0.1}s`}}
                    >
                      <p className="capitalize font-medium text-white">
                        {ability.ability.name.split('-').join(' ')}
                        {ability.is_hidden && <span className="text-xs text-red-400 ml-1">(Hidden)</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Monster Evolution & Weaknesses */}
              <div className="grid grid-cols-2 gap-4 yasrokh-fadeIn" style={{animationDelay: '1s'}}>
                <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-bold text-red-500 mb-2 uppercase">Monster Size</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400">Height</p>
                      <p className="text-white font-bold">{selectedPokemon.height / 10} m</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Weight</p>
                      <p className="text-white font-bold">{selectedPokemon.weight / 10} kg</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-bold text-red-500 mb-2 uppercase">Base Experience</h3>
                  <div className="flex items-center">
                    <div className="yasrokh-exp-orb mr-3"></div>
                    <span className="text-2xl font-bold text-white">{selectedPokemon.base_experience || '???'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .yasrokh-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
          opacity: 0;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .yasrokh-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes float {
          0% { transform: translate(0, 0); }
          25% { transform: translate(5px, -5px); }
          50% { transform: translate(0, -10px); }
          75% { transform: translate(-5px, -5px); }
          100% { transform: translate(0, 0); }
        }
        
        .yasrokh-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        .yasrokh-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes slide-in {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .yasrokh-slide-in {
          animation: slide-in 0.3s forwards;
        }
        
        .yasrokh-card {
          position: relative;
          transition: all 0.3s ease;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .yasrokh-card:hover {
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }
        
        .yasrokh-card-inner {
          transition: all 0.5s ease;
        }
        
        .yasrokh-card:hover .yasrokh-card-inner {
          transform: translateZ(20px);
        }
        
        .yasrokh-monster-hover {
          filter: brightness(1.1) contrast(1.1);
          transform: scale(1.1) translateY(-5px);
          animation: monster-breathe 3s ease-in-out infinite;
        }
        
        @keyframes monster-breathe {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.12); }
        }
        
        .yasrokh-glow {
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
        }
        
        .yasrokh-badge {
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }
        
        .yasrokh-text {
          text-shadow: 0 0 10px rgba(220, 38, 38, 0.7);
          letter-spacing: 1px;
        }
        
        /* Monster transformation effects */
        @keyframes shake-violent {
          0%, 100% { transform: translate(0, 0) rotate(0); }
          10% { transform: translate(-5px, -5px) rotate(-2deg); }
          20% { transform: translate(5px, -2px) rotate(2deg); }
          30% { transform: translate(-3px, 5px) rotate(-1deg); }
          40% { transform: translate(3px, 2px) rotate(1deg); }
          50% { transform: translate(-3px, -2px) rotate(-1.5deg); }
          60% { transform: translate(5px, 5px) rotate(2deg); }
          70% { transform: translate(-5px, 2px) rotate(-2deg); }
          80% { transform: translate(2px, -5px) rotate(1.5deg); }
          90% { transform: translate(-2px, -2px) rotate(-1deg); }
        }
        
        .yasrokh-monster-transform {
          animation: shake-violent 0.5s ease-in-out;
          filter: contrast(1.3) brightness(0.9) saturate(1.5);
          transform: scale(1.2);
        }
        
        .yasrokh-monster {
          filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.5));
        }
        
        @keyframes float-monster {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .yasrokh-monster-name {
          text-shadow: 0 0 10px #ff0000, 0 0 20px rgba(255, 0, 0, 0.5);
          letter-spacing: 2px;
        }
        
        /* Lightning effect */
        @keyframes lightning {
          0% { opacity: 0; }
          10% { opacity: 1; }
          20% { opacity: 0; }
          30% { opacity: 1; }
          40%, 100% { opacity: 0; }
        }
        
        .yasrokh-lightning {
          position: absolute;
          width: 20px;
          height: 50px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,0,0.6));
          filter: blur(1px);
          transform: rotate(20deg);
          opacity: 0;
          animation: lightning 2s infinite;
        }
        
        /* Fire effect */
        @keyframes fire {
          0% { height: 0; opacity: 0.5; }
          50% { opacity: 0.8; }
          100% { height: 60px; opacity: 0.2; transform: translateY(-60px); }
        }.yasrokh-fire {
          background: linear-gradient(to top, #ff3d00, #ffab00, transparent);
          border-radius: 50% 50% 20% 20%;
          filter: blur(2px);
          opacity: 0.7;
          animation: fire 2s infinite;
        }
        
        /* Stat bar animation */
        @keyframes stat-fill {
          from { width: 0%; }
          to { width: var(--target-width); }
        }
        
        .yasrokh-stat-bar {
          animation: stat-fill 1.5s ease-out forwards;
          animation-delay: 0.5s;
        }
        
        /* Badge pulse effect */
        @keyframes badge-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); filter: brightness(1.2); }
        }
        
        .yasrokh-badge-pulse {
          animation: badge-pulse 2s ease-in-out infinite;
        }
        
        /* Monster ability reveal */
        @keyframes ability-reveal {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .yasrokh-ability {
          opacity: 0;
          animation: ability-reveal 0.3s ease-out forwards;
        }
        
        /* Aura effect for electric/psychic types */
        @keyframes aura-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
        
        .yasrokh-aura {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%);
          filter: blur(5px);
          opacity: 0.5;
          animation: aura-pulse 2s ease-in-out infinite;
        }
        
        /* Spark animation */
        @keyframes spark {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-30px) rotate(45deg); opacity: 0; }
        }
        
        .yasrokh-spark {
          background-color: white;
          border-radius: 50%;
          opacity: 0.7;
          transform-origin: center;
          animation: spark 1s ease-out infinite;
        }
        
        /* Ember particles */
        @keyframes ember-float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
          100% { transform: translateY(-50px) rotate(360deg); opacity: 0; }
        }
        
        .yasrokh-ember {
          background-color: #ff6d00;
          border-radius: 50%;
          filter: blur(1px);
          box-shadow: 0 0 5px #ff3d00;
          animation: ember-float 2s ease-out infinite;
        }
        
        /* Water overlay effect */
        @keyframes water-ripple {
          0%, 100% { opacity: 0.1; background-size: 100% 100%; }
          50% { opacity: 0.3; background-size: 120% 120%; }
        }
        
        .yasrokh-water-overlay {
          background: radial-gradient(ellipse at center, rgba(0,149,255,0.3) 0%, rgba(0,149,255,0) 70%);
          opacity: 0.2;
          animation: water-ripple 4s ease-in-out infinite;
        }
        
        /* Ghost mist effect */
        @keyframes ghost-mist {
          0%, 100% { opacity: 0.1; transform: translateY(0); }
          50% { opacity: 0.3; transform: translateY(-10px); }
        }
        
        .yasrokh-ghost-mist {
          background: linear-gradient(to top, rgba(128,0,128,0.2), rgba(128,0,128,0));
          filter: blur(5px);
          animation: ghost-mist 5s ease-in-out infinite;
        }
        
        /* Experience orb glow */
        @keyframes exp-orb-glow {
          0%, 100% { box-shadow: 0 0 5px 2px rgba(255,215,0,0.5); }
          50% { box-shadow: 0 0 10px 5px rgba(255,215,0,0.8); }
        }
        
        .yasrokh-exp-orb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(to bottom right, #ffd700, #ff6b00);
          animation: exp-orb-glow 2s ease-in-out infinite;
        }
        
        /* Close button hover effect */
        .yasrokh-close {
          transition: all 0.3s ease;
        }
        
        .yasrokh-close:hover {
          transform: rotate(90deg);
          background-color: rgba(255, 255, 255, 0.3);
        }
        
        /* Header background effect */
        @keyframes header-shine {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        
        .yasrokh-header {
          position: relative;
          overflow: hidden;
        }
        
        .yasrokh-header::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200% 100%;
          animation: header-shine 3s infinite;
        }
      `}</style>
    </div>
  );
}

export default App;