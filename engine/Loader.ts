import { Loader as PIXILoader, LoaderResource } from "pixi.js";

export class Loader {

  // @ts-ignore
  private loader: PIXILoader;
  private cache: {[key: string]: LoaderResource};

  constructor() {
    // @ts-ignore
    this.loader = new PIXILoader();
    this.cache = {};
  }

  public add(_key: string, _asset: string): void {
    this.loader.add(
      _key,
      _asset
    );
  }

  public get(_key: string): LoaderResource {
    return this.cache[_key] || null;
  }

  public load(): Promise<void> {
    return new Promise<void>((resolve: Function, reject: Function): void => {
      this.loader.load((loader: PIXILoader, resources: {[key: string]: LoaderResource}): void => {
        for (const k in resources) {
          if (k && resources[k]) {
            this.cache[k] = resources[k];
          }
        }
        resolve();
      });
    });
  }
}
