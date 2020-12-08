// Yes, I know.
import { Application as PIXIApp } from "pixi.js";
import { Application, ApplicationInitSettings } from "../Application";
import { Ticker } from "../Ticker";
import { Renderer } from "../Renderer";

export class PIXIApplication extends Application {
    private application: PIXIApp;

    constructor(_config: ApplicationInitSettings) {
        super(_config);
        this.application = new PIXIApp(_config);
    }

    get height(): number {
        return this.application.view.height;
    }

    get width(): number {
        return this.application.view.width;
    }

    get ticker(): Ticker {
        return this.application.ticker as unknown as Ticker;
    }

    get view(): HTMLCanvasElement {
        return this.application.view;
    }

    get renderer(): Renderer {
        return this.application.renderer as unknown as Renderer;
    }

    get stage(): PIXI.Container {
        return this.application.stage;
    }
}
