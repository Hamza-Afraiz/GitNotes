
//src

import { render, screen, waitFor } from "./utils/customRender";
import  App  from "../App";
import { mockServer } from "./mockUserResponses/mockApi";
import { gistApiResponse } from "./mockUserResponses/gistsResponse";


beforeAll(() => mockServer.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => {
  mockServer.resetHandlers();
});
afterAll(() => mockServer.close());

test("Gists List should Display", async () => {
  render(
    <App/>
  );

  expect(screen.getByTestId("loading")).toBeInTheDocument();

  await waitFor(() =>
    expect(screen.getByTestId("gist-list")).toBeInTheDocument()
  ,{timeout:5000});
  expect(screen.getByText(gistApiResponse[0].owner.login)).toBeInTheDocument();
});
