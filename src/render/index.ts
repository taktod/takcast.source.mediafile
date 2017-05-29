import * as React from "react";

import {IBasePlugin} from "takcast.interface";
import {IPlugin} from "takcast.interface";
import {ISourcePlugin} from "takcast.interface";
import {ISource} from "takcast.interface";

import {Source} from "./source";
import {pickupComponent} from "./ui/pickupComponent";

/**
 * renderプロセス側で利用するプラグイン本体
 */
export class MediaFile implements ISourcePlugin {
  public name = "mediaFile";
  public type = "source";

  private target:File;
  private basePlugin:IBasePlugin;
  constructor() {
    this.target = null;
  }
  public setPlugins(plugins:{[type:string]:Array<IPlugin>}):void {
    // シングルトン参照で必要なbasePluginを保持
    this.basePlugin = plugins["base"][0] as IBasePlugin;
  }
  public refPickupComponent():React.ComponentClass<{}> {
    return pickupComponent(this);
  }
  public _setTargetFile(file:File):void {
    // pickup画面で設定している取り扱う予定のファイルを保持しておく
    this.target = file;
  }
  public createNewSource():ISource {
    if(this.target == null) {
      // 保持データがない場合は新規作成しない
      return null;
    }
    return new Source(this.basePlugin, this.target);
  }
}

export var _ = new MediaFile();