import {AppState} from "../../app.state";
import {createSelector} from "@ngrx/store";
import {commentsAdapter, CommentsState} from "./comments.reducers";

export const selectFeature = (state: AppState) => state.commentList;

export const selectIsListLoading = createSelector(
  selectFeature,
  (state: CommentsState) => state.isListLoading
);

export const selectComments = createSelector(
  selectFeature,
  commentsAdapter.getSelectors().selectAll
);

export const selectIsCommentAdding = createSelector(
  selectFeature,
  (state: CommentsState) => state.isCommentUploading
);
