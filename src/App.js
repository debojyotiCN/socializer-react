import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import HomePage from './pages/home-page';
import ProtectedRoute from './components/protected-routes';
import LoginPage from './pages/login-page';
import FullPageLoader from "./containers/full-page-loader";
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from "react-toasts";
import VideoCallPage from "./pages/video-call-page/video-call-page";
import RoomConnectorPage from "./pages/room-connector-page/room-connector-page";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div></div>} persistor={persistor}>
        <Router>
          <div>
            <FullPageLoader></FullPageLoader>
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT} />
            <Switch>
              <Route path="/room" component={VideoCallPage} /> 
              <Route path="*" component={RoomConnectorPage} /> 
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
