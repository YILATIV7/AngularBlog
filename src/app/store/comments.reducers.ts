import {createReducer, on} from "@ngrx/store";
import {
  actionCommentsLoading,
  actionCommentsLoadingFailed,
  actionCommentsLoadingSuccess,
  actionCommentUploading,
  actionCommentUploadingFailed,
  actionCommentUploadingSuccess
} from "./comments.actions";
import {Comment} from "../models/comment.model";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";

export interface CommentsState extends EntityState<Comment> {
  isListLoading: boolean,
  isListLoadingError: boolean,
  isCommentUploading: boolean,
  isCommentUploadingError: boolean,
}

export const adapter: EntityAdapter<Comment> = createEntityAdapter<Comment>();

export const initialState: CommentsState = adapter.getInitialState({
  isListLoading: false,
  isListLoadingError: false,
  isCommentUploading: false,
  isCommentUploadingError: false,
});

export const commentsReducers = createReducer(
  initialState,
  on(actionCommentsLoading, () => {
    return {...initialState, isListLoading: true}
  }),
  on(actionCommentsLoadingSuccess, (state, {comments}) => {
    return {...adapter.addMany(comments, state), isListLoading: false}
  }),
  on(actionCommentsLoadingFailed, state => {
    return {...state, isListLoading: false, isListLoadingError: true}
  }),

  on(actionCommentUploading, (state) => {
    return {...state, isCommentUploading: true, isCommentUploadingError: false}
  }),
  on(actionCommentUploadingSuccess, (state, {comment}) => {
    return {...adapter.addOne(comment, state), isCommentUploading: false}
  }),
  on(actionCommentUploadingFailed, (state) => {
    return {...state, isCommentUploading: false, isCommentUploadingError: true}
  }),
);
