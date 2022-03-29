import { Mode } from '@Constants/colors';
import Badge, { Shapes } from '../badge';
import styles from './header-separator.module.scss';
interface Props {
  mode?: Mode;
  text: string;
  badgeValue?: string;
  type?: 'basic' | 'round';
}

export type HeaderSeparatorProps = Props;

const HeaderSeparator: React.FC<HeaderSeparatorProps> = (props) => {
  if (props.type == 'round') {
    return (
      <div className={styles.container}>
        <div
          style={{
            backgroundColor: props.mode ? props.mode + '22' : '#FFFFFF' + '22',
            color: props.mode || '#FFFFFF',
          }}
          className={styles.divText}>
          <span>{props.text} </span>
        </div>
        <div>
          <div className={styles.lineSeparator} style={{ borderTopColor: props.mode || '#FFFFFF' }} />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.basicContainer}>
        <div
          style={{
            flex: 'none',
          }}>
          <div style={{ flexDirection: 'column' }}>
            <div style={{ flexDirection: 'row' }}>
              <div className={styles.contentStyle}>
                <div
                  style={{
                    width: '5px',
                  }}
                  className={styles.defStyle}></div>
                <div className={styles.defStyle}>
                  <span
                    style={{
                      color: props.mode ? props.mode : Mode.light,
                      width: 'max-content',
                    }}>
                    {props.text}
                  </span>
                </div>
                <div className={styles.defStyle} style={{ paddingRight: '20px' }}>
                  <Badge
                    value={props.badgeValue ? props.badgeValue : '0'}
                    max={10}
                    shape={Shapes.Circle}
                    mode={props.mode || Mode.light}
                  />
                </div>
              </div>
            </div>
            <div
              className={styles.titleSeparator}
              style={{
                borderTopColor: props.mode || Mode.light,
                borderTopStyle: 'solid',
              }}></div>
          </div>
        </div>
        <div>
          <div style={{ alignItems: 'flex-end' }}>
            <div
              className={styles.lineSeparator}
              style={{
                borderTopStyle: 'solid',
              }}></div>
          </div>
        </div>
      </div>
    );
  }
};

export default HeaderSeparator;
