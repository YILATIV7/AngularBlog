import {Routes} from "@angular/router";
import {PostListComponent} from "./post-list/component/post-list.component";
import {CommentsComponent} from "./comments/component/comments.component";

export const appRoutes: Routes = [
  {path: 'posts', title: 'Posts', component: PostListComponent},
  {path: 'posts/:id/comments', title: 'Comments', component: CommentsComponent},
  {path: '', redirectTo: 'posts', pathMatch: 'full'},
];
