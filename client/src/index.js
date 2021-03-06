import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Auth0Provider } from "@auth0/auth0-react";
import "draft-js/dist/Draft.css";

import rootReducer from "./reducers/rootReducer";
import {
  ThemeProvider,
  DialogProvider,
} from "./contexts";
import App from "./App.jsx";
import "./index.css";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      audience={process.env.REACT_APP_AUTH0_IDENTIFIER}
    >
      <ThemeProvider>
        <DialogProvider>
            <App />
        </DialogProvider>
      </ThemeProvider>
    </Auth0Provider>
  </Provider>,
  document.getElementById("root")
);
