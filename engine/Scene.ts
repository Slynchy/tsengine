import {Engine} from "./Engine";
import {Container, DisplayObject, Filter} from "pixi.js";
import {GameObject} from "./GameObject";
import {HelperFunctions} from "./HelperFunctions";

export class Scene {
  protected stage: Container;
  protected sceneObjects: unknown[];

  constructor() {}

  public addObject(obj: DisplayObject | GameObject): void {
    if(!this.stage) this.createStage();
    try {
      HelperFunctions.addToStage(this.stage, obj);
      this.sceneObjects.push(obj);
    } catch(err) {
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

  private createStage(): void {
    this.stage = new Container();
    this.sceneObjects = [];
  }

  /**
   * Called when adding the scene to the engine
   */
  public onApply(_engine: Engine): void {
    if(!this.stage) this.createStage();
    _engine.getStage().addChild(this.stage);
  }

  /**
   * Called when removing the scene from the engine
   */
  public onDestroy(_engine: Engine): void {
    this.removeAllObjects();
  }

  public onStep(_engine: Engine): void {
    for(const i of this.sceneObjects) {
      if(i && i instanceof GameObject) {
        (i as GameObject).onStep();
      }
    }
  }
}
