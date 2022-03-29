import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Component } from 'react';
import styles from './pop-up.module.scss';

type Options = 'submit' | 'cancel';

interface Props {
  options?: { type: Options; text: string; action: () => void }[];
  title: string;
  onClose: () => void;
  message: string | React.ReactElement;
  shape?: React.ReactElement;
}

export type PopUpProps = Props;

class PopUP extends Component<PopUpProps> {
  componentWillUnmount() {
    this.props.onClose();
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.pupOpBX}>
          <div className={styles.popOpHD}>
            <span className={styles.title}>{this.props.title}</span>
            <FontAwesomeIcon
              className={styles.closeBtn}
              icon={faTimes}
              onClick={() => {
                this.props.onClose();
              }}
              color={'#707070'}
            />
          </div>
          <div className={styles.popOpBD}>
            {this.props.shape}
            <div className={styles.content}>{this.props.message}</div>
          </div>
          {this.props.options && (
            <div className={styles.popOpFT}>
              {this.props.options.map((option) => (
                <button
                  className={classNames({
                    [styles.success]: option.type == 'submit',
                    [styles.danger]: option.type == 'cancel',
                  })}
                  onClick={() => {
                    option.action();
                  }}>
                  {option.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default PopUP;
