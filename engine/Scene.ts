import { Engine } from "./Engine";
import { Container as PIXIContainer, DisplayObject, Filter } from "pixi.js";
import { GameObject } from "./GameObject";
import { HelperFunctions } from "./HelperFunctions";
import { EngineModes } from "./Types/EngineModes";
import { Scene as ThreeScene } from "three";
import { Container } from "./Container";

export class Scene {
    protected stage: Container;
    protected sceneObjects: unknown[];
    protected readonly mode: EngineModes;

    constructor(_mode: EngineModes) {
        this.mode = _mode;
    }

    public addObject(obj: DisplayObject | GameObject): void {
        if (!this.stage) this.createStage();
        try {
            HelperFunctions.addToStage(this.stage, obj);
            this.sceneObjects.push(obj);
        } catch (err) {
            console.error(err);
        }
    }

    public addFilter(fil: unknown): void {
        this.stage.filters = this.stage.filters || [];
        this.stage.filters.push(fil as Filter);
    }

    public removeAllObjects(): void {
        for (let i: number = this.sceneObjects.length; i >= 0; i--) {
            this.stage.removeChild(this.sceneObjects[i] as DisplayObject);
            this.sceneObjects.pop();
        }
    }

    /**
     * Called when adding the scene to the engine
     */
    public onApply(_engine: Engine): void {
        if (!this.stage) this.createStage();
        _engine.getStage().addChild(this.stage);
    }

    /**
     * Called when removing the scene from the engine
     */
    public onDestroy(_engine: Engine): void {
        this.removeAllObjects();
    }

    public onStep(_engine: Engine): void {
        for (const i of this.sceneObjects) {
            if (i && i instanceof GameObject) {
                (i as GameObject).onStep();
            }
        }
    }

    private createStage(): void {
        switch(this.mode) {
            case EngineModes.THREEJS:
                this.stage = new ThreeScene() as unknown as Container;
                break;
            case EngineModes.PIXI:
            default:
                this.stage = new PIXIContainer();
        }
        this.sceneObjects = [];
    }
}
