import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from '../api/index'

export const fetchPosts = createAsyncThunk('postSlice/fetchPosts', async ({page}) => {
    const {data} = await axios.get(`/posts?page=${page}`)
    console.log(data)
    return data
})

export const fetchPostPosts = createAsyncThunk('postSlice/fetchPostPosts', async ({post}) => {
    console.log(post)
    const {data} = await axios.post('/posts', post)
    console.log(post, 'fetchPost')
    return data
})

export const updatePosts = createAsyncThunk('postSlice/updatePosts', async ({currentId, post}) => {
    const {data} = await axios.patch(`/posts/${currentId}`, post)
    return data
})

export const deletePosts = createAsyncThunk('postSlice/deletePosts', async ({currentId}) => {
    const {data} = await axios.delete(`/posts/${currentId}`)
    return {data, currentId}
})

export const likePosts = createAsyncThunk('postSlice/likePosts', async ({currentId}) => {
    const {data} = await axios.patch(`/posts/${currentId}/likePost`)
    return data
})

export const getPostBySearch = createAsyncThunk('postSlice/getPostBySearch', async ({searchQuery}) => {
    const {data: {data}} = await axios.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
    return data
})

export const getPost = createAsyncThunk('postSlice/getPost', async ({id}) => {
    const {data} = await axios.get(`/posts/${id}`)
    return data
})

export const commentPost = createAsyncThunk('postSlice/commentPost', async ({finalComment, id}) => {
    const {data} = await axios.post(`/posts/${id}/commentPost`, {finalComment})
    console.log(data)
    return data
})

const initialState = {
    posts: {
        items: [],
        status: "loading",
    },
}

const postSlice = createSlice({
    name: 'postSlice',
    initialState,
    reducers: {
        createPost: (state, action) => {
            state.posts.items = [...state.posts.items, action.payload]
        },
        deletePost: (state) => {
            state.posts = {
                items: [],
                status: "loading",
            }
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = "loading";
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts = {
                ...state.posts,
                items: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
            state.posts.status = "loaded";

        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
        },
        [fetchPostPosts.pending]: (state) => {
            state.posts.status = "loading";
        },
        [fetchPostPosts.fulfilled]: (state, action) => {
            state.posts.items = [...state.posts.items, action.payload];
            state.posts.status = "loaded";
        },
        [updatePosts.fulfilled]: (state, action) => {
            state.posts.items = state.posts.items.map((item) => item._id === action.payload._id ? action.payload : item)
        },
        [deletePosts.fulfilled]: (state, action) => {
            state.posts.items = state.posts.items.filter((post) => post._id !== action.payload.currentId)
        },
        [likePosts.fulfilled]: (state, action) => {
            state.posts.items = state.posts.items.map((item) => item._id === action.payload._id ? action.payload : item)
        },
        [getPostBySearch.pending]: (state) => {
            state.posts.status = "loading";
        },
        [getPostBySearch.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.posts.status = "loaded";
        },
        [getPost.pending]: (state, action) => {
            state.posts.status = 'loading'
        },
        [getPost.fulfilled]: (state, action) => {
            state.posts.post = action.payload
            state.posts.status = 'loaded'
        },
        [commentPost.pending]: (state, action) => {
            // state.posts.status = 'loading'
        },
        [commentPost.fulfilled]: (state, action) => {
            // state.posts.status = 'loaded'
            state.posts = {
                ...state.posts,
                items: state.posts.items.map((post) => {
                    if (post._id === action.payload._id) {
                        return action.payload
                    }
                    return post
                })
            };
        }
    }
})

export const {createPost, deletePost} = postSlice.actions

export const postsReducer = postSlice.reducer;
