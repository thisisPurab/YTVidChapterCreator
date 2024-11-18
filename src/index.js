import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSLice";
import playerReducer from "./redux/playerSlice";
import { Provider } from "react-redux";
import "./index.css";

const store = configureStore({
    reducer: {
        user: userReducer,
        player: playerReducer,
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
