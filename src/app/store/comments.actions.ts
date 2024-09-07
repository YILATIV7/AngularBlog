import {createAction, props} from "@ngrx/store";
import {Comment} from "../models/comment.model";

export const actionCommentsLoading = createAction(
  '[Comments] Comments Loading',
  props<{postId: number}>(),
);

export const actionCommentsLoadingSuccess = createAction(
  '[Comments] Comments Loading Success',
  props<{comments: Comment[]}>(),
);

export const actionCommentsLoadingFailed = createAction(
  '[Comments] Comments Loading Failed',
);

export const actionCommentUploading = createAction(
  '[Comments] Comment Uploading',
  props<{postId: number, comment: Comment}>(),
);

export const actionCommentUploadingSuccess = createAction(
  '[Comments] Comment Uploading Success',
  props<{comment: Comment}>(),
);

export const actionCommentUploadingFailed = createAction(
  '[Comments] Comment Uploading Failed',
);
