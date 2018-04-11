import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

/*
  Generated class for the LightCameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LightCameraProvider {

/**
     * 参数对象
     * @type {CameraOptions}
     * @memberof LightCamera
     */
    private _options: CameraOptions;

    /**
     * 加载nation插件命令: npm install --save @ionic-native/camera
     * 加载ionic插件:ionic cordova plugin add cordova-plugin-camera
     * @param {Camera} camera 
     * @memberof LightCamera
     */
    constructor(public camera: Camera) {
        // super();
        this._options = {
            quality: 100,//图片质量
            destinationType: this.camera.DestinationType.FILE_URI,////相机输出值的格式，DATA_URL：返回base64编码的字符串,太大，易崩溃，FILE_URI：安卓文件URI，NATIVE_URI：ios
            sourceType: this.camera.PictureSourceType.CAMERA,//设置图片的来源
            ///allowEdit: true,//是否允许编辑
            encodingType: this.camera.EncodingType.JPEG,//选择返回的图像文件的编码
            mediaType: this.camera.MediaType.PICTURE,//选择媒体类型，根据sourceType确定,this.camera.MediaType.ALLMEDIA
            saveToPhotoAlbum: true//是否在拍照后保存到相册 };
        };
    }

    /**
     * 得到图片的对象信息
     * 
     * @param {*} [resultDefault=null] 
     * @returns {Promise<any>} 
     * @memberof LightCamera
     */
    getPicture(resultDefault: any = null): Promise<any> {
        var that = this;
        if (!!!resultDefault) {
            resultDefault = "https://www.baidu.com/img/bd_logo1.png";
        }
        var result: Promise<any> = this._getDefaultResult(resultDefault);
        if (!this._isWeb()) {
            if (!!that.camera) {
                result = new Promise(function (resolve, reject) {
                    that.camera.getPicture(that._options).then(imageURI => {
                        resolve(imageURI);
                    }).catch(errText => {
                        reject(errText);
                    });
                });
            }
            else {
                alert("扫描插件未安装");
            }
        }
        return result;
    }
    
    /**
     * 平台的对象信息
     * @param {LightPlatform} platform 
     * @memberof LightNation
     */

    protected _isWeb(): boolean {
        var result=false;
        var ua = window.navigator.userAgent.toLowerCase();
        //alert(ua);
        //if(LightStringUtil.contain(ua,"windows")||LightStringUtil.contain(ua,"mobile safari")){
        if(this.contain(ua,"windows")||this.contain(ua,"sm-g900p")||this.contain(ua,"nexus 5 ")){
            result=true;
        }
        return result;
        //return this.platform.isMobileWeb();
    }

    /**
     * 得到默认的结果信息
     * 
     * @param {Promise<any>} targetResult 
     * @param {*} defaultResult 
     * @returns {Promise<any>} 
     * @memberof LightNation
     */
    protected _getDefaultResult(defaultResult: any): Promise<any> {
        var result: Promise<any> = new Promise(function (resolve, reject) {
            resolve(defaultResult);
        });
        return result;
    }
        /**
       * 
       * 包含的相关信息
       * @static
       * @param {string} 源字符串信息
       * @param {string} 目标信息 
       * @returns {boolean} 
       * 
       * @memberof LightStringUtil
       */
      public contain(sourceString: string, targetString: string): boolean {
        var result: boolean = false;
        if (!!sourceString && !!targetString) {
            var index: number = sourceString.indexOf(targetString);
            if (index >= 0) {
                result = true;
            }
        }
        return result;
    }
}
