//src
import App from "../App";
import { gistApiResponse } from "./mockUserResponses/gistsResponse";
import { mockServer } from "./mockUserResponses/mockApi";
import { GistData } from "./mockUserResponses/reduxGists";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "./utils/customRender";

beforeAll(() => mockServer.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => {
  mockServer.resetHandlers();
});
afterAll(() => mockServer.close());

describe("when List Displays", () => {
  it("when user Clicks on Some Gist", async () => {
    render(<App />);

    //waiting for loading to end and show Gists
    expect(screen.getByTestId("loading")).toBeInTheDocument();

    //waiting for gistList to show
    await waitFor(
      () => expect(screen.getByTestId("gist-list")).toBeInTheDocument(),
      { timeout: 5000 }
    );

    //expecting to see owner name from gist response

    //clicking what we get from gist api response
    fireEvent.click(screen.getByTestId("user-image"));
    fireEvent.click(screen.getByText("Your Gists"));

    //expecting to see gist page which shows details of selected gist.
    await waitFor(
      () => expect(screen.getByTestId("gist-container")).toBeInTheDocument(),
      { timeout: 3000 }
    );

    //clicking star/unstar button
    console.log(screen.getByTestId('gist-container').textContent)
    fireEvent.click(screen.getByTestId("gist-option-button-delete"));
    await waitForElementToBeRemoved(()=>(screen.getByTestId('loading-spinner')),{timeout:5000})
    console.log(screen.getByTestId('gist-container').textContent)
    //wait for completion :)
    expect(screen.getByText('Deleted Successfully')).toBeInTheDocument()

    
   
  }, 15000);
});
