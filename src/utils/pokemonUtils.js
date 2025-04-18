// Type colors with gradients for more modern look
export const getTypeColor = (type) => {
    const typeColors = {
      normal: 'bg-gradient-to-r from-gray-400 to-gray-500',
      fire: 'bg-gradient-to-r from-orange-500 to-red-600',
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
  
  // Background gradients for type-based themes
  export const getTypeGradient = (type) => {
    const typeGradients = {
      normal: 'from-gray-700 to-gray-900',
      fire: 'from-orange-900 to-red-950',
      water: 'from-blue-900 to-blue-950',
      electric: 'from-yellow-700 to-amber-900',
      grass: 'from-green-900 to-emerald-950',
      ice: 'from-cyan-800 to-blue-900',
      fighting: 'from-red-800 to-red-950',
      poison: 'from-purple-800 to-purple-950',
      ground: 'from-amber-800 to-amber-950',
      flying: 'from-indigo-800 to-indigo-950',
      psychic: 'from-pink-800 to-pink-950',
      bug: 'from-lime-800 to-lime-950',
      rock: 'from-stone-800 to-stone-950',
      ghost: 'from-purple-900 to-purple-950',
      dragon: 'from-indigo-900 to-purple-950',
      dark: 'from-gray-800 to-gray-950',
      steel: 'from-gray-700 to-gray-900',
      fairy: 'from-pink-800 to-pink-950',
    };
    return typeGradients[type] || typeGradients.normal;
  };
  
  // Stat colors for the bars
  export const getStatColor = (statName) => {
    const statColors = {
      hp: 'bg-gradient-to-r from-green-500 to-emerald-600',
      attack: 'bg-gradient-to-r from-red-500 to-rose-600',
      defense: 'bg-gradient-to-r from-blue-500 to-indigo-600',
      'special-attack': 'bg-gradient-to-r from-purple-500 to-fuchsia-600',
      'special-defense': 'bg-gradient-to-r from-teal-500 to-cyan-600',
      speed: 'bg-gradient-to-r from-yellow-500 to-amber-600',
    };
    return statColors[statName.toLowerCase()] || 'bg-gradient-to-r from-gray-500 to-gray-600';
  };
  
  // Stat icons for visual representation
  export const getStatIcon = (statName) => {
    const statIcons = {
      hp: '❤️',
      attack: '⚔️',
      defense: '🛡️',
      'special-attack': '✨',
      'special-defense': '🌟',
      speed: '⚡',
    };
    return statIcons[statName.toLowerCase()] || '📊';
  };
  
  // Get background pattern based on type
  export const getTypePattern = (type) => {
    const patterns = {
      fire: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23fff' fill-opacity='0.05'/%3E%3C/svg%3E\")",
      water: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='25' fill='none' stroke='%23fff' stroke-opacity='0.05' stroke-width='2'/%3E%3C/svg%3E\")",
      // Add more patterns for other types
    };
    return patterns[type] || patterns.normal;
  };