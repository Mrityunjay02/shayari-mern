import React from 'react';
import './Pagination.css'; // Ensure you have this CSS file for styling

const Pagination = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      onPageChange(pageNumber);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
            href="#!"
          >
            &laquo;
          </a>
        </li>
        {pageNumbers.map(number => (
          <li
            key={number}
            className={`page-item ${number === currentPage ? 'active' : ''}`}
          >
            <a
              className="page-link"
              onClick={() => handlePageChange(number)}
              href="#!"
            >
              {number}
            </a>
          </li>
        ))}
        <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
          <a
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            href="#!"
          >
            &raquo;
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
