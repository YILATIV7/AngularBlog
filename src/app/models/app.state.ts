import {PostListState} from "./post-list.state";
import {CommentsState} from "./comments.state";

export interface AppState {
  postList: PostListState,
  commentList: CommentsState,
}
