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
    input.value = '';
    this.postService.createPost(post)
      .subscribe(
        response => {
          post['id'] = response.id;
          this.posts.splice(0, 0, post)
        }, 
        (error: Response) => {
          if (error.status === 400) {
            // this.form.setErrors(error);
          }
          alert('unexpected error occured!!!')
          console.log(error);
        });
  }
      
  updatePost(post) {
      // this.http.put(this.url, JSON.stringify(post))
      this.postService.updatePost(post)
        .subscribe(response => {
            console.log(response);
        }, error => {
          alert('unexpected error occured!!!')
          console.log(error);
        })
  }
  
  deletePost(post) {
    // this.http.put(this.url, JSON.stringify(post))
    this.postService.deletePost(post.id)
      .subscribe(
        response => {
          const index = this.posts.indexOf(post)
          this.posts.splice(index, 1)
      }, 
        (error: Response) => {
          if (error.status === 404) {
            alert('this post has already been deleted.')
          } else {
            alert('unexpected error occured!!!')
            console.log(error);
          }
    })
  }
          

  ngOnInit() {
    this.postService.getPosts()
      .subscribe(response => {
      this.posts = JSON.parse(JSON.stringify(response));
      console.log(this.posts);
    }, error => {
      alert('unexpected error occured!!!')
      console.log(error);
    });
  }              
}
            