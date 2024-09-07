import {Comment} from "./comment.model";

export interface CommentsState {
  isListLoading: boolean,
  isListLoadingError: boolean,
  comments: Comment[],
  isCommentUploading: boolean,
  isCommentUploadingError: boolean,
}
