import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPokemonDetails } from '../services/api';
import { getTypeColor, getTypeGradient, getStatColor, getStatIcon } from '../utils/pokemonUtils';
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

  const mainType = pokemon.types[0].type.name;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
      <div 
        className={`relative w-full max-w-4xl bg-gradient-to-br ${getTypeGradient(mainType)} 
          rounded-2xl shadow-2xl overflow-hidden transition-all duration-500
          ${showingDetails ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        {/* Close Button */}
        <button 
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold text-white capitalize mb-2">{pokemon.name}</h2>
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`${getTypeColor(type.type.name)} px-3 py-1 rounded-full 
                      text-white text-sm font-medium uppercase tracking-wider`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            <span className="text-3xl font-bold text-white/80">
              #{String(pokemon.id).padStart(3, '0')}
            </span>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Stats */}
            <div className="space-y-6">
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Base Stats</h3>
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/80 capitalize flex items-center gap-2">
                        {getStatIcon(stat.stat.name)}
                        {stat.stat.name.replace('-', ' ')}
                      </span>
                      <span className="text-white font-bold">{stat.base_stat}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getStatColor(stat.stat.name)} transition-all duration-1000`}
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Info & Abilities */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem label="Height" value={`${pokemon.height / 10}m`} />
                  <InfoItem label="Weight" value={`${pokemon.weight / 10}kg`} />
                  <InfoItem label="Base XP" value={pokemon.base_experience} />
                </div>
              </div>

              {/* Abilities */}
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Abilities</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability.ability.name}
                      className="bg-white/10 px-4 py-2 rounded-lg text-white capitalize"
                    >
                      {ability.ability.name.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="bg-white/5 rounded-lg p-3">
      <div className="text-white/60 text-sm mb-1">{label}</div>
      <div className="text-white font-bold">{value}</div>
    </div>
  );
}

export default PokemonDetail;