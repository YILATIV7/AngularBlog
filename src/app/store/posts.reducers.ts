import {createReducer, on} from "@ngrx/store";
import {actionPostsLoading, actionPostsLoadingFailed, actionPostsLoadingSuccess} from "./posts.actions";
import {AppState} from "./app.state";

export const initialState: AppState = {
  postList: {
    isLoading: false,
    isError: false,
    posts: []
  }
};

export const postsReducers = createReducer(
  initialState,
  on(actionPostsLoading, state => ({...state, isLoading: true, isError: false})),
  on(actionPostsLoadingSuccess, (state, {posts}) => ({...state, posts: posts, isLoading: false})),
  on(actionPostsLoadingFailed, state => ({...state, isLoading: false, isError: true})),
);
