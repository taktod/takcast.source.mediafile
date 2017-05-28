import * as React from "react";

import {IBasePlugin} from "takcast.interface";
import {ISource} from "takcast.interface";
import {IMediaPlugin} from "takcast.interface";
import {ISourceInfo} from "takcast.interface";

export class Source implements ISource {
  public name:string;
  public type:string|string[];
  private info:{};
  private media:HTMLMediaElement;
  private video:HTMLVideoElement;

  private node:AudioNode;
  private gainNode:GainNode;

  constructor(basePlugin:IBasePlugin, file:File) {
    this.name = file.name;
    this.info = {};
    if(file.type.match(/^audio/)) {
      this.type = "audio";
      this.media = document.createElement("audio");
      this.video = null;
    }
    else if(file.type.match(/^video/)) {
      this.type = ["audio", "video"];
      this.media = document.createElement("video");
      this.video = this.media as HTMLVideoElement;
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
/*  public refPaletteComponent():React.ComponentClass<{className:string,onClick:any,href:string,active:boolean,name:string}> {
    return paletteComponent(this);
  }*/
  public release():void {
    Object.keys(this.info).forEach((key) => {
      var info = this.info[key] as ISourceInfo;
      info.plugin.onRemoveSource(this);
    });
    this.media.pause();
    this.node.disconnect();
    this.gainNode.disconnect();
    this.video = null;
    this.media = null;
    this.node = null;
    this.gainNode = null;
  }
  public refInfo(mediaPlugin:IMediaPlugin):ISourceInfo {
    if(typeof(this.info[mediaPlugin.name]) == "undefined") {
      this.info[mediaPlugin.name] = {
        plugin:mediaPlugin,
        data: {}
      };
    }
    return this.info[mediaPlugin.name] as ISourceInfo;
  }
  public refAudioNode():AudioNode {
    return this.gainNode;
  }
  public refVideoImage():HTMLVideoElement {
    return this.video;
  }
  public refDisplayElement():HTMLMediaElement {
    return this.media;
  }
  public setVolume(value:number):void {
    this.gainNode.gain.value = value / 100;
  }
  public getVolume():number {
    return this.gainNode.gain.value * 100;
  }
}
