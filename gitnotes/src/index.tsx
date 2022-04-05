//lib
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
//src
import store from "./store/store";
import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: Infinity,
      cacheTime:Infinity
      
    

    },
  },
})
ReactDOM.render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
    <Provider store={store}>
    <App />
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
  ,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
