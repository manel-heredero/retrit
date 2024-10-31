export const filterAndSortVenues = (venues, filters) => {
  // First, filter venues based on criteria
  const filteredVenues = venues.filter(venue => {
    const matchesRegion = !filters.region || venue.region === filters.region;
    const matchesCapacity = !filters.capacity || venue.capacity === filters.capacity;
    const matchesLocationType = !filters.locationType || venue.locationType === filters.locationType;
    
    return matchesRegion && matchesCapacity && matchesLocationType;
  });
  // Then sort venues: reviewed first, then non-reviewed
  return filteredVenues.sort((a, b) => {
    // Sort by reviewed status first
    if (a.reviewed && !b.reviewed) return -1;
    if (!a.reviewed && b.reviewed) return 1;
    
    // If both have same reviewed status, maintain their original order
    return 0;
  });
};
  
export const paginateVenues = (venues, currentPage, itemsPerPage) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return venues.slice(startIndex, startIndex + itemsPerPage);
};
  
export const calculateTotalPages = (totalItems, itemsPerPage) => {
  return Math.ceil(totalItems / itemsPerPage);
};