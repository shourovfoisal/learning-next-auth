import { configureStore } from "@reduxjs/toolkit";
import posts from "@/redux/slices/postsSlice"

export const store = configureStore({
    reducer: { postData: posts }
});