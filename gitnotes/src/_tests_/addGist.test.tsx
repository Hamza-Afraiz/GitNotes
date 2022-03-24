//lib
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { CreateGist } from "../containers";
//src
import store from "../store/store";
import { theme } from "../theme/Theme";
import { mockServer } from "./mockUserResponses/mockApi";
import { ThemeProvider } from "@mui/material/styles";

beforeAll(() => mockServer.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => {
  mockServer.resetHandlers();
});
afterAll(() => mockServer.close());

const screenSetup = () => {
  const screen = render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CreateGist />
      </Provider>
    </ThemeProvider>,
    { wrapper: MemoryRouter }
  );
  const fileName = screen.getByTestId("file-name");
  const fileContent = screen.getByTestId("file-content");
  const gistDescription = screen.getByTestId("gist-description");
  return {
    fileContent,
    fileName,
    gistDescription,
  };
};

test("Gist should be added successfully", async () => {
  const { fileContent, fileName, gistDescription } = screenSetup();

  //entering value for gist file
  fireEvent.change(fileName, { target: { value: "1212" } });
  fireEvent.change(fileContent, { target: { value: "entered Content" } });
  fireEvent.change(gistDescription, { target: { value: "1212" } });

  //adding one file to gist
  fireEvent.click(screen.getByTestId("add-file"));
  expect(screen.getByTestId("file-added")).toBeInTheDocument();

  //adding gist
  fireEvent.click(screen.getByTestId("add-gist"));

  //expecting to see gist added.
  await waitFor(() =>
    expect(screen.getByTestId("gist-added")).toBeInTheDocument()
  );
});

//checking by giving not the fileName and Gist Description
test("Gist shouldn't added", async () => {
  const { fileContent } = screenSetup();

  fireEvent.change(fileContent, { target: { value: "entered Content" } });

  fireEvent.click(screen.getByTestId("add-file"));

  await waitFor(() => {
    expect(
      screen.getByText("Please enter file content first")
    ).toBeInTheDocument();
  });
});
