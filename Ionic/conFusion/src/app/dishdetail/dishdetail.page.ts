import { Component, OnInit, Inject } from '@angular/core';
import { Comment } from '../shared/Comment';
import { ModalController } from '@ionic/angular';
import { Dish } from '../shared/Dish';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.page.html',
  styleUrls: ['./dishdetail.page.scss'],
})
export class DishdetailPage implements OnInit {

  dish: Dish;
  errMess: string;
  avgStars: string;
  numComments: number;



  constructor(
    private modalController: ModalController,
    @Inject('BaseURL') private BaseURL
  ) { }

  ngOnInit() {
    this.numComments = this.dish.comments.length;

    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating);
    this.avgStars = (total / this.numComments).toFixed(2);

  }

  dismissModal() {
    this.modalController.dismiss();
  }



}


