/// <reference types="react" />
import * as React from "react";
import { IPlugin } from "takcast.interface";
import { ISourcePlugin } from "takcast.interface";
import { ISource } from "takcast.interface";
/**
 * renderプロセス側で利用するプラグイン本体
 */
export declare class MediaFile implements ISourcePlugin {
    name: string;
    type: string;
    private target;
    private basePlugin;
    constructor();
    setPlugins(plugins: {
        [type: string]: Array<IPlugin>;
    }): void;
    refPickupComponent(): React.ComponentClass<{}>;
    _setTargetFile(file: File): void;
    createNewSource(): ISource;
}
export declare var _: MediaFile;
