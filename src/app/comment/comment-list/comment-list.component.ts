import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { Comment } from '../comment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  public comment: Comment[] = [];
  public errorMessage: string;

  constructor(private commentService: CommentService) { }

  onSearch(comment) {
    this.comment = comment;
  }

  ngOnInit() {
    this.commentService.getAllComments().subscribe(
      comment => { this.comment = comment; },
      error => this.errorMessage = <any>error.message
    );
  }
}
