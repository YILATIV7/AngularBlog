import {createReducer, on} from "@ngrx/store";
import * as PostActions from "./posts.actions";
import {PostListState} from "../post-list.state";

export const initialState: PostListState = {
  isLoading: false,
  posts: [],
  showedPostsCount: 20
};

export const postsReducers = createReducer(
  initialState,
  on(PostActions.actionLoadPosts, () => ({...initialState, isLoading: true})),
  on(PostActions.actionLoadPostsSuccess, (state, {posts}) => ({...state, posts: posts, isLoading: false})),
  on(PostActions.actionLoadPostsFailed, state => ({...state, isLoading: false})),

  on(PostActions.actionPostsScrolled, state => ({
    ...state,
    showedPostsCount: (state.showedPostsCount + 10 < 100 ? state.showedPostsCount + 10 : 100)
  })),
);
