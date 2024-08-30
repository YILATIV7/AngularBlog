import {Component, OnInit} from "@angular/core";
import {Post} from "../store/post.model";
import {postsSelector, isLoadingSelector, isErrorSelector} from "../store/posts.selectors";
import {select, Store} from "@ngrx/store";
import {AppState} from "../store/app.state";
import {actionPostsLoading} from "../store/posts.actions";
import {Observable, take} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: "post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]>;
  isLoading$: Observable<boolean>;
  isError$: Observable<boolean>;

  constructor(protected store: Store<AppState>, private toastr: ToastrService) {
    this.posts$ = this.store.pipe(select(postsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.isError$ = this.store.pipe(select(isErrorSelector));

    this.isError$.subscribe(value => {
      if (value) this.toastr
        .error(
          'Click on this message to reload',
          'Error when loading posts', {
            timeOut: 0,
            extendedTimeOut: 0
          })
        .onTap
        .pipe(take(1))
        .subscribe(() => this.store.dispatch(actionPostsLoading()));
    });
  }

  ngOnInit() {
    this.store.dispatch(actionPostsLoading());
  }
}
