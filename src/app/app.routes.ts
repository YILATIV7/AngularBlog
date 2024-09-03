import {Routes} from "@angular/router";
import {PostListComponent} from "./components/post-list/post-list.component";
import {CommentsComponent} from "./components/comments/comments.component";

export const appRoutes: Routes = [
  {path: 'posts', title: 'Posts', component: PostListComponent},
  {path: 'posts/:id/comments', title: 'Comments', component: CommentsComponent},
  {path: '', redirectTo: 'posts', pathMatch: 'full'},
];
