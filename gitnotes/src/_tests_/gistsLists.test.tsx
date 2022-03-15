import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { GistList } from "../containers";

const GistData = [
  {
    content: [
      "",
      "/****************",
      " * drones101.js *",
      " ****************",
      " *",
      " * Do you remember, my dear Professor, a certain introductory",
      " * computational rationality class you taught long ago? Assignment",
      " * #2, behavior functions of autonomous agents? I remember that one",
      " * fondly - but attack drones are so much easier to reason about",
      " * when they're not staring you in the face, I would imagine!",
      " */",
    ],
    creationDate: "Mar 14 2022",
    description:
      "Solution to level 6 in Untrusted: http://alex.nisnevich.com/untrusted/",
    fileName: "untrusted-lvl6-solution.js",
    gistId: parseInt("36468d5bbed3e10812da7d02655fff88"),
    id: "36468d5bbed3e10812da7d02655fff88",
    ownerAvatar: "https://avatars.githubusercontent.com/u/37789057?v=4",
    ownerName: "Untrusted-Game",
    time: "12:39:53",
  },
  {
    content: [
      "",
      "/****************",
      " * drones101.js *",
      " ****************",
      " *",
    ],
    creationDate: "Mar 14 2022",
    description:
      "Solution to level 6 in Untrusted: http://alex.nisnevich.com/untrusted/",
    fileName: "untrusted-lvl6-solution.js",
    gistId: parseInt("36468d5bbed3e10812da7d02655fff88"),
    id: "36468d5bbed3e10812da7d02655fff88",
    ownerAvatar: "https://avatars.githubusercontent.com/u/37789057?v=4",
    ownerName: "Untrusted-Game",
    time: "12:39:53",
  },
];

describe("when App Starts", () => {
  it("Gists List should Display", () => {
    render(<GistList gistsData={GistData} />, { wrapper: MemoryRouter });
    expect(screen.queryAllByRole("row")).toHaveLength(3);
  });
});
