import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Comment} from "../../models/comment.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../models/app.state";
import {ToastrService} from "ngx-toastr";
import {
  isListLoadingErrorSelector,
  isListLoadingSelector,
  commentsSelector,
  isCommentUploadingSelector, isCommentUploadingErrorSelector
} from "../../store/comments.selectors";
import {actionCommentsLoading, actionCommentUploading} from "../../store/comments.actions";

@Component({
  selector: "comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"]
})
export class CommentsComponent implements OnInit {
  postId: number;
  isListLoading$: Observable<boolean>;
  isListLoadingError$: Observable<boolean>;
  comments$: Observable<Comment[]>;
  isCommentUploading$: Observable<boolean>;
  isCommentUploadingError$: Observable<boolean>;

  nameProperty = "";
  emailProperty = "";
  bodyProperty = "";

  constructor(protected store: Store<AppState>, private toastr: ToastrService, private route: ActivatedRoute) {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));

    this.comments$ = this.store.select(commentsSelector);
    this.isListLoading$ = this.store.select(isListLoadingSelector);
    this.isListLoadingError$ = this.store.select(isListLoadingErrorSelector);
    this.isCommentUploading$ = this.store.select(isCommentUploadingSelector);
    this.isCommentUploadingError$ = this.store.select(isCommentUploadingErrorSelector);

    this.isListLoadingError$.subscribe(value => {
      if (value) {
        this.toastr
          .error(
            'Error when loading comments',
            'Error'
          );
      }
    });

    this.isCommentUploadingError$.subscribe(value => {
      if (value) {
        this.toastr
          .error(
            'Error when uploading comment',
            'Error'
          );
      }
    });
  }

  ngOnInit() {
    this.loadComments()
  }

  loadComments() {
    this.toastr.clear();
    this.store.dispatch(actionCommentsLoading({postId: this.postId}));
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
    this.store.dispatch(actionCommentUploading({postId: this.postId, comment}));
  }
}
