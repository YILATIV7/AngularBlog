import {Post} from "./post.model";

export interface PostListState {
  isLoading: boolean,
  isError: boolean,
  posts: Post[]
}
