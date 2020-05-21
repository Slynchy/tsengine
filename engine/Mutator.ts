import {State} from "./State";

export abstract class Mutator {
  constructor() {}
  public abstract apply(_state: State): void;
}
