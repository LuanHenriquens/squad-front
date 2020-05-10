import React from "react";

import { Provider } from "react-redux";
import store from "./redux/store/index";
import Home from "./components/home/home"

import { NotificationContainer } from "react-notifications"
import 'react-notifications/lib/notifications.css';
function App() {
  return (
    <>
      <Provider store={store}>
        <NotificationContainer />
        <Home></Home>
      </Provider>
    </>
  );
}

export default App;
