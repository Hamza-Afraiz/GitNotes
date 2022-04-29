import { rest } from "msw";
import { setupServer } from "msw/node";
import { gistApiResponse } from "./gistsResponse";
import { GistData } from "./reduxGists";

export const mockServer = setupServer(
  rest.post("https://api.github.com/gists", (req, res, ctx) => {
    return res(ctx.json({ status: 201 }));
  }),
  rest.get("https://api.github.com/gists", (req, res, ctx) => {
    console.log("getting Public Gists");
    return res(ctx.json(gistApiResponse));
  }),
  rest.get("https://api.github.com/gists/starred", (req, res, ctx) => {
    console.log("get starred");
    return res(ctx.json(gistApiResponse));
  }),
  rest.get(gistApiResponse[0].files["hello"].raw_url, (req, res, ctx) => {
    console.log("get files");
    return res(ctx.json("dsaffds dfasf afdsf"));
  }),
  rest.get("https://github.com/login/oauth/authorize", (req, res, ctx) => {
    console.log("get login");
    return res(
      ctx.json({
        operationType: "signIn",
        credential: {
          providerId: "github.com",
          signInMethod: "github.com",
          pendingToken: null,
          accessToken: "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",
        },
        additionalUserInfo: {
          isNewUser: false,
          providerId: "github.com",
          username: "Hamza-Afraiz",
        },
        user: "",
      })
    );
  }),
  rest.put(
    `https://api.github.com/gists/${GistData[0].gistId}/star`,
    (req, res, ctx) => {
      console.log("getting starred mock responses ");
      return res(ctx.json({ data: "", status: 204, headers: {}, config: {} }));
    }
  ),
  rest.delete(
    `https://api.github.com/gists/${GistData[0].gistId}/star`,
    (req, res, ctx) => {
      console.log("getting unStar mock responses ");
      return res(ctx.json({ data: "", status: 204, headers: {}, config: {} }));
    }
  )
);
