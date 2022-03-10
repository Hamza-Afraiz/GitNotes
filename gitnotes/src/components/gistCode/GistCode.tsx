import React from "react";
import { GistCodeContainer, GistCodeLine } from "../../styledComponents";

interface GistCodeProps {
  GistCodeContent: string[] | undefined;
}

const GistCode = ({ GistCodeContent }: GistCodeProps) => {
  return (
    <GistCodeContainer>
      <ol>
        {GistCodeContent?.map((item, index) => (
          <GistCodeLine key={index}>{item}</GistCodeLine>
        ))}
      </ol>
    </GistCodeContainer>
  );
};

export default GistCode;
