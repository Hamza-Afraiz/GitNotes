import React from "react";
const useSearchQuery = () => {
  const [searchQuery, setQuery] = React.useState("");

  
  React.useEffect(()=>{
      console.log("search Query is",searchQuery)
      
  },[searchQuery])

  return { setSearchQueryValue: setQuery, searchQuery };
};

export default useSearchQuery;
