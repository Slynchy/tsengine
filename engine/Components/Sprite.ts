import { Component } from "../Component";
import { Sprite as PIXISprite, Texture as PIXITexture, Filter as PIXIFilter } from "pixi.js";

/**
 * There is no Transform component; if an object needs a transform, it likely needs to
 * render as well anyway.
 */
export class Sprite extends Component {

    private _sprite: PIXISprite;

    constructor(_texture?: PIXITexture) {
        super();

        if (_texture) this.setTexture(_texture);
    }

    public get x(): number {
        return this._sprite.x;
    }

    public set x(_x: number) {
        this._sprite.x = _x;
    }

    public get y(): number {
        return this._sprite.y;
    }

    public set y(_y: number) {
        this._sprite.y = _y;
    }

    public get width(): number {
        return this._sprite.width;
    }

    public set width(_x: number) {
        this._sprite.width = _x;
    }

    public get height(): number {
        return this._sprite.height;
    }

    public set height(_y: number) {
        this._sprite.height = _y;
    }

    public addFilter(filter: PIXIFilter): void {
        if(!this._sprite.filters) this._sprite.filters = [];
        this._sprite.filters.push(filter);
    }

    public getSpriteObj(): PIXISprite | null {
        return this._sprite || null;
    }

    public setTexture(_texture: PIXITexture): void {
        if (this._sprite) {
            this._sprite.texture = _texture;
        } else {
            this.init(_texture);
        }
    }

    public onAwake(): void {

    }

    public onStep(): void {

    }

    public destroy(): void {
        this._sprite.destroy();
        this._sprite = null;
    }

    private init(_texture: PIXITexture): void {
        this._sprite = new PIXISprite(_texture);
    }
}
