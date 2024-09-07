import {PostListState} from "./post-list.state";
import {CommentsState} from "../store/comments.reducers";

export interface AppState {
  postList: PostListState,
  commentList: CommentsState,
}
