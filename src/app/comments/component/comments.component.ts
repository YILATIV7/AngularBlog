import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subject, takeUntil} from "rxjs";
import {Comment} from "../comment.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.state";
import {ToastrService} from "ngx-toastr";
import * as CommentSelectors from "../store/comments.selectors";
import * as CommentActions from "../store/comments.actions";
import {Actions, ofType} from "@ngrx/effects";

@Component({
  selector: "comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"]
})
export class CommentsComponent implements OnInit, OnDestroy {
  postId: number;

  comments$: Observable<Comment[]>;
  isListLoading$: Observable<boolean>;
  isCommentUploading$: Observable<boolean>;

  disabled$ = new Subject<void>();

  isCommentFormShowing = false;
  nameProperty = "";
  emailProperty = "";
  bodyProperty = "";

  constructor(
    protected store$: Store<AppState>,
    private actions$: Actions,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));

    this.comments$ = this.store$.select(CommentSelectors.selectComments);
    this.isListLoading$ = this.store$.select(CommentSelectors.selectIsListLoading);
    this.isCommentUploading$ = this.store$.select(CommentSelectors.selectIsCommentAdding);
  }

  ngOnInit() {
    this.loadComments();
    this.watchActions();
  }

  watchActions() {
    this.actions$.pipe(
      takeUntil(this.disabled$),
      ofType(CommentActions.actionLoadCommentsSuccess)
    ).subscribe(
      () => this.isCommentFormShowing = true
    );

    this.actions$.pipe(
      takeUntil(this.disabled$),
      ofType(CommentActions.actionAddCommentSuccess)
    ).subscribe(
      () => {
        this.nameProperty = "";
        this.emailProperty = "";
        this.bodyProperty = "";
      }
    )
  }

  loadComments() {
    this.toastr.clear();
    this.store$.dispatch(CommentActions.actionLoadComments({postId: this.postId}));
  }

  addComment() {
    // Simple validation
    if (this.nameProperty == ""
      || this.emailProperty == ""
      || this.bodyProperty == "") return;

    const comment: Comment = {
      postId: 0,
      id: 0,
      name: this.nameProperty,
      email: this.emailProperty,
      body: this.bodyProperty,
    };

    this.toastr.clear();
    this.store$.dispatch(CommentActions.actionAddComment({postId: this.postId, comment}));
  }

  ngOnDestroy() {
    this.disabled$.next();
    this.disabled$.complete();
  }
}
