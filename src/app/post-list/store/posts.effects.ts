import {Injectable} from "@angular/core";
import {catchError, exhaustMap, map, of, tap} from "rxjs";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PostsService} from "../posts.service";
import * as PostActions from "./posts.actions";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.actionLoadPosts),
      exhaustMap(() => this.postsService.getPosts()
        .pipe(
          map(posts => PostActions.actionLoadPostsSuccess({ posts: posts })),
          catchError(() => of(PostActions.actionLoadPostsFailed()))
        )
      )
    )
  );

  loadPostsFailed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.actionLoadPostsFailed),
      tap(() => {
        this.toastr
          .error(
            'Error when loading posts'
          );
      })
    )
  }, {dispatch: false});

  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private toastr: ToastrService
  ) {}
}
