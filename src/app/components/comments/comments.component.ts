import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Observable, of} from "rxjs";
import {CommentsService} from "../../services/comments.service";
import {Comment} from "../../models/comment.model";

@Component({
  selector: "comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"]
})
export class CommentsComponent {
  postId$: Observable<number>;
  comments$: Observable<Comment[]>;

  constructor(private route: ActivatedRoute, private service: CommentsService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postId$ = of(id).pipe();
    this.comments$ = this.service.getComments(id);
  }
}
