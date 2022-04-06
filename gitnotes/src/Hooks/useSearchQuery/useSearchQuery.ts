import React from "react";
const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  return { setQueryResult: setSearchQuery, searchQuery };
};

export default useSearchQuery;
