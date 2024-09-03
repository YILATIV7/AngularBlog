import {Injectable} from "@angular/core";
import {catchError, exhaustMap, map, of} from "rxjs";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PostsService} from "../services/posts.service";
import {actionPostsLoading, actionPostsLoadingFailed, actionPostsLoadingSuccess} from "./posts.actions";

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionPostsLoading),
      exhaustMap(() => this.postsService.getPosts()
        .pipe(
          map(posts => actionPostsLoadingSuccess({ posts: posts })),
          catchError(() => of(actionPostsLoadingFailed()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private postsService: PostsService
  ) {}
}
