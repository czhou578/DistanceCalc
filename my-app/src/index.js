import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import allReducers from "./reducers/index";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
    ,
  </ApolloProvider>,
  document.getElementById("root")
);
