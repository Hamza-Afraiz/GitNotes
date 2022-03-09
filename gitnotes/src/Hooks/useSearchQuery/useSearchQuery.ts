import React from "react";
const useSearchQuery = () => {
  const [searchQuery, setQuery] = React.useState("");

  
 

  return { setSearchQueryValue: setQuery, searchQuery };
};

export default useSearchQuery;
