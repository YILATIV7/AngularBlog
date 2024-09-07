import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CommentsService} from "../services/comments.service";
import {catchError, exhaustMap, map, of} from "rxjs";
import {
  actionCommentsLoading,
  actionCommentsLoadingFailed,
  actionCommentsLoadingSuccess,
  actionCommentUploading,
  actionCommentUploadingFailed,
  actionCommentUploadingSuccess
} from "./comments.actions";

@Injectable()
export class CommentsEffects {
  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCommentsLoading),
      exhaustMap(action => this.commentsService.getComments(action.postId)
        .pipe(
          map(comments => actionCommentsLoadingSuccess({comments})),
          catchError(() => of(actionCommentsLoadingFailed())),
        )
      )
    )
  );

  uploadComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCommentUploading),
      exhaustMap(action => this.commentsService.addComment(action.postId, action.comment)
        .pipe(
          map(comment => actionCommentUploadingSuccess({comment})),
          catchError(() => of(actionCommentUploadingFailed()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private commentsService: CommentsService
  ) {
  }
}
