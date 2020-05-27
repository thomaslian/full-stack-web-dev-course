import { Component, OnInit, Inject } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Dish } from '../shared/Dish';
import { IonItemSliding, ToastController, LoadingController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  errMess: string;

  constructor(
    @Inject('BaseURL') private baseURL,
    private favoriteService: FavoriteService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
      this.favoriteService.getFavorites()
        .subscribe(favorites => this.favorites = favorites,
          errMess => this.errMess = errMess);

    console.log(this.favorites);
  }


  async deleteFavorite(item: IonItemSliding, id: number) {
    console.log('delete', id);

    const alert = await this.alertCtrl.create({
      header: 'Confirm Title',
      message: 'Do you want to delete Favorite ' + id,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled')
          }
        },
        {
          text: 'Delete',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Deleting . . .'
            });
            const toast = await this.toastCtrl.create({
              message: 'Dish ' + id + ' deleted successfully',
              duration: 3000
            });
            loading.present();
            this.favoriteService.deleteFavorite(id)
              .subscribe(favorites => { this.favorites = favorites; loading.dismiss(); toast.present(); },
                errMess => { this.errMess = errMess; loading.dismiss(); });
          }
        }
      ]
    })
    alert.present();
    item.close();
  }
}
