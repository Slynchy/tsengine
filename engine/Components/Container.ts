import {Component} from "../Component";
import { Container as PIXIContainer, DisplayObject } from "pixi.js";
import {Sprite} from "./Sprite";
import {GameObject} from "../GameObject";
import {HelperFunctions} from "../HelperFunctions";

/**
 * There is no Transform component; if an object needs a transform, it likely needs to
 * render as well anyway.
 */
export class Container extends Component {

    private _container: PIXIContainer;

    constructor() {
        super();
        this._container = new PIXIContainer();
    }

    public addChild(_child: GameObject | DisplayObject): void {
        HelperFunctions.addToStage(this._container, _child);
    }

    public get alpha(): number {
        return this._container.alpha;
    }

    public set alpha(_alpha: number) {
        this._container.alpha = _alpha;
    }

    public getContainer(): PIXIContainer {
        return this._container;
    }

    public get x(): number {
        return this._container.x;
    }

    public set x(_x: number) {
        this._container.x = _x;
    }

    public get y(): number {
        return this._container.y;
    }

    public set y(_y: number) {
        this._container.y = _y;
    }

    public onAwake(): void {

    }

    public onStep(): void {

    }

    public destroy(): void {
        if(this._container.parent) {
            this._container.parent.removeChild(this._container);
        }
        this._container.destroy({children: true});
        this._container = null;
    }
}
