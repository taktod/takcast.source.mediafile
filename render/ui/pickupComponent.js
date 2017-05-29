"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var Form = ReactBootstrap.Form;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
/**
 * 動作エレメントを選択するGUIを応答
 * @param mediaFile
 */
exports.pickupComponent = function (mediaFile) {
    // 設定データをとりあえずnullにしておく
    mediaFile._setTargetFile(null);
    return (function (_super) {
        __extends(PickupComponent, _super);
        function PickupComponent() {
            var _this = _super.call(this) || this;
            _this.state = { type: "none" }; // タイプの設定によってaudioタグを表示するか映像タグを表示するか決める
            _this.change = _this.change.bind(_this);
            return _this;
        }
        /**
         * ファイルを選択したときの処理
         * @param item
         */
        PickupComponent.prototype.change = function (item) {
            var file = item.target.files[0];
            // 既存のelementをとりあえずすべて停止する
            var audio = this.refs["audio"];
            var video = this.refs["video"];
            audio.pause();
            video.pause();
            // ファイル選択がどうなっているかで判定する
            if (!file) {
                this.setState({ type: "none" });
                item.target.value = null;
                return;
            }
            if (file.type.match(/^audio/)) {
                this.setState({ type: "audio" });
                audio.src = window.URL.createObjectURL(file);
            }
            else if (file.type.match(/^video/)) {
                this.setState({ type: "video" });
                video.src = window.URL.createObjectURL(file);
            }
            else {
                this.setState({ type: "none" });
                item.target.value = null;
                return;
            }
            // 選択したデータを保持しておく
            mediaFile._setTargetFile(file);
        };
        PickupComponent.prototype.render = function () {
            return (React.createElement(Form, { onChange: this.change },
                React.createElement(FormGroup, null,
                    React.createElement(FormControl, { type: "file" })),
                React.createElement("video", { ref: "video", hidden: this.state.type != "video", style: { width: 320, height: 240 }, controls: true }),
                React.createElement("audio", { ref: "audio", hidden: this.state.type != "audio", style: { width: 320 }, controls: true })));
        };
        return PickupComponent;
    }(React.Component));
};
