import {AppState} from "../models/app.state";
import {createSelector} from "@ngrx/store";
import {CommentsState} from "../models/comments.state";

export const selectFeature = (state: AppState) => state.commentList;

export const isListLoadingSelector = createSelector(
  selectFeature,
  (state: CommentsState) => state.isListLoading
);

export const isListLoadingErrorSelector = createSelector(
  selectFeature,
  (state: CommentsState) => state.isListLoadingError
);

export const commentsSelector = createSelector(
  selectFeature,
  (state: CommentsState) => state.comments ? state.comments : []
);

export const isCommentUploadingSelector = createSelector(
  selectFeature,
  (state: CommentsState) => state.isCommentUploading
);

export const isCommentUploadingErrorSelector = createSelector(
  selectFeature,
  (state: CommentsState) => state.isCommentUploadingError
);
