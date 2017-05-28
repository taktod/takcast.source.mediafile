import * as React from "react";

import {IBasePlugin} from "takcast.interface";
import {IPlugin} from "takcast.interface";
import {ISourcePlugin} from "takcast.interface";
import {ISource} from "takcast.interface";

import {Source} from "./source";
import {pickupComponent} from "./ui/pickupComponent";

export class MediaFile implements ISourcePlugin {
  public name = "mediaFile";
  public type = "source";

  private target:File;
  private basePlugin:IBasePlugin;

  constructor() {
    this.target = null;
  }
  public setPlugins(plugins:{[type:string]:Array<IPlugin>}):void {
    this.basePlugin = plugins["base"][0] as IBasePlugin;
  }
  public refPickupComponent():React.ComponentClass<{}> {
    return pickupComponent(this);
  }
  public _setTargetFile(file:File):void {
    this.target = file;
  }
  public createNewSource():ISource {
    if(this.target == null) {
      return null;
    }
    return new Source(this.basePlugin, this.target);
  }
}

export var _ = new MediaFile();