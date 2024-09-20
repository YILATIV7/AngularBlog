import {Component, OnInit} from "@angular/core";
import {Post} from "../post.model";
import {postsSelector, isLoadingSelector} from "../store/posts.selectors";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../app.state";
import * as PostActions from "../store/posts.actions";
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

  constructor(protected store: Store<AppState>, private toastr: ToastrService, private router: Router) {
    this.posts$ = this.store.pipe(select(postsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }

  loadPosts() {
    this.toastr.clear();
    this.store.dispatch(PostActions.actionLoadPosts());
  }

  ngOnInit() {
    this.loadPosts();
  }

  onScroll() {
    this.store.dispatch(PostActions.actionPostsScrolled());
  }

  openComments(postId: number) {
    this.router.navigate([`posts/${postId}/comments`]);
  }

  protected readonly alert = alert;
}
