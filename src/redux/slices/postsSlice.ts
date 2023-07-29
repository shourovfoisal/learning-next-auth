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
            console.log("Inside post save action");
            console.log("action payload is: ");
            console.log(action.payload);
            state.posts = action.payload;
            console.log("state is: ");
            console.log(state.posts);
        }
    }
});

export const { savePosts } = postsSlice.actions
export default postsSlice.reducer