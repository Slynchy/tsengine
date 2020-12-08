import { GameObject } from "./GameObject";
import { Container as PIXIContainer, DisplayObject, Sprite as PIXISprite } from "pixi.js";
import { Sprite } from "./Components/Sprite";
import { ContainerComponent } from "./Components/ContainerComponent";
import { InteractionEvent } from "./Types/InteractionEvent";
import { Container } from "./Container";
import { Mesh } from "./Components/Mesh";
import { DBGLines3D } from "./Debug/DBGLines3D";

const DEBUG_MODE: boolean = false;

export interface TooltipProperties {
    x: number;
    y: number;
    width: number;
    height: number;
    title: string;
    body: string;
    dontAddToUI?: boolean;
}

export class HelperFunctions {
    constructor() {
        throw new Error("HelperFunctions class is intended to be static; no instances!");
    }

    public static removeFromStage(stage: Container, obj: DisplayObject | GameObject, unsafe?: boolean): void {
        if (unsafe || HelperFunctions.isDisplayObject(obj)) {
            stage.removeChild(obj as DisplayObject);
        } else if (HelperFunctions.isGameObject(obj)) {
            if ((obj as GameObject).hasComponent(Sprite)) {
                const sprite: PIXISprite = ((obj as GameObject).getComponent(Sprite) as Sprite).getSpriteObj();
                if (sprite) stage.removeChild(sprite);
            } else if ((obj as GameObject).hasComponent(ContainerComponent)) {
                const container: PIXIContainer
                    = ((obj as GameObject).getComponent(ContainerComponent) as ContainerComponent).getContainer();
                if (container) stage.removeChild(container);
            } else if ((obj as GameObject).hasComponent(Mesh)) {
                // @ts-ignore
                (stage.removeChild || stage.remove)((obj as GameObject).getComponent(Mesh).getMesh());
            } else {
                throw new Error("GameObject must have Sprite or Container component to be added to scene!");
            }
        } else if (!unsafe) {
            throw new Error("Invalid object attempted to add to scene");
        }
    }

    public static addToStage(stage: Container, obj: DisplayObject | GameObject, unsafe?: boolean): void {
        if (unsafe || HelperFunctions.isDisplayObject(obj)) {
            stage.addChild(obj as DisplayObject);
        } else if (HelperFunctions.isGameObject(obj)) {
            if ((obj as GameObject).hasComponent(Sprite)) {
                const sprite: PIXISprite = ((obj as GameObject).getComponent(Sprite) as Sprite).getSpriteObj();
                if (sprite) stage.addChild(sprite);
            } else if ((obj as GameObject).hasComponent(ContainerComponent)) {
                const container: PIXIContainer
                    = ((obj as GameObject).getComponent(ContainerComponent) as ContainerComponent).getContainer();
                if (container) stage.addChild(container);
            } else if ((obj as GameObject).hasComponent(Mesh)) {
                // @ts-ignore
                (stage.addChild || stage.add).apply(stage, [((obj as GameObject).getComponent(Mesh).getMesh())]);
            } else if ((obj as GameObject).hasComponent(DBGLines3D)) {
                // @ts-ignore
                (stage.addChild || stage.add).apply(stage, [((obj as GameObject).getComponent(DBGLines3D).getLine())]);
            } else {
                throw new Error("GameObject must have Sprite or Container component to be added to scene!");
            }
        } else if (!unsafe) {
            throw new Error("Invalid object attempted to add to scene");
        }
    }

    public static lerp(v0: number, v1: number, t: number): number {
        return v0 * (1 - t) + v1 * t;
    }

    public static createInteractionEvent<T>(self: object, propKey: string): InteractionEvent<T> {
        return {
            add: (prop: T): string => {
                const key: string = Math.random().toString().slice(2);
                // @ts-ignore
                self[propKey][key] = (prop);
                return key;
            },
            remove: (prop: T | string): void => {
                if (typeof prop === "string") {
                    // @ts-ignore
                    if (self[propKey][prop]) {
                        // @ts-ignore
                        delete self[propKey][prop];
                        return;
                    }
                } else {
                    // @ts-ignore
                    for (const f in self[propKey]) {
                        // @ts-ignore
                        if (self[propKey].hasOwnProperty(f)) {
                            // @ts-ignore
                            if (self[propKey][f] === prop) {
                                // @ts-ignore
                                delete self[propKey][f];
                                return;
                            }
                        }
                    }
                }
                throw new Error(`Failed to find ${propKey} event to remove`);
            }
        };
    }

    public static isGameObject(obj: unknown): boolean {
        return (obj instanceof GameObject);
    }

    public static isDisplayObject(obj: unknown): boolean {
        return (obj instanceof DisplayObject);
    }
}
