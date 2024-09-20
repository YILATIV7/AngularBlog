import {Post} from "./post.model";

export interface PostListState {
  isLoading: boolean,
  posts: Post[],
  showedPostsCount: number,
}
