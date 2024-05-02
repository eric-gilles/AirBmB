import { Component, Input } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { CommonModule } from '@angular/common';
import { Comment } from '../Comment';
import { FormsModule } from '@angular/forms';
import { response } from 'express';
import { error } from 'console';
@Component({
  selector: 'app-review-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-box.component.html',
  styleUrl: './review-box.component.css',
})
export class ReviewBoxComponent {
  @Input() idProperty: number | undefined;
  comments: Comment[] = [];
  commentSend: any = {
    comment: '',
    note: '',
  };
  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.getComments();
  }
  getStarsArray(note: number): number[] {
    return Array.from({ length: note }, (_, i) => i);
  }
  makeComment(): void {
    if (!this.idProperty) return;
    console.log(this.commentSend);
    if (this.commentSend.comment !== '') {
      this.commentService
        .makeComment(
          this.idProperty,
          this.commentSend.comment,
          parseInt(this.commentSend.note)
        )
        .subscribe({
          next: (response) => {
            this.getComments();
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  getComments(): void {
    if (!this.idProperty) return;
    this.commentService.getCommentsByProperty(this.idProperty).subscribe({
      next: (response) => {
        for (var comment of response.comments) {
          comment.createdAt = new Date(comment.createdAt);
          const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          };
          const formattedDate = comment.createdAt.toLocaleString(
            'fr-FR',
            options
          );
          comment.createdAt = formattedDate;
        }
        this.comments = response.comments.reverse();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
