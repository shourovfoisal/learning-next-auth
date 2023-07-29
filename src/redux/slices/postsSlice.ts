import { createSlice } from "@reduxjs/toolkit";

type Post = {
    id: number,
    title: string
}

const postsSlice = createSlice({
    name: "posts",
    initialState: [] as Post[],
    reducers: {
        savePosts: (state, action) => {
            state.push(action.payload)
        }
    }
});

export const { savePosts } = postsSlice.actions
export default postsSlice.reducer