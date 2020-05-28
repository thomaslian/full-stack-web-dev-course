import { Component, OnInit } from '@angular/core';

import { Platform, ModalController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ReservationPage } from './reservation/reservation.page';
import { LoginPage } from './login/login.page';
import { Network } from "@ionic-native/network/ngx";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  loading: any = null;


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
    private modalController: ModalController,
    private loadingController: LoadingController,
    private network: Network
  ) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.network.onDisconnect()
        .subscribe(() => {
          if (!this.loading) {
            this.loading = this.loadingController.create({
              message: 'Network Disconnected'
            });
            this.loading.present();
          }
        });

      this.network.onConnect()
        .subscribe(() => {
          setTimeout(() => {
            if (this.network.type === 'wifi')
              console.log('We got a wifi connection, woohoo!');
          }, 3000);
          if(this.loading) {
            this.loading.dismiss();
            this.loading = null;
          }
        })
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
