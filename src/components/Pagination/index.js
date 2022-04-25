import React, { useState, useEffect } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const PaginationCommon = (props) => {
  const {
    totalRecords,
    pageLimit,
    pageNeighbours,
    onPageChanged,
    currentPage,
  } = props;
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / pageLimit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours;

    if (totalPages > totalNumbers) {
      const startPage = Math.max(1, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT, ...extraPages, ...pages];
          break;
        }
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT, ...pages, RIGHT];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };

  const pages = fetchPageNumbers() || [];
  return (
    <Pagination aria-label="Page navigation">
      {pages.map((page, index) => {
        console.log(page);
        if (page === LEFT)
          return (
            <PaginationItem disabled={currentPage <= 0}>
              <PaginationLink
                onClick={(e) => onPageChanged(e, currentPage - 1)}
                aria-label="Previous"
                previous
              />
            </PaginationItem>
          );

        if (page === RIGHT)
          return (
            <PaginationItem disabled={currentPage >= totalPages - 1}>
              <PaginationLink
                onClick={(e) => onPageChanged(e, currentPage + 1)}
                aria-label="Next"
                next
              />
            </PaginationItem>
          );

        return (
          <PaginationItem active={currentPage === index} key={index}>
            <PaginationLink onClick={(e) => onPageChanged(e, page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      })}
    </Pagination>
  );
};

export default PaginationCommon;
