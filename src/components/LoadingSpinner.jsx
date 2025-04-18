function LoadingSpinner() {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-800 to-black">
        <div className="text-center">
          <div className="relative w-28 h-28 mx-auto">
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-white border-t-red-600 animate-spin"></div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-white rounded-full"></div>
              <div className="absolute w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          <p className="mt-6 text-2xl font-bold text-white animate-pulse">Catching Pokémon...</p>
        </div>
      </div>
    );
  }
  
  export default LoadingSpinner;