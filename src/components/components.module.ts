import { NgModule } from '@angular/core';
import { LightImagePickerComponent } from './light-image-picker/light-image-picker';
import { IonicModule } from 'ionic-angular';
import { LightImageViewerComponent } from './light-image-viewer/light-image-viewer';

@NgModule({
	declarations: [LightImagePickerComponent,
    LightImageViewerComponent],
	imports: [IonicModule],
	exports: [LightImagePickerComponent,
    LightImageViewerComponent]
})
export class ComponentsModule {}
