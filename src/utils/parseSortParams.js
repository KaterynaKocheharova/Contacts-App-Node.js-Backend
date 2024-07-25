import { SORT_ORDER } from '../constants';

const parseSortOrder = (sortBy) => {
  if (typeof sortBy !== 'string') return SORT_ORDER.ASC;
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortBy);
  if (!isKnownOrder) return SORT_ORDER.ASC;
  return sortBy;
};

const parseSortBy = () => {};

const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;
  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);
  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};

export default parseSortParams;
