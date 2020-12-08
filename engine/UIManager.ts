import { Engine } from "./Engine";
import { GameObject } from "./GameObject";
import { HelperFunctions } from "./HelperFunctions";
import { Container as PIXIContainer, DisplayObject, Renderer } from "pixi.js";

export class UIManager {

    public readonly width: number;
    public readonly height: number;
    private canvasElement: HTMLCanvasElement;
    private renderer: Renderer;
    private stage: PIXIContainer;
    private engine: Engine;
    private changeDetected: boolean = false;
    private sceneObjects: unknown[] = [];

    constructor(_engine: Engine) {
        this.engine = _engine;
        this.engine.getTicker().add(() => this.onStep());
        this.canvasElement = document.createElement("canvas") as HTMLCanvasElement;
        this.canvasElement.id = "ui-canvas";
        this.renderer = new Renderer({
            view: this.canvasElement,
            transparent: true,
            width: this.width = this.engine.getRenderer().width,
            height: this.height = this.engine.getRenderer().height,
        });
        this.renderer.view.style.width = _engine.getRenderer().width.toString() + "px";
        this.renderer.view.style.height = _engine.getRenderer().height.toString() + "px";
        this.stage = new PIXIContainer();

        // @ts-ignore
        window._FORCE_UI_UPDATE = (): void => this.forceUpdate();

        // @ts-ignore
        window._UI_MANAGER = this;
    }

    public removeObject(obj: DisplayObject | GameObject): void {
        const index: number = this.sceneObjects.indexOf(obj);
        if (index === -1) {
            throw new Error("Failed to find object!");
        } else {
            HelperFunctions.removeFromStage(this.stage, obj);
            this.sceneObjects.splice(index, 1);
            this.changeDetected = true;
        }
    }

    public init(): void {
        // create new canvas element over top of existing one
        // create new renderer and bind to the above canvas element
        // ?
        // profit?
        document.body.appendChild(this.canvasElement);
    }

    public addObject(obj: DisplayObject | GameObject): void {
        try {
            HelperFunctions.addToStage(this.stage, obj);
            this.sceneObjects.push(obj);
            this.changeDetected = true;
        } catch (err) {
            console.error(err);
        }
    }

    public clear(): void {
        this.sceneObjects.length = 0;
        this.stage.children.length = 0;
        this.changeDetected = true;
        this.onStep();
    }

    public forceUpdate(): void {
        this.changeDetected = true;
    }

    public onStep(): void {
        for (let i: number = this.sceneObjects.length - 1; i >= 0; --i) {
            const child: unknown = this.sceneObjects[i];
            if (child instanceof GameObject && (child as GameObject).isQueuedForDestruction()) {
                this.sceneObjects = this.sceneObjects.splice(i, 1);
                this.changeDetected = true;
            }
        }
        // nyet
        if (this.changeDetected) {
            this._update();
        }
    }

    private _update(): void {
        this.renderer.render(this.stage);
        this.changeDetected = false;
    }
}
