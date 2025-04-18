import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPokemonDetails } from '../services/api';
import { getTypeColor, getTypeGradient } from '../utils/pokemonUtils';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showingDetails, setShowingDetails] = useState(false);

  const { data: pokemon, isLoading, error } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemonDetails(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (pokemon) {
      setTimeout(() => setShowingDetails(true), 100);
    }
  }, [pokemon]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!pokemon) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div 
        className={`relative bg-gradient-to-br ${getTypeGradient(pokemon.types[0].type.name)} 
          rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden transition-all duration-500 
          ${showingDetails ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      >
        <button 
          className="absolute top-4 right-4 bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition-all z-50"
          onClick={() => navigate('/')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Pokemon Detail Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-white capitalize">{pokemon.name}</h2>
            <span className="text-xl text-white">#{String(pokemon.id).padStart(3, '0')}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className={`${getTypeColor(type.type.name)} px-3 py-1 rounded-full text-white text-sm font-bold`}
              >
                {type.type.name}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-black bg-opacity-30 p-4 rounded-lg">
              <h3 className="text-white font-bold mb-2">Stats</h3>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="mb-2">
                  <div className="flex justify-between text-sm text-white">
                    <span>{stat.stat.name}</span>
                    <span>{stat.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-black bg-opacity-30 p-4 rounded-lg">
              <h3 className="text-white font-bold mb-2">Info</h3>
              <div className="space-y-2 text-white">
                <p>Height: {pokemon.height / 10}m</p>
                <p>Weight: {pokemon.weight / 10}kg</p>
                <p>Base Experience: {pokemon.base_experience}</p>
              </div>
            </div>
          </div>

          <div className="bg-black bg-opacity-30 p-4 rounded-lg">
            <h3 className="text-white font-bold mb-2">Abilities</h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((ability) => (
                <span
                  key={ability.ability.name}
                  className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-white text-sm"
                >
                  {ability.ability.name.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;