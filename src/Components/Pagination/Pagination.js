import React, { useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import IconButton from "@mui/material/IconButton";
import "./Pagination.css";

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const [active, setActive] = useState(1);
  const [hover, setHover] = useState({
    left: false,
    right: false,
  });

  const pageNumbers = [];
  /*Checks how many pages are currently available in the table-overview of players*/
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  /* Callback function used in the Homepage-file*/
  function handlePagination(number) {
    setActive(number);
    paginate(number);
  }

  return (
    <nav>
      <ul className="pagination">
        <IconButton
          className="arrowLeft"
          disabled={active <= 1 ? true : false}
          onClick={() => handlePagination(active - 1)}
        >
          <ArrowLeftIcon
            fontSize="large"
            onMouseEnter={() => setHover({ left: true })}
            onMouseLeave={() => setHover({ left: false })}
            style={{
              color: hover.left
                ? "#105f47"
                : "white" && active <= 1
                ? "grey"
                : "white",
            }}
          />
        </IconButton>
        {/**Takes the list of pagenumbers, and returns a list of links to each page of the table */}
        {pageNumbers.map((number) => {
          return (
            <li key={number} className="page-item">
              <a
                className={active === number ? "page-link active" : "page-link"}
                onClick={() => handlePagination(number)}
              >
                {number}
              </a>
            </li>
          );
        })}
        <IconButton
          className="arrowRight"
          disabled={active === pageNumbers.length ? true : false}
          onClick={() => handlePagination(active + 1)}
        >
          <ArrowRightIcon
            fontSize="large"
            onMouseEnter={() => setHover({ right: true })}
            onMouseLeave={() => setHover({ right: false })}
            style={{
              color: hover.right
                ? "#105f47"
                : "white" && active === pageNumbers.length
                ? "grey"
                : "white",
            }}
          />
        </IconButton>
      </ul>
    </nav>
  );
};

export default Pagination;
