import { useState } from 'react';
import { getTypeColor, getTypeGradient } from '../utils/pokemonUtils';

function PokemonCard({ pokemon, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const mainType = pokemon.types[0].type.name;

  return (
    <div 
      className={`yasrokh-card bg-gradient-to-br ${getTypeGradient(mainType)} rounded-lg shadow-xl overflow-hidden transition-all duration-500`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="p-4 relative yasrokh-card-inner">
        {/* Card header */}
        <div className="flex justify-between items-center mb-2">
          <div className="bg-black bg-opacity-30 px-2 py-1 rounded-full">
            <span className="text-xs font-bold text-white">#{pokemon.id.toString().padStart(3, '0')}</span>
          </div>
          <div className="bg-black bg-opacity-30 px-2 py-1 rounded-full">
            <span className="text-xs font-bold text-white">{pokemon.stats[0].base_stat} HP</span>
          </div>
        </div>
        
        {/* Pokemon image container */}
        <div className="relative flex justify-center items-center h-32 mb-2 overflow-hidden">
          {/* Type-specific effects */}
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
          
          {/* Pokemon image */}
          <img
            src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className={`h-28 w-28 object-contain z-10 transition-all duration-500 ${
              isHovered ? 'yasrokh-monster-hover' : ''
            }`}
          />
          
          {/* Shadow beneath the Pokemon */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-black opacity-30 rounded-full blur-sm"></div>
        </div>
        
        {/* Pokemon info */}
        <div className="text-center">
          <h2 className="text-xl font-bold capitalize text-white mb-2 yasrokh-glow">{pokemon.name}</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {pokemon.types.map((type) => (
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
            <p className="font-bold text-white">{pokemon.stats[1].base_stat}</p>
          </div>
          <div className="text-center p-1 bg-black bg-opacity-30 rounded">
            <span className="text-xs text-gray-200">DEF</span>
            <p className="font-bold text-white">{pokemon.stats[2].base_stat}</p>
          </div>
        </div>
        
        {/* Monster form reveal overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 flex flex-col justify-end items-center transition-opacity duration-300 ${
          isHovered ? 'opacity-70' : ''
        }`}>
          <div className="text-white font-bold mb-3 yasrokh-pulse">REVEAL MONSTER FORM</div>
        </div>
      </div>

      <style jsx>{`
        .yasrokh-monster-hover {
          filter: brightness(1.1) contrast(1.1);
          transform: scale(1.1) translateY(-5px);
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

        .yasrokh-fire {
          background: linear-gradient(to top, #ff3d00, #ffab00, transparent);
          border-radius: 50% 50% 20% 20%;
          filter: blur(2px);
          opacity: 0.7;
          animation: fire 2s infinite;
        }

        @keyframes lightning {
          0% { opacity: 0; }
          10% { opacity: 1; }
          20% { opacity: 0; }
          30% { opacity: 1; }
          40%, 100% { opacity: 0; }
        }

        @keyframes fire {
          0% { height: 0; opacity: 0.5; }
          50% { opacity: 0.8; }
          100% { height: 60px; opacity: 0.2; transform: translateY(-60px); }
        }
      `}</style>
    </div>
  );
}

export default PokemonCard;