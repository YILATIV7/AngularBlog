import {PostListState} from "./post-list/post-list.state";
import {CommentsState} from "./comments/store/comments.reducers";

export interface AppState {
  postList: PostListState,
  commentList: CommentsState,
}
