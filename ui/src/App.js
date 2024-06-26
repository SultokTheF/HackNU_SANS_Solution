import React from "react";
import VideoCall from "src/components/video-call";
import LoginScreen from "src/components/login-screen";
import { ContextProvider } from "src/socket-context";
import Navbar from "./components/navigation/Navbar";

import "./assets/global.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Switch>
          <Route path="/" exact>
            <LoginScreen />
          </Route>
          <Route path="/call">
            <ContextProvider>
              <VideoCall />
            </ContextProvider>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
