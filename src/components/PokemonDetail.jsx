import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function PokemonDetail({ pokemon, onClose, getTypeColor }) {
  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-screen overflow-y-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
          <button 
            className="absolute top-4 right-4 bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition-all"
            onClick={onClose}
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <div className="absolute -bottom-20 w-full flex justify-center">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              className="h-40 w-40 object-contain"
            />
          </div>
        </div>

        {/* Pokemon Info */}
        <div className="pt-24 px-6 pb-6">
          <h1 className="text-3xl font-bold text-center capitalize mb-2">{pokemon.name}</h1>
          <div className="flex justify-center gap-2 mb-6">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className={`${getTypeColor(type.type.name)} text-white text-sm font-bold uppercase px-3 py-1 rounded-full`}
              >
                {type.type.name}
              </span>
            ))}
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-100 rounded-lg">
              <p className="text-gray-500 text-sm">Height</p>
              <p className="font-bold">{pokemon.height / 10} m</p>
            </div>
            <div className="text-center p-3 bg-gray-100 rounded-lg">
              <p className="text-gray-500 text-sm">Weight</p>
              <p className="font-bold">{pokemon.weight / 10} kg</p>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3">Base Stats</h2>
            <div className="space-y-3">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium capitalize">
                      {stat.stat.name.replace('-', ' ')}
                    </span>
                    <span className="text-sm font-medium">{stat.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Abilities */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3">Abilities</h2>
            <div className="grid grid-cols-2 gap-2">
              {pokemon.abilities.map((ability) => (
                <div 
                  key={ability.ability.name}
                  className="bg-gray-100 p-2 rounded-lg"
                >
                  <p className="capitalize font-medium">
                    {ability.ability.name.replace('-', ' ')}
                    {ability.is_hidden && <span className="text-xs text-gray-500 ml-1">(Hidden)</span>}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Moves (show just a few) */}
          <div>
            <h2 className="text-xl font-bold mb-3">Moves</h2>
            <div className="flex flex-wrap gap-2">
              {pokemon.moves.slice(0, 8).map((move) => (
                <span
                  key={move.move.name}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm capitalize"
                >
                  {move.move.name.replace('-', ' ')}
                </span>
              ))}
              {pokemon.moves.length > 8 && (
                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                  +{pokemon.moves.length - 8} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}