export const filterAndSortVenues = (venues, filters) => {
    return venues
      .filter(venue => 
        (!filters.region || venue.region === filters.region) &&
        (!filters.capacity || venue.capacity === filters.capacity) &&
        (!filters.locationType || venue.locationType === filters.locationType)
      )
      .sort((a, b) => {
        if (a.isReviewed === b.isReviewed) return 0
        return a.isReviewed ? -1 : 1
      });
  };
  
  export const paginateVenues = (venues, currentPage, itemsPerPage) => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return venues.slice(firstPageIndex, lastPageIndex);
  };
  
  export const calculateTotalPages = (totalItems, itemsPerPage) => {
    return Math.ceil(totalItems / itemsPerPage);
  };