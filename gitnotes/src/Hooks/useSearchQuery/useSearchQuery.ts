import React from "react";
const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  return { setSearchQueryValue: setSearchQuery, searchQuery };
};

export default useSearchQuery;
