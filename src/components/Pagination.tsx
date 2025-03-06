import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPagesToShow = 7;

  const getPageNumbers = () => {
    const pages: number[] = [];

    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are fewer pages than the maximum to show
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate the range of pages to show around the current page
      let rangeStart = Math.max(2, currentPage - 2);
      let rangeEnd = Math.min(totalPages - 1, currentPage + 2);

      // Adjust if the range is too small on either side
      if (rangeStart <= 2) {
        rangeEnd = Math.min(totalPages - 1, 1 + maxPagesToShow - 2);
      }

      if (rangeEnd >= totalPages - 1) {
        rangeStart = Math.max(2, totalPages - maxPagesToShow + 2);
      }

      // Add ellipsis if there's a gap at the beginning
      if (rangeStart > 2) {
        pages.push(-1); // ellipsis
      }

      // Add the range of pages
      for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push(i);
      }

      // Add ellipsis if there's a gap at the end
      if (rangeEnd < totalPages - 1) {
        pages.push(-1); // ellipsis
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null; // Don't show pagination if there's only one page
  }

  const pages = getPageNumbers();

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        &lt;
      </button>

      {pages.map((page, index) =>
        page === -1 ? (
          <span key={`ellipsis-${index}`} className="ellipsis">
            …
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? "active" : ""}
            aria-current={currentPage === page ? "page" : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
