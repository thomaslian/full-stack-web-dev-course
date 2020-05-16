import { Component, OnInit, Inject } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Dish } from '../shared/Dish';
import { IonItemSliding } from '@ionic/angular';

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
    private favoriteService: FavoriteService
  ) { }

  ngOnInit() {
    this.favoriteService.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        errMess => this.errMess = errMess)
  }

  deleteFavorite(item: IonItemSliding, id: number) {
    console.log('delete', id);
    this.favoriteService.deleteFavorite(id)
      .subscribe(favorites => this.favorites = favorites,
        errMess => this.errMess = errMess);
    item.close();
  }

}
