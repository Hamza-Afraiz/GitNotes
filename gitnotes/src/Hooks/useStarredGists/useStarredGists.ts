import React from "react";

const useStarredGists = () => {
  const [starredGists, setStarredGists] = React.useState(false);
  return { setStarredGists, starredGists };
};

export default useStarredGists;
