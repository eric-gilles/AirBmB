import { Component, Input } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { CommonModule } from '@angular/common';
import { Comment } from '../Comment';
@Component({
  selector: 'app-review-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-box.component.html',
  styleUrl: './review-box.component.css',
})
export class ReviewBoxComponent {
  @Input() idProperty: number | undefined;
  comments: Comment[] = [];
  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.getComments();
  }
  getStarsArray(note: number): number[] {
    return Array.from({ length: note }, (_, i) => i);
  }

  getComments(): void {
    if (!this.idProperty) return;
    this.commentService.getComentsByProperty(this.idProperty).subscribe({
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
        }
        this.comments = response.comments;
        console.log(typeof this.comments[0].createdAt);
        console.log(this.comments);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
