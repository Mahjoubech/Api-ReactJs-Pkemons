import { useState, useEffect } from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const [animatedPage, setAnimatedPage] = useState(currentPage);
  const pageNumbers = [];
  const maxVisiblePages = 5;

  useEffect(() => {
    setAnimatedPage(currentPage);
  }, [currentPage]);

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setAnimatedPage(page);
      onPageChange(page);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8 mb-8">
      <div className="flex items-center gap-4">
        {/* Previous button with custom design */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative group px-4 py-2 rounded-xl overflow-hidden ${
            currentPage === 1
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:scale-105 transform transition-transform'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-xl" />
          <div className="relative flex items-center gap-2">
            <svg
              className="w-5 h-5 text-white transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-white font-medium">Previous</span>
          </div>
        </button>

        {/* Page numbers container with glass effect */}
        <div className="flex gap-2 bg-white/5 backdrop-blur-sm rounded-xl p-2 border border-white/10">
          {/* First page */}
          {startPage > 1 && (
            <>
              <PageButton
                number={1}
                isActive={currentPage === 1}
                onClick={() => handlePageChange(1)}
              />
              {startPage > 2 && (
                <div className="flex items-center justify-center w-10">
                  <span className="text-white/60">•••</span>
                </div>
              )}
            </>
          )}

          {/* Page numbers */}
          {pageNumbers.map(number => (
            <PageButton
              key={number}
              number={number}
              isActive={currentPage === number}
              onClick={() => handlePageChange(number)}
            />
          ))}

          {/* Last page */}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <div className="flex items-center justify-center w-10">
                  <span className="text-white/60">•••</span>
                </div>
              )}
              <PageButton
                number={totalPages}
                isActive={currentPage === totalPages}
                onClick={() => handlePageChange(totalPages)}
              />
            </>
          )}
        </div>

        {/* Next button with custom design */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative group px-4 py-2 rounded-xl overflow-hidden ${
            currentPage === totalPages
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:scale-105 transform transition-transform'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl" />
          <div className="relative flex items-center gap-2">
            <span className="text-white font-medium">Next</span>
            <svg
              className="w-5 h-5 text-white transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>

      {/* Page info */}
      <div className="text-white/60 text-sm">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
function PageButton({ number, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-10 h-10 rounded-lg transition-all duration-200 overflow-hidden ${
        isActive ? 'scale-110' : 'hover:scale-105'
      }`}
    >
      <div className={`absolute inset-0 ${
        isActive
          ? 'bg-gradient-to-br from-red-500 to-pink-600'
          : 'bg-white/10 hover:bg-white/20'
      } rounded-lg transition-colors`} />
      
      {/* Animated border */}
      {isActive && (
        <>
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <div className="absolute inset-0 animate-spin-slow opacity-50"
                 style={{
                   background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent)',
                 }} />
          </div>
          <div className="absolute inset-[1px] rounded-lg bg-gradient-to-br from-red-500 to-pink-600" />
        </>
      )}

      {/* Number */}
      <span className={`relative z-10 flex items-center justify-center w-full h-full text-white ${
        isActive ? 'font-bold' : 'font-medium'
      }`}>
        {number}
      </span>
    </button>
  );
}

export default Pagination;