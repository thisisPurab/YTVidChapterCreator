import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSLice";
import playerReducer from "./playerSlice";

const userPersistConfig = {
    key: "user",
    storage,
};

const playerPersistConfig = {
    key: "player",
    storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedPlayerReducer = persistReducer(
    playerPersistConfig,
    playerReducer
);

const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        player: persistedPlayerReducer,
    },
});

const persistor = persistStore(store);

export { store, persistor };
