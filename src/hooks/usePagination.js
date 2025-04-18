import { useState, useMemo } from 'react';

export function usePagination(items, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  }, [items, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  };

  const nextPage = () => goToPage(currentPage + 1);
  const previousPage = () => goToPage(currentPage - 1);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    previousPage,
  };
}