import {createAction, props} from "@ngrx/store";
import {Comment} from "../comment.model";
import {HttpErrorResponse} from "@angular/common/http";

export const actionLoadComments = createAction(
  '[Comments] Load Comments',
  props<{postId: number}>(),
);

export const actionLoadCommentsSuccess = createAction(
  '[Comments] Load Comments Success',
  props<{comments: Comment[]}>(),
);

export const actionLoadCommentsFailed = createAction(
  '[Comments] Load Comments Failed',
  props<{error: HttpErrorResponse}>(),
);

export const actionAddComment = createAction(
  '[Comments] Add Comment',
  props<{postId: number, comment: Comment}>(),
);

export const actionAddCommentSuccess = createAction(
  '[Comments] Add Comment Success',
  props<{comment: Comment}>(),
);

export const actionAddCommentFailed = createAction(
  '[Comments] Add Comment Failed',
  props<{error: HttpErrorResponse}>(),
);
