import { createSlice } from "@reduxjs/toolkit";

type Post = {
    id: number,
    title: string
}

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [] as Post[],
    },
    reducers: {
        savePosts: (state, action) => {
            state.posts = action.payload;
        }
    }
});

export const { savePosts } = postsSlice.actions
export default postsSlice.reducer