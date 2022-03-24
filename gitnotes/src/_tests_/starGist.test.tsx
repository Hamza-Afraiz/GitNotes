
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

describe("when List Displays", () => {
  it("when user Clicks on Some Gist", async () => {
    render(<App/>);

    //waiting for loading to end and show Gists
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  
//waiting for gistList to show
    await waitFor(()=>expect(screen.getByTestId("gist-list")).toBeInTheDocument(),{timeout:5000})
   

    //expecting to see owner name from gist response
    expect(
      screen.getByText(gistApiResponse[0].owner.login)
    ).toBeInTheDocument();

    //clicking what we get from gist api response
    fireEvent.click(screen.getAllByRole("cell")[0]);

    //expecting to see gist page which shows details of selected gist.
    expect(
      screen.queryByText(gistApiResponse[0].description)
    ).toBeInTheDocument();

     //clicking star/unstar button 
    fireEvent.click(screen.getByTestId('gist-option-button-star'));
    //wait for completion :)
    
    await waitFor(()=>expect(screen.getByTestId("gist-option-completion")).toBeInTheDocument(),{timeout:2000})
  },10000);
});
