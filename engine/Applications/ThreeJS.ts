import { Application, ApplicationInitSettings } from "../Application";
import { Ticker } from "../Ticker";
import { Renderer } from "../Renderer";
import * as THREE from "three";
import { Container } from "../Container";

export class ThreeJSApplication extends Application {
    private readonly _ticker: Ticker;
    private readonly _renderer: THREE.WebGLRenderer;
    private readonly _stage: THREE.Scene;
    private readonly _camera: THREE.PerspectiveCamera;

    constructor(props: ApplicationInitSettings) {
        super(props);
        this._ticker = new Ticker();
        this._camera = new THREE.PerspectiveCamera(
            75,
            props.width / props.height,
            0.1,
            1000
        ); // todo: make ortho cam configurable
        this._stage = new THREE.Scene();
        this._renderer = new THREE.WebGLRenderer({});
        this._renderer.setSize(props.width, props.height);

        if(props.autoStart) {
            const tick: FrameRequestCallback = (_dt: number): void => {
                requestAnimationFrame(tick);
                this._ticker.tick(_dt);
            };
            requestAnimationFrame(tick);
        }
    }

    get camera(): THREE.PerspectiveCamera {
        return this._camera;
    }

    get height(): number {
        return 0;
    }

    get renderer(): Renderer {
        return ({
            width: this._renderer.domElement.width,
            height: this._renderer.domElement.height,
            render: this._renderer.render.bind(this._renderer)
        }) as unknown as Renderer;
    }

    get stage(): Container {
        return ({
            addChild: this._stage.add.bind(this._stage),
            removeChild: this._stage.remove.bind(this._stage),
            _stage: this._stage
        }) as unknown as Container;
    }

    get ticker(): Ticker {
        return this._ticker;
    }

    get view(): HTMLCanvasElement {
        return this._renderer.domElement;
    }

    get width(): number {
        return 0;
    }

}
