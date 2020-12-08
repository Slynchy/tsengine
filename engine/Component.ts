import { GameObject } from "./GameObject";

export abstract class Component {

    protected parent: GameObject;

    public setParent(_parent: GameObject): void {
        this.parent = _parent;
    }

    /**
     * Called after `this.parent` is populated
     */
    public abstract onAwake(): void;

    public abstract destroy(): void;

    public abstract onStep(): void;
}
