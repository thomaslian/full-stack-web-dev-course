import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

  commentForm: FormGroup;
  comment: Comment;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      author: ['', Validators.required],
      rating: 5,
      comment: ['', Validators.required]
    });
  }

  dismiss() {
    this.modalController.dismiss(this.comment);
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dismiss();
  }

}
