import { LightCameraProvider } from './../../providers/light-camera/light-camera';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the LightImagePickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'light-image-picker',
  templateUrl: 'light-image-picker.html'
})
export class LightImagePickerComponent {

  @Input('originPhotos') originPhotos: Array<any>;
  @Output('isAddPhoto') isAddPhoto: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
  @Output('isShowFullImg') isShowFullImg: EventEmitter<any> = new EventEmitter<any>();


  ///添加图片的列表
  public addImageList: Array<any> = [];
  ///自动时间关闭
  public autoTimeClose: number = 2500;

  constructor(
    public alertCtrl: AlertController,
    public lightCamera: LightCameraProvider
  ) {
  }
  /**
   * 添加图片
   * 
   * @memberof SPointAddModalPage
   */
  public addPictureClick(): void {
    //获取图片的信息
    this.lightCamera.getPicture().then(result => {
      this.addImageList.push({ Path: result });
      this.isAddPhoto.emit(this.addImageList);
    }).catch(errText => {
      this.message("拍照失败" + errText);
      //alert("失败"+LightJsonUtil.toJson(errText));
    });
  }

  /**
   * 移除图片的点击事件
   * 
   */
  public removeAddPictureClick(pictureObject: any): void {
    if (!!pictureObject) {
      this.confirm("是否要删除").then(result => {
        this.remove(this.addImageList, pictureObject);
        this.isAddPhoto.emit(this.addImageList);
      }).catch(errText => {

      });
    }
  }

  public showImg(pictureObject: any): void {
    if (!!pictureObject) {
      this.isShowFullImg.emit(pictureObject);
    }
  }


  //////////////////////////////////////////////
  /**
 * 移除对应的信息
 * 
 * @static
 * @param {Array<any>} 数组 
 * @param {*} 值信息
 * @returns {boolean} 
 * 
 * @memberof LightArrayUtil
 */
  public remove(array: Array<any>, value: any): boolean {
    var result: boolean = false;
    var index: number = this.getIndexOf(array, value);
    if (index >= 0) {
      array.splice(index, 1);
      result = true;
    }
    return result;
  }
  /**
  * 获取索引的值信息
  * @static
  * @param {Array<any>} array 
  * @param {*} value 
  * @returns {number} 
  * 
  * @memberof LightArrayUtil
  */
  public getIndexOf(array: Array<any>, value: any): number {
    var result: number = -1;
    if (!this.isEmpty(array)) {
      for (var i: number = 0; i < array.length; i++) {
        if (array[i] == value) {
          result = i;
          break;
        }
      }
    }
    return result;
  }
  /**
   * 判断是否为空
   * @static
   * @param {Array<any>} 数组信息 
   * @returns {boolean} 
   * @memberof LightArrayUtil
   */
  public isEmpty(array: Array<any>): boolean {
    var result: boolean = false;
    if (!!!array || array.length == 0) {
      result = true;
    }
    return result;
  }


  /**
   * 弹出消息的对象
   * @param {string} 消息 
   * @param {string} 标题 
   * 
   * @memberof LightPop
   */
  message(message: string, title?: string, autoClose: boolean = true): void {
    title = this._checkTitle(title);
    var alert = this.alertCtrl.create({ title: title, subTitle: message, buttons: ['关闭'] });
    alert.present();
    if (autoClose) {
      setTimeout(function () {
        alert.dismiss();
      }, this.autoTimeClose);
    }
  }

  /**
   * 错误消息提示
   * @param {string} message 
   * @param {string} [title] 
   * @memberof LightPop
   */
  errMessage(message: string, title?: string): void {
    this.message(message, title, false);
  }

  /**
   * 确认消息的对象
   * 
   * @param {string} 消息 
   * @param {string} 标题 
   * 
   * @memberof LightPop
   */
  confirm(message: string, title?: string): Promise<any> {
    title = this._checkTitle(title);
    var that = this;
    var result: Promise<any> = new Promise(function (resolve, reject) {
      var alert = that.alertCtrl.create({
        title: title, subTitle: message, buttons: [
          {
            text: '确定',
            handler: () => {
              resolve();
              return true;
            }
          },
          {
            text: '关闭',
            handler: () => {
              reject();
              return true;
            }
          }
        ]
      });
      alert.present();
    });
    return result;
  }
  /**
 * 
 * 过滤相关的标题信息
 * @private
 * @param {string} title 
 * @returns {string} 
 * 
 * @memberof LightPop
 */
  private _checkTitle(title: string): string {
    var result: string = title;
    if (!!!title) {
      title = "提示信息";
    }
    return result;
  }
}
