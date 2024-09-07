import {Component, OnInit} from "@angular/core";
import {Post} from "../../models/post.model";
import {postsSelector, isLoadingSelector, isErrorSelector} from "../../store/posts.selectors";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../models/app.state";
import {actionPostsLoading, actionPostsScrolled} from "../../store/posts.actions";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: "post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]>;
  isLoading$: Observable<boolean>;
  isError$: Observable<boolean>;

  constructor(protected store: Store<AppState>, private toastr: ToastrService, private router: Router) {
    this.posts$ = this.store.pipe(select(postsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.isError$ = this.store.pipe(select(isErrorSelector));

    this.isError$.subscribe(value => {
      if (value) {
        this.toastr
          .error(
            'Error when loading posts',
            'Error'
          )
      }
    });
  }

  loadPosts() {
    this.toastr.clear();
    this.store.dispatch(actionPostsLoading());
  }

  ngOnInit() {
    this.loadPosts();
  }

  onScroll() {
    this.store.dispatch(actionPostsScrolled());
  }

  openComments(postId: number) {
    this.router.navigate([`posts/${postId}/comments`]);
  }

  protected readonly alert = alert;
}
