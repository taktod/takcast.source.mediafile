"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var source_1 = require("./source");
var pickupComponent_1 = require("./ui/pickupComponent");
/**
 * renderプロセス側で利用するプラグイン本体
 */
var MediaFile = (function () {
    function MediaFile() {
        this.name = "mediaFile";
        this.type = "source";
        this.target = null;
    }
    MediaFile.prototype.setPlugins = function (plugins) {
        // シングルトン参照で必要なbasePluginを保持
        this.basePlugin = plugins["base"][0];
    };
    MediaFile.prototype.refPickupComponent = function () {
        return pickupComponent_1.pickupComponent(this);
    };
    MediaFile.prototype._setTargetFile = function (file) {
        // pickup画面で設定している取り扱う予定のファイルを保持しておく
        this.target = file;
    };
    MediaFile.prototype.createNewSource = function () {
        if (this.target == null) {
            // 保持データがない場合は新規作成しない
            return null;
        }
        return new source_1.Source(this.basePlugin, this.target);
    };
    return MediaFile;
}());
exports.MediaFile = MediaFile;
exports._ = new MediaFile();
