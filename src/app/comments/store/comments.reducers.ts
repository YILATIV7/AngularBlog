import {createReducer, on} from "@ngrx/store";
import * as CommentActions from "./comments.actions";
import {Comment} from "../comment.model";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";

export interface CommentsState extends EntityState<Comment> {
  isListLoading: boolean,
  isCommentUploading: boolean
}

export const commentsAdapter: EntityAdapter<Comment> = createEntityAdapter<Comment>({
  selectId: model => model.id,
  sortComparer: (a, b) => a.id - b.id
});

export const initialState: CommentsState = commentsAdapter.getInitialState({
  isListLoading: false,
  isCommentUploading: false
});

export const commentsReducers = createReducer(
  initialState,
  on(CommentActions.actionLoadComments, () => {
    return {...initialState, isListLoading: true}
  }),
  on(CommentActions.actionLoadCommentsSuccess, (state, {comments}) => {
    return {...commentsAdapter.addMany(comments, state), isListLoading: false}
  }),
  on(CommentActions.actionLoadCommentsFailed, state => {
    return {...state, isListLoading: false, isListLoadingError: true}
  }),

  on(CommentActions.actionAddComment, (state) => {
    return {...state, isCommentUploading: true, isCommentUploadingError: false}
  }),
  on(CommentActions.actionAddCommentSuccess, (state, {comment}) => {
    return {...commentsAdapter.addOne(comment, state), isCommentUploading: false}
  }),
  on(CommentActions.actionAddCommentFailed, (state) => {
    return {...state, isCommentUploading: false, isCommentUploadingError: true}
  }),
);
