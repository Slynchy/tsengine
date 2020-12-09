import "../config/main.css";
import { StateManager } from "./StateManager";
import { State } from "./State";
import { LoaderResource, Texture } from "pixi.js";
import { Camera as ThreeCamera } from "three";
import { InputManager } from "./InputManager";
import { UIManager } from "./UIManager";
import { EngineModes } from "./Types/EngineModes";
import { PIXIApplication } from "./Applications/PIXI";
import { PIXILoader } from "./Loaders/PIXILoader";
import { WASMLoader } from "./Loaders/WASMLoader";
import { Application } from "./Application";
import { Ticker } from "./Ticker";
import { Renderer } from "./Renderer";
import { Container } from "./Container";
import { ThreeJSApplication } from "./Applications/ThreeJS";

declare const window: Window & {
    ENGINE: Engine;
};

export class Engine {
    private readonly application: Application;
    private readonly stateManager: StateManager;
    private readonly loader: PIXILoader;
    private readonly wasmloader: WASMLoader;
    private readonly inputManager: InputManager;
    private readonly uiManager: UIManager;
    private dt: number = 1;
    public readonly mode: EngineModes;

    constructor(_config: object, _mode: EngineModes) {
        if (window.ENGINE) throw new Error("Only one Engine instance can be active at once!");
        switch (this.mode = _mode) {
            case EngineModes.THREEJS:
                this.application = new ThreeJSApplication(_config);
                break;
            case EngineModes.PIXI:
            default:
                this.application = new PIXIApplication(_config) as unknown as Application;
        }
        this.inputManager = new InputManager(this);
        this.stateManager = new StateManager(this);
        this.uiManager = new UIManager(this);
        this.loader = new PIXILoader();
        this.wasmloader = new WASMLoader();
        this.application.ticker.add((dt: number) => (this.deltaTime = dt));
        window.ENGINE = this;
    }

    public loadWASM(key: string, filepath: string | string[]): Promise<void> {
        if(filepath && Array.isArray(filepath)) {
            // todo handle multiple string input
        } else {
            this.wasmloader.add(key as string, filepath as string);
        }

        // todo: return an actual value
        return this.wasmloader.load();
    }

    // tslint:disable-next-line:no-any
    public getWASM(key: string): any | null {
        return this.wasmloader.get(key) || null;
    }

    public getCamera(): ThreeCamera {
        return (this.application as ThreeJSApplication).camera;
    }

    get deltaTime(): number {
        return this.dt;
    }

    set deltaTime(dt: number) {
        this.dt = dt;
    }

    public getInputManager(): InputManager {
        return this.inputManager;
    }

    public changeState(_newState: State, _params?: unknown): void {
        this.stateManager.setState(_newState, _params);
    }

    public getRenderer(): Renderer {
        return this.application.renderer;
    }

    /**
     * Forces a frame update
     */
    public forceRender(): void {
        // @ts-ignore
        this.application.renderer.render(this.application.stage);
    }

    public setMaxFPS(fps: number): void {
        // Not in v5 typedef?
        // @ts-ignore
        this.application.ticker.maxFPS = fps;
    }

    public setBackgroundColor(col: number): void {
        this.application.renderer.backgroundColor = col;
    }

    public getTicker(): Ticker {
        return this.application.ticker;
    }

    public getStage(): Container {
        return this.application.stage;
    }

    public getTexture(key: string): Texture {
        const tex: LoaderResource = this.loader.get(key);
        if (!tex) {
            console.warn("Failed to find texture: " + key);
        }
        return (tex ? tex.texture : null);
    }

    public getUIManager(): UIManager {
        return this.uiManager;
    }

    public init(_initialState: State, _bootAssets: Array<{ key: string, path: string }>): Promise<void> {
        this.application.view.id = "main-canvas";
        this.application.view.style.width = this.getRenderer().width.toString() + "px";
        this.application.view.style.height = this.getRenderer().height.toString() + "px";
        document.body.appendChild(this.application.view);
        this.hideFontPreload();
        this.uiManager.init();
        return new Promise<void>((resolve: Function, reject: Function): void => {
            for (const k in _bootAssets) {
                if (!_bootAssets.hasOwnProperty(k)) continue;
                if (_bootAssets[k]) {
                    this.loader.add(_bootAssets[k].key, `./assets/${_bootAssets[k].path}`);
                }
            }
            this.loader.load().then(() => {
                this.stateManager.setState(_initialState);
                resolve();
            });
        });
    }

    private hideFontPreload(): void {
        const collection: HTMLCollection =
            document.getElementsByClassName("fontPreload");

        // tslint:disable-next-line:prefer-for-of
        for (let i: number = collection.length - 1; i >= 0; i--) {
            collection[i].parentNode.removeChild(collection[i]);
        }
    }
}
