import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const getPokemonList = async (limit = 20) => {
  const { data } = await api.get(`/pokemon?limit=${limit}`);
  return data;
};

export const getPokemonDetails = async (urlOrId) => {
  const { data } = await api.get(typeof urlOrId === 'number' ? `/pokemon/${urlOrId}` : urlOrId);
  return data;
};

export const fetchPokemonWithDetails = async (limit = 20) => {
  const { data } = await api.get(`/pokemon?limit=${limit}`);
  
  const pokemonDetailsPromises = data.results.map(pokemon => 
    getPokemonDetails(pokemon.url).catch(error => ({
      error: true,
      name: pokemon.name,
      message: error.message
    }))
  );

  const results = await Promise.allSettled(pokemonDetailsPromises);
  
  return results
    .filter(result => result.status === 'fulfilled' && !result.value.error)
    .map(result => result.value);
};

export default api;