import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import MainRouter from "./main";

ReactDOM.render(<MainRouter />, document.getElementById("root"));
serviceWorker.register();
