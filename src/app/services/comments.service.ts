import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Comment} from "../models/comment.model";
import {delay, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class CommentsService {
  constructor(private http: HttpClient) {}

  getComments(postId: number) {
    return this.getCommentsOnline(postId);
  }

  getCommentsOnline(postId: number) {
    return this.http
      .get<Comment[]>(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      )
  }

  getCommentsOffline(postId: number) {
    const comments = [
      {
        postId: postId,
        id: 1,
        name: "Joulien",
        email: "joulien@gmail.com",
        body: "What is the nice post?"
      },
      {
        postId: postId,
        id: 2,
        name: "Alex",
        email: "alex@gmail.com",
        body: "lorem ipsum dolor sit amet. lorem ipsum"
      },
      {
        postId: postId,
        id: 3,
        name: "Kolya",
        email: "kolya57@gmail.com",
        body: "Some test comments"
      },
      {
        postId: postId,
        id: 4,
        name: "Joulien",
        email: "joulien@gmail.com",
        body: "What is the nice post?"
      },
      {
        postId: postId,
        id: 5,
        name: "Alex",
        email: "alex@gmail.com",
        body: "lorem ipsum dolor sit amet. lorem ipsum"
      },
      {
        postId: postId,
        id: 6,
        name: "Kolya",
        email: "kolya57@gmail.com",
        body: "Some test comments"
      },
      {
        postId: postId,
        id: 7,
        name: "Joulien",
        email: "joulien@gmail.com",
        body: "What is the nice post?"
      },
      {
        postId: postId,
        id: 8,
        name: "Alex",
        email: "alex@gmail.com",
        body: "lorem ipsum dolor sit amet. lorem ipsum"
      }
    ];

    return of(comments).pipe(delay(1500));
  }

  addComment(postId: number, comment: Comment) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });

    return this.http.post<Comment>(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
      comment,
      { headers }
    );
  }
}
