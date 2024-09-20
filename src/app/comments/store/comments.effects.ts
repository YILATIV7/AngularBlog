import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CommentsService} from "../comments.service";
import {catchError, exhaustMap, map, of, tap} from "rxjs";
import * as CommentActions from "./comments.actions";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class CommentsEffects {
  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.actionLoadComments),
      exhaustMap(action => this.commentsService.getComments(action.postId)
        .pipe(
          map(comments => CommentActions.actionLoadCommentsSuccess({comments})),
          catchError((error: HttpErrorResponse) => of(CommentActions.actionLoadCommentsFailed(error))),
        )
      )
    )
  );

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.actionAddComment),
      exhaustMap(action => this.commentsService.addComment(action.postId, action.comment)
        .pipe(
          map(comment => CommentActions.actionAddCommentSuccess({comment})),
          catchError((error: HttpErrorResponse) => of(CommentActions.actionAddCommentFailed(error)))
        )
      )
    )
  );

  loadCommentsFailed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommentActions.actionLoadCommentsFailed),
      tap(() => {
        this.toastr
          .error(
            'Error when loading comments'
          );
      })
    )
  }, {dispatch: false});

  addCommentFailed = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommentActions.actionAddCommentFailed),
      tap(() => {
        this.toastr
          .error(
            'Error when uploading comment'
          );
      })
    )
  }, {dispatch: false});

  addCommentSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommentActions.actionAddCommentSuccess),
      tap(() => {
        this.toastr
          .success(
            'Comment uploaded successfully'
          );
      })
    )
  }, {dispatch: false});

  constructor(
    private actions$: Actions,
    private commentsService: CommentsService,
    private toastr: ToastrService
  ) {
  }
}
