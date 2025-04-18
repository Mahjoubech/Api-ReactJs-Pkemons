import { motion } from 'framer-motion';
import { useState } from 'react';
import { getTypeColor, getTypeGradient } from '../utils/pokemonUtils';

function PokemonCard({ pokemon, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const mainType = pokemon.types[0].type.name;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -10 }}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${getTypeGradient(mainType)} p-1`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative z-10 bg-black/40 backdrop-blur-sm rounded-lg p-4 h-full">
        {/* Pokemon Number & HP */}
        <div className="flex justify-between items-center mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm"
          >
            <span className="text-xs font-bold text-white">
              #{pokemon.id.toString().padStart(3, '0')}
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-3 py-1 rounded-full bg-red-500/20 backdrop-blur-sm"
          >
            <span className="text-xs font-bold text-red-300">
              {pokemon.stats[0].base_stat} HP
            </span>
          </motion.div>
        </div>

        {/* Pokemon Image */}
        <motion.div
          className="relative aspect-square mb-4"
          animate={{
            y: isHovered ? -10 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl transform -translate-y-4"></div>
          <img
            src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
          />
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-full blur-xl"
            />
          )}
        </motion.div>

        {/* Pokemon Name & Types */}
        <div className="text-center">
          <motion.h2
            className="text-2xl font-bold text-white mb-3 capitalize"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
          >
            {pokemon.name}
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-2">
            {pokemon.types.map((type) => (
              <motion.span
                key={type.type.name}
                className={`${getTypeColor(type.type.name)} px-3 py-1 rounded-full text-white text-xs font-medium uppercase tracking-wider`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {type.type.name}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Stats Preview */}
        <motion.div
          className="mt-4 grid grid-cols-2 gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20
          }}
        >
          {pokemon.stats.slice(1, 3).map((stat) => (
            <div
              key={stat.stat.name}
              className="bg-black/20 backdrop-blur-sm rounded-lg p-2 text-center"
            >
              <span className="text-xs text-gray-400 uppercase">
                {stat.stat.name}
              </span>
              <p className="text-lg font-bold text-white">
                {stat.base_stat}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Hover Effects */}
        {mainType === 'fire' && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-orange-500/50 blur-sm"
                animate={{
                  y: [-20, -100],
                  x: Math.sin(i) * 20,
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 1 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                style={{
                  left: `${10 + (i * 8)}%`,
                  bottom: '0%',
                }}
              />
            ))}
          </motion.div>
        )}

        {mainType === 'electric' && (
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-20 bg-yellow-300/70 blur-sm"
                animate={{
                  scaleY: [1, 0.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                style={{
                  left: `${20 + (i * 15)}%`,
                  top: '0%',
                  transformOrigin: 'top',
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default PokemonCard;