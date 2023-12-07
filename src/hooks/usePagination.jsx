import { useState } from "react";
import { useDispatch } from "react-redux";

const usePagination = ({ contentPerPage, func, next, count }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  // number of pages in total (total items / content on each page)
  const pageCount = Math.ceil(
    count > 50 ? 50 / contentPerPage : count / contentPerPage
  );
  // index of last item of current page
  const lastContentIndex = page * contentPerPage;
  // index of first item of current page
  const firstContentIndex = lastContentIndex - contentPerPage;

  // change page based on direction either front or back
  const changePage = (direction) => {
    setPage((state) => {
      // move forward
      if (direction) {
        // if page is the last page, do nothing
        if (state === pageCount) {
          return state;
        }

        // eslint-disable-next-line eqeqeq
        if (count > 16 && state % 4 == 0) {
          dispatch(func(next));
        } else if (state % 2 == 0) {
          dispatch(func(next));
        }

        return state + 1;
        // go back
      } else {
        // if page is the first page, do nothing
        if (state === 1) {
          return state;
        }
        return state - 1;
      }
    });
  };

  const setPageSAFE = (num) => {
    // if number is greater than number of pages, set to last page
    if (num > pageCount) {
      setPage(pageCount);
      // if number is less than 1, set page to first page
    } else if (num < 1) {
      setPage(1);
    } else {
      setPage(num);
    }
  };

  return {
    totalPages: pageCount,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPage: setPageSAFE,
    firstContentIndex,
    lastContentIndex,
    page,
  };
};

export default usePagination;
