import { Component, OnInit, Inject } from '@angular/core';
import { Comment } from '../shared/Comment';
import { ModalController, ToastController, ActionSheetController } from '@ionic/angular';
import { Dish } from '../shared/Dish';
import { FavoriteService } from '../services/favorite.service';
import { CommentPage } from '../comment/comment.page';

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
  favorite: boolean = false;

  constructor(
    private modalController: ModalController,
    @Inject('BaseURL') private BaseURL,
    private favoriteService: FavoriteService,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    this.numComments = this.dish.comments.length;

    this.favorite = this.favoriteService.isFavorite(this.dish.id);

    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating);
    this.avgStars = (total / this.numComments).toFixed(2);

  }

  dismissModal() {
    this.modalController.dismiss();
  }

  addToFavorites() {
    console.log('Adding to favorites', this.dish.id);
    this.favorite = this.favoriteService.addFavorite(this.dish.id);
    this.presentToast(this.dish.id);
  }

  async presentToast(id: number) {
    const toast = await this.toastCtrl.create({
      message: 'Dish ' + id + ' added as a favorite successfully',
      duration: 3000
    });
    toast.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select actions',
      buttons: [{
        text: "Add to favorties",
        handler: () => {
          this.addToFavorites();
        }
      },
      {
        text: "Add Comment",
        handler: () => {
          this.presentReservationModal();
        }
      },
      {
        text: "Cancel",
        role: "cancel",
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    })
    actionSheet.present();
  }

  async presentReservationModal() {
    const modal = await this.modalController.create({
      component: CommentPage
    });
    modal.onDidDismiss()
      .then((dataReturned) => {
        if (dataReturned.data.author !== null ||  dataReturned.data.author !== "") {
          this.dish.comments.push(dataReturned.data);

          // Set number of comments
          this.numComments = this.dish.comments.length;

          // Calculate average starts again
          let total = 0;
          this.dish.comments.forEach(comment => total += comment.rating);
          this.avgStars = (total / this.numComments).toFixed(2);
        }
      });
    return await modal.present();
  }
}


