import {createAction, props} from "@ngrx/store";
import {Post} from "../post.model"

export const actionLoadPosts = createAction(
  '[Posts] Load Posts',
);

export const actionLoadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{posts: Post[]}>(),
);

export const actionLoadPostsFailed = createAction(
  '[Posts] Load Posts Failed',
);

export const actionPostsScrolled = createAction(
  '[Posts] Posts Scrolled',
);
