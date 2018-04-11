import { Component } from '@angular/core';

/**
 * Generated class for the LightImageViewerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'light-image-viewer',
  templateUrl: 'light-image-viewer.html'
})
export class LightImageViewerComponent {

  text: string;

  constructor() {
    console.log('Hello LightImageViewerComponent Component');
    this.text = 'Hello World';
  }

}
