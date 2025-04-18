import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonWithDetails } from '../services/api';
import Pagination from './Pagination';
import PokemonCard from './PokemonCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

function PokemonList() {
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonPerPage = 5;
  const navigate = useNavigate();

  const { data: pokemon = [], isLoading, error } = useQuery({
    queryKey: ['pokemon-list'],
    queryFn: () => fetchPokemonWithDetails(20),
    select: (data) => data.sort((a, b) => a.id - b.id),
  });

  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = pokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(pokemon.length / pokemonPerPage);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {currentPokemon.map((poke) => (
          <PokemonCard
            key={poke.id}
            pokemon={poke}
            onClick={() => navigate(`/pokemon/${poke.id}`)}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default PokemonList;