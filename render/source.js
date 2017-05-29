"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 描画に利用するデータ
 */
var Source = (function () {
    function Source(basePlugin, file) {
        this.name = file.name;
        this.info = {};
        if (file.type.match(/^audio/)) {
            this.type = "audio";
            this.media = document.createElement("audio");
            this.video = null;
        }
        else if (file.type.match(/^video/)) {
            this.type = ["audio", "video"];
            this.media = document.createElement("video");
            this.video = this.media;
        }
        else {
            throw new Error("invalid mediaFile type.");
        }
        this.media.src = window.URL.createObjectURL(file);
        this.media.style["width"] = "100%";
        this.media.controls = true;
        this.node = basePlugin.refAudioContext().createMediaElementSource(this.media);
        this.gainNode = basePlugin.refAudioContext().createGain();
        this.gainNode.gain.value = 1.0;
        this.node.connect(this.gainNode);
        this.gainNode.connect(basePlugin.refDevnullNode());
    }
    Source.prototype.release = function () {
        var _this = this;
        Object.keys(this.info).forEach(function (key) {
            var info = _this.info[key];
            info.plugin.onRemoveSource(_this);
        });
        this.media.pause();
        this.node.disconnect();
        this.gainNode.disconnect();
        this.video = null;
        this.media = null;
        this.node = null;
        this.gainNode = null;
    };
    Source.prototype.refInfo = function (mediaPlugin) {
        if (typeof (this.info[mediaPlugin.name]) == "undefined") {
            this.info[mediaPlugin.name] = {
                plugin: mediaPlugin,
                data: {}
            };
        }
        return this.info[mediaPlugin.name];
    };
    Source.prototype.refAudioNode = function () {
        return this.gainNode;
    };
    Source.prototype.refVideoImage = function () {
        return this.video;
    };
    Source.prototype.refDisplayElement = function () {
        return this.media;
    };
    Source.prototype.setVolume = function (value) {
        this.gainNode.gain.value = value / 100;
    };
    Source.prototype.getVolume = function () {
        return this.gainNode.gain.value * 100;
    };
    return Source;
}());
exports.Source = Source;
