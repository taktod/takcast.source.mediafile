import { IBasePlugin } from "takcast.interface";
import { ISource } from "takcast.interface";
import { IMediaPlugin } from "takcast.interface";
import { ISourceInfo } from "takcast.interface";
/**
 * 描画に利用するデータ
 */
export declare class Source implements ISource {
    name: string;
    type: string | string[];
    private info;
    private media;
    private video;
    private node;
    private gainNode;
    constructor(basePlugin: IBasePlugin, file: File);
    release(): void;
    refInfo(mediaPlugin: IMediaPlugin): ISourceInfo;
    refAudioNode(): AudioNode;
    refVideoImage(): HTMLVideoElement;
    refDisplayElement(): HTMLMediaElement;
    setVolume(value: number): void;
    getVolume(): number;
}
