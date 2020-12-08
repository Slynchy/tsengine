import { BufferGeometry, Line, LineBasicMaterial, Vector3 } from "three";
import { Component } from "tsengine";

export class DBGLines3D extends Component {
    private _line: Line;
    private _geometry: BufferGeometry;
    private _material: LineBasicMaterial;

    constructor() {
        super();
    }

    public init(_points: Vector3[]): DBGLines3D {
        this._geometry = new BufferGeometry().setFromPoints(_points);
        this._line = new Line(this._geometry, new LineBasicMaterial({color: 0x0000ff}));
        return this;
    }

    public getLine(): Line {
        return this._line;
    }

    public destroy(): void {
    }

    public onAwake(): void {
    }

    public onStep(): void {
    }
}
