import { Stores } from '@Stores';
import { inject } from 'mobx-react';
import { Component } from 'react';

export class ComponentWithStore<IStores, IProps = {}, IStates = {}> extends Component<IProps, IStates> {
  public get stores() {
    return (this.props as any) as IStores;
  }
}

export const connect = (...args: Array<keyof Stores>) => inject(...args);
