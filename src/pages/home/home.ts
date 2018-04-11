import { AboutPage } from './../about/about';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public originPhotos: Array<any> = [];
  public targetPhotos: Array<any> = [];
  public currentImg:any;
  constructor(
    public navCtrl: NavController,
    public modalCtrl:ModalController
  ) {

  }
  public getNewPhotos(event) {
    this.targetPhotos = event;
  }
  public showFullImg(event){
    this.currentImg = event;
    // console.log(this.currentImg);
    this.modalCtrl.create(AboutPage).present();
  }

  public submit(){
    console.log(this.targetPhotos);

  }
}
