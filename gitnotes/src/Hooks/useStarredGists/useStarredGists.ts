import React from "react";

const useStarredGists = () => {
  const [starredGists, showStarredGists] = React.useState(false);
  return {  showStarredGists, starredGists };
};

export default useStarredGists;
