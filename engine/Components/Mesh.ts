import { Component } from "../Component";
import { BoxGeometry, MeshBasicMaterial, Mesh as ThreeMesh, Geometry, Group, Object3D } from "three";

export class Mesh extends Component {

    private _geometry: Geometry;
    private _material: MeshBasicMaterial;
    private _mesh: ThreeMesh | Group;

    constructor() {
        super();
    }

    public initMesh(_geometry: Geometry, _material?: MeshBasicMaterial, _mesh?: ThreeMesh | Group): Mesh {
        if(_mesh) {
            this._mesh = _mesh;
            if(_material) {
                if(_mesh instanceof ThreeMesh) {
                    (this._mesh as ThreeMesh).material = _material;
                } else if (_mesh instanceof Group) {
                    this._mesh.children.forEach((child: ThreeMesh) => {
                        child.material = _material;
                    });
                }
            }
            return this;
        }
        this._geometry = _geometry || new BoxGeometry();
        this._material = _material || new MeshBasicMaterial( { color: 0xffffff } );
        this._mesh = new ThreeMesh( this._geometry, this._material );
        return this;
    }

    public getMesh(): ThreeMesh | Group {
        return this._mesh;
    }

    public onAwake(): void {

    }

    public onStep(): void {

    }

    public destroy(): void {

    }

    private init(): void {

    }
}
