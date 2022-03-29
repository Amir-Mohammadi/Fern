//#region imports
import { action, makeObservable, observable } from 'mobx';
//#endregion

export class GlobalStore {
  constructor() {
    makeObservable(this);
  }

  @observable loading: boolean = false;

  @action setLoading = (loading: boolean) => {
    this.loading = loading;
  };
}

//#region types
export interface InjectedGlobalStore {
  global: GlobalStore;
}
//#endregion
