import {createAction, props} from "@ngrx/store";
import {Post} from "./post.model"

export const actionPostsLoading = createAction(
  '[Posts] Posts Loading',
);

export const actionPostsLoadingSuccess = createAction(
  '[Posts] Posts Loading Success',
  props<{posts: Post[]}>(),
);

export const actionPostsLoadingFailed = createAction(
  '[Posts] Posts Loading Failed',
);
