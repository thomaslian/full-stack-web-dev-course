import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { EmailComposer } from "@ionic-native/email-composer/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { Camera } from "@ionic-native/camera/ngx";
import { Network } from "@ionic-native/network/ngx";
import { CallNumber } from '@ionic-native/call-number/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { DishService } from "./services/dish.service";
import { LeaderService } from "./services/leader.service";
import { PromotionService } from "./services/promotion.service";
import { ProcessHttpmsgService } from "./services/process-httpmsg.service";

import { baseURL } from './shared/baseurl';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DishService,
    LocalNotifications,
    LeaderService,
    PromotionService,
    ProcessHttpmsgService,
    EmailComposer,
    Camera,
    SocialSharing,
    Network,
    CallNumber,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: 'BaseURL', useValue: baseURL }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
