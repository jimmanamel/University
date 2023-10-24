import React from "react";

import "./Pagination.css";

function Pagination({ totalItems, itemsPerPage, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const generatePaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={i === currentPage ? "pageButton" : ""}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="pagination-container">{generatePaginationButtons()}</div>
  );
}

export default Pagination;
