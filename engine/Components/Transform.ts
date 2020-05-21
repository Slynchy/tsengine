import { Component } from "../Component";
import { Sprite as PIXISprite } from "pixi.js";
import { Sprite } from "./Sprite";
import {Vec2} from "../Types/Vec2";

export class Transform extends Component {

  private position: Vec2;
  private spriteRef: PIXISprite;
  private divider: number;
  private rotation: number = 0;
  private anchor: Vec2 = {x: 0, y: 0};

  constructor(initialPos?: Vec2, divider?: number, _sprite?: PIXISprite | Sprite) {
    super();
    if (_sprite instanceof PIXISprite) {
      this.spriteRef = _sprite;
    } else if (_sprite instanceof Sprite) {
      this.spriteRef = _sprite.getSpriteObj();
    } else if(_sprite) {
      throw new Error(
          "Transform::Transform() - _sprite must be null, PIXI.Sprite, or Sprite component!"
      );
    }

    this.divider = divider || 16;

    if(initialPos) {
      this.position = initialPos;
      if(this.spriteRef) {
        this.spriteRef.x = initialPos.x * this.divider;
        this.spriteRef.y = initialPos.y * this.divider;
      }
    }
  }

  public setAnchor(_anchor: Vec2): void {
    this.anchor = _anchor;
    if(this.spriteRef) {
      this.spriteRef.anchor.x = this.anchor.x;
      this.spriteRef.anchor.y = this.anchor.y;
    }
  }

  public rotate(_amount: number): void {
    this.rotation += _amount;
    if(this.spriteRef) {
      this.spriteRef.rotation = this.rotation;
    }
  }

  private updateSpritePos(): void {
    if(this.spriteRef) {
      this.spriteRef.x = this.position.x * this.divider;
      this.spriteRef.y = this.position.y * this.divider;
    }
  }

  public get x(): number {
    return this.position.x;
  }

  public set x(val: number) {
    this.position.x = val;
    this.updateSpritePos();
  }

  public get y(): number {
    return this.position.y;
  }

  public set y(val: number) {
    this.position.y = val;
    this.updateSpritePos();
  }

  public getPosition(): Vec2 {
    return {
      x: this.position.x,
      y: this.position.y,
    };
  }

  public onAwake(): void {

  }

  public onStep(): void {
  }

  public destroy(): void {
    this.position = null;
    // fixme: should set sprite to null? no
  }
}
