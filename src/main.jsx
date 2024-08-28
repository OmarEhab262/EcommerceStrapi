import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import InternetConnectionProvider from "./services/InternetConnectionServices .jsx";

// Create a new QueryClient with specified options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

// Initialize the root element for React
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <InternetConnectionProvider>
        <Router>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </InternetConnectionProvider>
    </Provider>
  </QueryClientProvider>
);
