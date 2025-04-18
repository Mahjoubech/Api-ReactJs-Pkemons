export const getTypeColor = (type) => {
    const typeColors = {
      normal: 'bg-slate-400',
      fire: 'bg-gradient-to-r from-orange-500 to-red-500',
      water: 'bg-gradient-to-r from-blue-400 to-blue-600',
      electric: 'bg-gradient-to-r from-yellow-300 to-yellow-500',
      grass: 'bg-gradient-to-r from-green-400 to-emerald-500',
      ice: 'bg-gradient-to-r from-cyan-300 to-blue-400',
      fighting: 'bg-gradient-to-r from-red-600 to-red-700',
      poison: 'bg-gradient-to-r from-purple-400 to-purple-600',
      ground: 'bg-gradient-to-r from-amber-600 to-amber-700',
      flying: 'bg-gradient-to-r from-indigo-300 to-indigo-500',
      psychic: 'bg-gradient-to-r from-pink-400 to-pink-600',
      bug: 'bg-gradient-to-r from-lime-400 to-lime-600',
      rock: 'bg-gradient-to-r from-stone-500 to-stone-700',
      ghost: 'bg-gradient-to-r from-purple-600 to-purple-800',
      dragon: 'bg-gradient-to-r from-indigo-600 to-purple-700',
      dark: 'bg-gradient-to-r from-gray-700 to-gray-900',
      steel: 'bg-gradient-to-r from-gray-400 to-gray-600',
      fairy: 'bg-gradient-to-r from-pink-300 to-pink-500',
    };
    return typeColors[type] || typeColors.normal;
  };
  
  export const getTypeGradient = (type) => {
    const typeGradients = {
      normal: 'from-slate-400/20 to-slate-500/20',
      fire: 'from-orange-500/20 to-red-500/20',
      water: 'from-blue-400/20 to-blue-600/20',
      electric: 'from-yellow-300/20 to-yellow-500/20',
      grass: 'from-green-400/20 to-emerald-500/20',
      ice: 'from-cyan-300/20 to-blue-400/20',
      fighting: 'from-red-600/20 to-red-700/20',
      poison: 'from-purple-400/20 to-purple-600/20',
      ground: 'from-amber-600/20 to-amber-700/20',
      flying: 'from-indigo-300/20 to-indigo-500/20',
      psychic: 'from-pink-400/20 to-pink-600/20',
      bug: 'from-lime-400/20 to-lime-600/20',
      rock: 'from-stone-500/20 to-stone-700/20',
      ghost: 'from-purple-600/20 to-purple-800/20',
      dragon: 'from-indigo-600/20 to-purple-700/20',
      dark: 'from-gray-700/20 to-gray-900/20',
      steel: 'from-gray-400/20 to-gray-600/20',
      fairy: 'from-pink-300/20 to-pink-500/20',
    };
    return typeGradients[type] || typeGradients.normal;
  };
  
  export const getStatColor = (statName) => {
    const statColors = {
      hp: 'bg-red-500',
      attack: 'bg-orange-500',
      defense: 'bg-yellow-500',
      'special-attack': 'bg-blue-500',
      'special-defense': 'bg-green-500',
      speed: 'bg-pink-500',
    };
    return statColors[statName] || 'bg-gray-500';
  };