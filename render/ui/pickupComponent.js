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
exports.pickupComponent = function (mediaFile) {
    mediaFile._setTargetFile(null);
    return (function (_super) {
        __extends(PickupComponent, _super);
        function PickupComponent() {
            var _this = _super.call(this) || this;
            _this.state = { type: "none" };
            _this.change = _this.change.bind(_this);
            return _this;
        }
        PickupComponent.prototype.change = function (item) {
            var file = item.target.files[0];
            var audio = this.refs["audio"];
            var video = this.refs["video"];
            audio.pause();
            video.pause();
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
