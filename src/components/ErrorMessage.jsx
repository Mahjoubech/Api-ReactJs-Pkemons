function ErrorMessage({ message }) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-800 to-black">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg border border-red-500 text-white">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p>{message}</p>
          <button 
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  export default ErrorMessage;