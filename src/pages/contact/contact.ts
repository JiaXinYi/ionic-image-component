import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public originPhotos: Array<any> = [];
  public targetPhotos: Array<any> = [];
  constructor(public navCtrl: NavController) {

  }
  public getNewPhotos(event) {
    this.targetPhotos = event;
  }

  public submit(){
    console.log(this.targetPhotos);

  }
}
