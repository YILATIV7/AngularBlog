import {createReducer, on} from "@ngrx/store";
import {
  actionPostsLoading,
  actionPostsLoadingFailed,
  actionPostsLoadingSuccess,
  actionPostsScrolled
} from "./posts.actions";
import {PostListState} from "../models/post-list.state";

export const initialState: PostListState = {
  isLoading: false,
  isError: false,
  posts: [],
  showedPostsCount: 20
};

export const postsReducers = createReducer(
  initialState,
  on(actionPostsLoading, state => ({...state, isLoading: true, isError: false})),
  on(actionPostsLoadingSuccess, (state, {posts}) => ({...state, posts: posts, isLoading: false})),
  on(actionPostsLoadingFailed, state => ({...state, isLoading: false, isError: true})),

  on(actionPostsScrolled, state => ({
    ...state,
    showedPostsCount: (state.showedPostsCount + 10 < 100 ? state.showedPostsCount + 10 : 100)
  })),
);
