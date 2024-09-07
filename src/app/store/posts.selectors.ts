import {AppState} from "../models/app.state";
import {createSelector} from "@ngrx/store";
import {PostListState} from "../models/post-list.state";

export const selectFeature = (state: AppState) => state.postList;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state: PostListState) => state.isLoading
);

export const isErrorSelector = createSelector(
  selectFeature,
  (state: PostListState) => state.isError
);

export const postsSelector = createSelector(
  selectFeature,
  (state: PostListState) => state.posts ? state.posts.slice(0, state.showedPostsCount) : []
);

export const isPostsPresentSelector = createSelector(
  selectFeature,
  (state: PostListState) => state.posts.length > 0
);
