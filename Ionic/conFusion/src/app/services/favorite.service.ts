import { Injectable } from '@angular/core';
import { DishService } from './dish.service';
import { Observable, empty } from 'rxjs';
import { Dish } from '../shared/Dish';
import { map, delay } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: Array<any>;

  constructor(
    private storage: Storage,
    private dishService: DishService

  ) {
    // Wait for the storage to become ready
    this.storage.ready().then(() => {
      // Get favorites id from storage
      this.storage.get('favorites').then(favorites => {
        this.favorites = favorites;
      });
    });
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id)) {
      this.favorites.push(id);
      this.storage.set('favorites', this.favorites);
    }
    return true;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishService.getDishes()
      .pipe(map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id))));
  }


  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      this.storage.set('favorites', this.favorites);
      return this.getFavorites();
    } else {
      console.log('Deleteing non-existatnt favorite', id);
      return Observable.throw('Deleting non-existant favorite ' + id);
    }
  }
}
