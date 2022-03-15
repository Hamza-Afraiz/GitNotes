import { ThemeProvider } from "@mui/material/styles";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { theme } from "../theme/Theme";
import { CreateGist } from "../containers";
import store from "../store/store";

const fakeUserResponse = [
  {
    url: "https://api.github.com/gists/0c0f834762983f6e991587a467156b5d",
    forks_url:
      "https://api.github.com/gists/0c0f834762983f6e991587a467156b5d/forks",
    commits_url:
      "https://api.github.com/gists/0c0f834762983f6e991587a467156b5d/commits",
    id: "0c0f834762983f6e991587a467156b5d",
    node_id: "G_kwDOAqf4adoAIDBjMGY4MzQ3NjI5ODNmNmU5OTE1ODdhNDY3MTU2YjVk",
    git_pull_url:
      "https://gist.github.com/0c0f834762983f6e991587a467156b5d.git",
    git_push_url:
      "https://gist.github.com/0c0f834762983f6e991587a467156b5d.git",
    html_url: "https://gist.github.com/0c0f834762983f6e991587a467156b5d",
    files: {
      hello: {
        filename: "hello",
        type: "text/plain",
        language: null,
        raw_url:
          "https://gist.githubusercontent.com/Hamza-Afraiz/0c0f834762983f6e991587a467156b5d/raw/b6fc4c620b67d95f953a5c1c1230aaab5db5a1b0/hello",
        size: 5,
      },
    },
    public: false,
    created_at: "2022-03-10T07:37:00Z",
    updated_at: "2022-03-10T07:37:01Z",
    description: "des",
    comments: 0,
    user: null,
    comments_url:
      "https://api.github.com/gists/0c0f834762983f6e991587a467156b5d/comments",
    owner: {
      login: "Hamza-Afraiz",
      id: 44562537,
      node_id: "MDQ6VXNlcjQ0NTYyNTM3",
      avatar_url: "https://avatars.githubusercontent.com/u/44562537?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/Hamza-Afraiz",
      html_url: "https://github.com/Hamza-Afraiz",
      followers_url: "https://api.github.com/users/Hamza-Afraiz/followers",
      following_url:
        "https://api.github.com/users/Hamza-Afraiz/following{/other_user}",
      gists_url: "https://api.github.com/users/Hamza-Afraiz/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/Hamza-Afraiz/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/Hamza-Afraiz/subscriptions",
      organizations_url: "https://api.github.com/users/Hamza-Afraiz/orgs",
      repos_url: "https://api.github.com/users/Hamza-Afraiz/repos",
      events_url: "https://api.github.com/users/Hamza-Afraiz/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/Hamza-Afraiz/received_events",
      type: "User",
      site_admin: false,
    },
    truncated: false,
  },
];
const server = setupServer(
  rest.post("https://api.github.com/gists", (req, res, ctx) => {
    console.log("api called =======================>");
    return res(ctx.json(fakeUserResponse));
  })
);

const setup = () => {
  const utils = render(<CreateGist />);
  const fileContent = utils.getByLabelText("File Content");
  const fileName = utils.getAllByLabelText("File Name");
  const gistDescription = utils.getAllByLabelText("Gist Description");

  return {
    fileContent,
    fileName,
    gistDescription,
    ...utils,
  };
};

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

test("Gist should added", async () => {
  render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CreateGist />
      </Provider>
    </ThemeProvider>,
    { wrapper: MemoryRouter }
  );

  
  const fileContent = screen.getByLabelText("File Content");
  const fileName = screen.getByLabelText("File Name");
  const gistDescription = screen.getByLabelText("Gist Description");

  fireEvent.change(fileContent, { target: { value: "121" } });
  fireEvent.change(fileName, { target: { value: "1212" } });
  fireEvent.change(gistDescription, { target: { value: "1212" } });
  fireEvent.click(screen.getByLabelText("Add File"));
//   const inputValue = screen.getByTestId('file-added').getAttribute('value');
//   console.log("input value is",inputValue)
  await waitFor(() => {
    expect(screen.queryAllByTestId("file-added")).toHaveLength(1);
  });
  fireEvent.click(screen.getByLabelText("Add Gist"));
  
  await waitFor(() => {
    expect(screen.queryAllByTestId("gist-posted")).toHaveLength(1);
  });
});
