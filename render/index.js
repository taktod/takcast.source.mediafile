"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var source_1 = require("./source");
var pickupComponent_1 = require("./ui/pickupComponent");
var MediaFile = (function () {
    function MediaFile() {
        this.name = "mediaFile";
        this.type = "source";
        this.target = null;
    }
    MediaFile.prototype.setPlugins = function (plugins) {
        this.basePlugin = plugins["base"][0];
    };
    MediaFile.prototype.refPickupComponent = function () {
        return pickupComponent_1.pickupComponent(this);
    };
    MediaFile.prototype._setTargetFile = function (file) {
        this.target = file;
    };
    MediaFile.prototype.createNewSource = function () {
        if (this.target == null) {
            return null;
        }
        return new source_1.Source(this.basePlugin, this.target);
    };
    return MediaFile;
}());
exports.MediaFile = MediaFile;
exports._ = new MediaFile();
