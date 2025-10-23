import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../redux/settings/settingsSlice";
import appReducer from "../redux/slices/appSlice";
import productReducer from "../redux/slices/productSlice";
import basketReducer from "../redux/slices/basketSlice";

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        app: appReducer,
        product: productReducer,
        basket: basketReducer
    },
});
