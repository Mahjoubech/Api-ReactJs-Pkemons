function Pagination({ currentPage, totalPages, onPageChange }) {
    const pageNumbers = [];
    const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
  
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="flex justify-center items-center gap-4 mt-8 mb-8">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'
          } text-white transition-colors`}
        >
          Previous
        </button>
        
        <div className="flex gap-2">
          {startPage > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className="w-10 h-10 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
              >
                1
              </button>
              {startPage > 2 && (
                <span className="w-10 h-10 flex items-center justify-center text-white">...</span>
              )}
            </>
          )}
  
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className={`w-10 h-10 rounded-lg ${
                currentPage === number
                  ? 'bg-red-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              } text-white transition-colors`}
            >
              {number}
            </button>
          ))}
  
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="w-10 h-10 flex items-center justify-center text-white">...</span>
              )}
              <button
                onClick={() => onPageChange(totalPages)}
                className="w-10 h-10 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>
  
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'
          } text-white transition-colors`}
        >
          Next
        </button>
      </div>
    );
  }
  
  export default Pagination;