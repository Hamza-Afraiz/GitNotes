import React from "react";

const useStarredGists = () => {
  const [isStarredGists, showStarredGists] = React.useState(false);
  return { showStarredGists, isStarredGists };
};

export default useStarredGists;
