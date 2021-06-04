import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import { PersistGate } from "redux-persist/integration/react";
import FullPageLoader from "./containers/full-page-loader";
import GamePage from "./pages/game-page/game-page";
import RoomConnectorPage from "./pages/room-connector-page/room-connector-page";
import { persistor, store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div></div>} persistor={persistor}>
        <Router>
          <div>
            <FullPageLoader></FullPageLoader>
            <ToastsContainer
              store={ToastsStore}
              position={ToastsContainerPosition.BOTTOM_RIGHT}
            />
            <Switch>
              <Route path="/room" component={GamePage} />
              <Route path="*" component={RoomConnectorPage} />
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
