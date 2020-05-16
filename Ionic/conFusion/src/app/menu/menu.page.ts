import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DishService } from '../services/dish.service';
import { DishdetailPage } from '../dishdetail/dishdetail.page'
import { ModalController } from '@ionic/angular';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  dishes: Dish[];
  errMess: string;

  constructor(
    private dishService: DishService,
    private favoriteService: FavoriteService,
    private modalController: ModalController,
    @Inject('BaseURL') private BaseURL
  ) { }

  ngOnInit() {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess = <any>errmess);
  }

  async presentModal(dish: Dish) {
    const modal = await this.modalController.create({
      component: DishdetailPage,
      componentProps: {
        'dish': dish
      }
    });
    return await modal.present();
  }

  addToFavorites(dish: Dish){
    console.log('Adding to favorites', dish.id);
    this.favoriteService.addFavorite(dish.id);
  }

}
