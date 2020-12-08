import { Ticker } from "./Ticker";
import { Renderer } from "./Renderer";
import { Container } from "./Container";

export interface ApplicationInitSettings {
    autoStart?: boolean;
    width?: number;
    height?: number;
    view?: HTMLCanvasElement;
    transparent?: boolean;
    autoDensity?: boolean;
    antialias?: boolean;
    preserveDrawingBuffer?: boolean;
    resolution?: number;
    forceCanvas?: boolean;
    backgroundColor?: number;
    clearBeforeRender?: boolean;
    forceFXAA?: boolean;
    powerPreference?: string;
    sharedTicker?: boolean;
    sharedLoader?: boolean;
    resizeTo?: Window | HTMLElement;
}

export abstract class Application {
    protected constructor(_config: ApplicationInitSettings) {
        // todo: something
    }

    protected _width: number;

    abstract get width(): number;
    abstract set width(_width: number);

    abstract get height(): number;
    abstract set height(_width: number);

    abstract get ticker(): Ticker;
    abstract get view(): HTMLCanvasElement;

    abstract get renderer(): Renderer; // todo: replace with abstract renderer
    abstract get stage(): Container; // todo: replace with abstract container
}
