import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];
  constructor(private postService: PostService) {
  }

  createPost(input: HTMLInputElement) {
    const post = {title: input.value};
    this.posts.splice(0, 0, post);
    input.value = '';

    this.postService.create(post)
      .subscribe(
        newPost => {
          post['id'] = newPost['id'];
        },
        (error: AppError) => {
          this.posts.splice(0, 1);
          if (error instanceof BadInput) {
            // this.form.setErrors(error.originalError);
          } else { throw error; }
        });
  }

  updatePost(post) {
    // this.http.put(this.url, JSON.stringify(post))
    this.postService.update(post)
      .subscribe(updatedPost => {
          console.log(updatedPost);
      });
  }

  deletePost(post) {
    const index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.postService.delete(post.id)
      .subscribe(
        null,
        (error: AppError) => {
          this.posts.splice(index, 0, post);
          if (error instanceof NotFoundError) {
            alert('this post has already been deleted');
          } else {
            throw error;
          }
      });
  }


  ngOnInit() {
    this.postService.getAll()
      .subscribe(posts => {
      this.posts = JSON.parse(JSON.stringify(posts));
      console.log(this.posts);
    }, error => {
      alert('unexpected error occured!!!');
      console.log(error);
    });
  }
}

