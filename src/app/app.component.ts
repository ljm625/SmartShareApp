import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ItemDetailsPage} from "../pages/item-details/item-details";

declare let require: any;
declare let window: any;
const Web3 = require('web3');

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = ItemDetailsPage;
  pages: Array<{title: string, component: any}>;
  web3 = undefined;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    // Web3 Related
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      this.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/mew"));
    }

  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component,{"contract":"0x345ca3e014aaf5dca488057592ee47305d9b3e10"});
    // this.web3.eth.getBalance("0xB270C422E3757463E58D1A1B423D91935Ef85dCc").then((result) =>{
    //   console.log(result);
    //   this.pages[0].title = result;
    //
    // });
    // console.log(this.web3.eth.getBalance("0xB270C422E3757463E58D1A1B423D91935Ef85dCc"));
  }
}
