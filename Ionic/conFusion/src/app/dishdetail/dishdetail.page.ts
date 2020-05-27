import { Component, OnInit, Inject } from '@angular/core';
import { Comment } from '../shared/Comment';
import { ModalController, ToastController, ActionSheetController } from '@ionic/angular';
import { Dish } from '../shared/Dish';
import { FavoriteService } from '../services/favorite.service';
import { CommentPage } from '../comment/comment.page';
import { Storage } from '@ionic/storage';
import { SocialSharing } from "@ionic-native/social-sharing/ngx";

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
  favorites: Array<any> = [];

  constructor(
    private modalController: ModalController,
    @Inject('BaseURL') private BaseURL,
    private favoriteService: FavoriteService,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing
  ) { }

  ngOnInit() {
    this.numComments = this.dish.comments.length;

    // Sets this favorite to true or false depending if it is a favorite or not 
    this.favorite = this.favoriteService.isFavorite(this.dish.id);

    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating);
    this.avgStars = (total / this.numComments).toFixed(2);

  }

  dismissModal() {
    this.modalController.dismiss();
  }

  addToFavorites() {
    // Store this dish id as the favorite
    if (!this.favoriteService.isFavorite(this.dish.id)) {
      this.favoriteService.addFavorite(this.dish.id);
      this.favorite = true;
      console.log('Dish ' + this.dish.id + " added as favorite")
      this.presentToast(this.dish.id);
    } else {
      console.log('Dish is already a favorite', this.dish.id);
    }

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
        text: "Share via Facebook",
        handler: () => {
          this.socialSharing.shareViaFacebook(
            this.dish.name + ' -- ' + this.dish.description,
            this.BaseURL + this.dish.image, 
            '')
          .then(() => console.log('Posted successfully to Facebook'))
          .catch(() => console.log('Failed to post to Facebook'));
        }
      },
      {
        text: "Share via Twitter",
        handler: () => {
          this.socialSharing.shareViaTwitter(
            this.dish.name + ' -- ' + this.dish.description,
            this.BaseURL + this.dish.image, 
            '')
          .then(() => console.log('Posted successfully to Twitter'))
          .catch(() => console.log('Failed to post to Twitter'));
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
        if (dataReturned.data.author !== null || dataReturned.data.author !== "") {
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


