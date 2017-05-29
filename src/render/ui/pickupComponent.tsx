import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";

import {MediaFile} from "..";

var Form = ReactBootstrap.Form;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;

/**
 * 動作エレメントを選択するGUIを応答
 * @param mediaFile 
 */
export var pickupComponent = (mediaFile:MediaFile):any => {
  // 設定データをとりあえずnullにしておく
  mediaFile._setTargetFile(null);
  return class PickupComponent extends React.Component<{}, {}> {
    state = {type: "none"}; // タイプの設定によってaudioタグを表示するか映像タグを表示するか決める
    constructor() {
      super();
      this.change = this.change.bind(this);
    }
    /**
     * ファイルを選択したときの処理
     * @param item 
     */
    private change(item) {
      var file = item.target.files[0];
      // 既存のelementをとりあえずすべて停止する
      var audio = this.refs["audio"] as HTMLAudioElement;
      var video = this.refs["video"] as HTMLVideoElement;
      audio.pause();
      video.pause();
      // ファイル選択がどうなっているかで判定する
      if(!file) {
        this.setState({type: "none"});
        item.target.value = null;
        return;
      }
      if(file.type.match(/^audio/)) {
        this.setState({type: "audio"});
        audio.src = window.URL.createObjectURL(file);
      }
      else if(file.type.match(/^video/)) {
        this.setState({type: "video"});
        video.src = window.URL.createObjectURL(file);
      }
      else {
        this.setState({type: "none"});
        item.target.value = null;
        return;
      }
      // 選択したデータを保持しておく
      mediaFile._setTargetFile(file);
    }
    public render() {
      return(
        <Form onChange={this.change}>
          <FormGroup>
            <FormControl type="file" />
          </FormGroup>
          <video ref="video" hidden={this.state.type != "video"} style={{width:320, height:240}} controls></video>
          <audio ref="audio" hidden={this.state.type != "audio"} style={{width:320}} controls></audio>
        </Form>
      );
    }
  }
}