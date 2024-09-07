import {createReducer, on} from "@ngrx/store";
import {CommentsState} from "../models/comments.state";
import {
  actionCommentsLoading,
  actionCommentsLoadingFailed,
  actionCommentsLoadingSuccess,
  actionCommentUploading,
  actionCommentUploadingFailed,
  actionCommentUploadingSuccess
} from "./comments.actions";

export const initialState: CommentsState = {
  isListLoading: false,
  isListLoadingError: false,
  comments: [],
  isCommentUploading: false,
  isCommentUploadingError: false,
};

export const commentsReducers = createReducer(
  initialState,
  on(actionCommentsLoading, () => ({...initialState, isListLoading: true})),
  on(actionCommentsLoadingSuccess, (state, {comments}) => ({...state, comments: comments, isListLoading: false})),
  on(actionCommentsLoadingFailed, state => ({...state, isListLoading: false, isListLoadingError: true})),

  on(actionCommentUploading, (state) => ({...state, isCommentUploading: true, isCommentUploadingError: false})),
  on(actionCommentUploadingSuccess, (state, {comment}) => ({...state, comments: [...state.comments, comment], isCommentUploading: false})),
  on(actionCommentUploadingFailed, (state) => ({...state, isCommentUploading: false, isCommentUploadingError: true})),
);
