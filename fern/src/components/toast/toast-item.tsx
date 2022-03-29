import React, { Component } from 'react';
import styles from './toast.module.scss';

interface state {}

interface props {
  id: number;
  text: string;
  duration: number;
  unMountMe?: (id: number) => void;
}

export type ToastItemProps = props;

export default class ToastItem extends Component<ToastItemProps, state> {
  timer: NodeJS.Timeout;

  constructor(props: ToastItemProps) {
    super(props);
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.unMountMe!(this.props.id);
    }, this.props.duration);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <div className={styles.itemContainer}>
        <span>{this.props.text}</span>
      </div>
    );
  }
}
