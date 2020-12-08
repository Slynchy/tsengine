import { Vec2 } from "./Vec2";
import { MouseOverState } from "./MouseOverState";

export interface MouseOverObject {
    pos: Vec2;
    dimensions: Vec2;
    onclick?: (ev: MouseEvent) => void;
    onmouseenter?: (ev: MouseEvent) => void;
    onmouseexit?: (ev: MouseEvent) => void;
    onmousemove?: (ev: MouseEvent) => void;
    _currState?: MouseOverState;
}
