import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./postsSlice";
import {authReducer} from "./authSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
    },
});