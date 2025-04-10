export default function PokemonCard({ pokemon, onClick, getTypeColor }) {
    return (
      <div 
        className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
        onClick={onClick}
      >
        <div className="bg-gray-200 p-4 flex justify-center">
          <img
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className="h-32 w-32 object-contain"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold capitalize mb-2">{pokemon.name}</h2>
          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className={`${getTypeColor(type.type.name)} text-white text-xs font-bold uppercase px-2 py-1 rounded`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }