import {AppState} from "../../app.state";
import {createSelector} from "@ngrx/store";
import {PostListState} from "../post-list.state";

export const selectFeature = (state: AppState) => state.postList;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state: PostListState) => state.isLoading
);

export const postsSelector = createSelector(
  selectFeature,
  (state: PostListState) => state.posts ? state.posts.slice(0, state.showedPostsCount) : []
);
