export const getTypeColor = (type) => {
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
  
  export const getTypeGradient = (type) => {
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