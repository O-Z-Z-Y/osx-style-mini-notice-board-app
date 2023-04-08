import Macbook from "./component/Macbook";
import "./App.css"
import React from "react";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Macbook></Macbook>
        <div id="root-modal" />
      </div>
    </Provider>
  );
}

export default App;
