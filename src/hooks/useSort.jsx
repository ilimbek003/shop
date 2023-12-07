/* eslint-disable eqeqeq */
const useSort = ({ array, setArray, sortingBy, copyArray, profile }) => {
  const sorting = () => {
    setArray(() => {
      if (Array.isArray(copyArray)) {
        if (sortingBy == 2) {
          const sorted = [...copyArray].sort((a, b) => b.id - a.id);
          return sorted;
        }
        if (sortingBy == 3) {
          const sorted = [...copyArray].sort((a, b) => a.id - b.id);
          return sorted;
        }
        if (sortingBy == 4 && !profile) {
          const sorted = [...copyArray].sort(
            (a, b) =>
              Number(a?.product_variation?.product_price) -
              Number(b?.product_variation?.product_price)
          );
          return sorted;
        } else if (sortingBy == 4 && profile) {
          const sorted = [...copyArray].sort(
            (a, b) => Number(a?.total_price) - Number(b?.total_price)
          );
          return sorted;
        }
        if (sortingBy == 5 && !profile) {
          const sorted = [...copyArray].sort(
            (a, b) =>
              Number(b?.product_variation?.product_price) -
              Number(a?.product_variation?.product_price)
          );
          return sorted;
        }
        if (sortingBy == 5 && profile) {
          const sorted = [...copyArray].sort(
            (a, b) => Number(b?.total_price) - Number(a?.total_price)
          );
          return sorted;
        } else return copyArray;
      }
    });
  };
  return {
    sortBy: () => sorting(),
  };
};

export default useSort;
