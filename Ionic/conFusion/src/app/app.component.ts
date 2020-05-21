import { Component, OnInit } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ReservationPage } from './reservation/reservation.page';
import { LoginPage } from './login/login.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public pages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'About us',
      url: '/about',
      icon: 'information-circle'
    },
    {
      title: 'Menu',
      url: '/menu',
      icon: 'fast-food'
    },
    {
      title: 'Contact us',
      url: '/contact',
      icon: 'mail'
    },
    {
      title: 'My Favorites',
      url: '/favorites',
      icon: 'heart'
    }
  ];

  public appPages = [
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalController: ModalController
  ) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase());
  }

  async presentReservationModal() {
    const modal = await this.modalController.create({
      component: ReservationPage
    });
    return await modal.present();
  }

  async presentLoginModal() {
    const modal = await this.modalController.create({
      component: LoginPage
    });
    return await modal.present();
  }
}
