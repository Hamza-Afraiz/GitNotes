

//src
import App from "../App";
import { gistApiResponse } from "./mockUserResponses/gistsResponse";
import { mockServer } from "./mockUserResponses/mockApi";
import { render,fireEvent, screen, waitFor } from "./utils/customRender";

beforeAll(() => mockServer.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => {
  mockServer.resetHandlers();
});
afterAll(() => mockServer.close());

test("when user search some gist and found result", async () => {
  render(<App />);

  //we have to wait for gist lists, because we are getting search results from gists
  await waitFor(() => {
    expect(screen.getByTestId("gist-list")).toBeInTheDocument();
  },{timeout:5000});
  const searchInput = screen.getByLabelText("search");

  fireEvent.change(searchInput, { target: { value: "8" } });

  fireEvent.click(screen.getByTestId("search-button"));

  //expecting to see owner name from gist response
  expect(screen.getByText(gistApiResponse[0].owner.login)).toBeInTheDocument();
});


