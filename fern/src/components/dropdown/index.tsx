import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useState } from 'react';
import ScrollBar from 'react-scrollbars-custom';
import styles from './dropdown.module.scss';
interface Props {
  option: { title: string }[];
  selectedIndex?: number[];
  checkMode?: boolean;
  disabled?: boolean;
  customValue?: string;
  onSelect: (i: number) => any;
  search?: {
    input: string;
    handleChange: (e: string) => void;
  };
}

export type DropDownProps = Props;

const DropDown: React.FC<DropDownProps> = (props) => {
  const [toggle, setToggle] = useState(false);
  const [upMode, setUpMode] = useState(false);
  return (
    <div
      className={classNames({
        [styles.dropdownBX]: true,
        [styles.disabled]: props.disabled,
      })}>
      <div
        className={classNames({
          [styles.dropdownBD]: true,
          [styles.dropdownBDUp]: upMode,
        })}
        onBlur={(a) => {
          if (
            a.nativeEvent.relatedTarget == document.getElementById('searchInput') &&
            a.nativeEvent.relatedTarget !== null
          ) {
            return;
          }

          setToggle(false);
        }}
        tabIndex={0}>
        <div
          className={styles.dropdownHeader}
          onClick={(e) => {
            if (e.nativeEvent.view!.innerHeight - e.clientY < 180) {
              setUpMode(true);
            } else {
              setUpMode(false);
            }

            !props.disabled ? setToggle(!toggle) : null;
          }}>
          <div className={styles.selectedBX}>
            {props.selectedIndex?.length && !props.selectedIndex.includes(-1) ? (
              props.selectedIndex.map((value, i) => (
                <span
                  key={i + value + 'DrOpDoWn'}
                  className={classNames({
                    [styles.selectedItem]: props.checkMode,
                  })}>
                  {props.option[value].title}
                </span>
              ))
            ) : (
              <span>{props.customValue || 'انتخاب کنید'}</span>
            )}
          </div>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faChevronDown} color={'#d3d3d3'} size={'sm'} />
          </div>
        </div>
        {toggle && !props.disabled && (
          <div className={styles.content}>
            <ScrollBar
              maximalThumbSize={33}
              trackYProps={{
                style: {
                  width: '7px',
                  height: '130px',
                  top: '26px',
                  left: '2px',
                  backgroundColor: '#f2f2f2',
                  justifyContent: 'flex-end',
                },
              }}
              thumbYProps={{ style: { backgroundColor: '#c4c4c4' } }}
              style={{
                borderRadius: '21px',
                overflow: 'hidden',
                boxShadow: '0px 3px 6px 0px rgba(0, 0, 0, 0.16)',
                height: '171px',
                width: '266px',
                backgroundColor: '#ffffff',
                justifyContent: 'flex-end',
              }}>
              <div className={styles.container}>
                {props.search && (
                  <input
                    id="searchInput"
                    type="text"
                    placeholder="جستجو"
                    value={props.search.input}
                    onChange={({ target }) => props.search?.handleChange(target.value)}
                  />
                )}
                {!props.checkMode && props.customValue && (
                  <div
                    className={styles.items}
                    onClick={(e) => {
                      props.onSelect(-1);
                      setToggle(false);
                    }}>
                    <span>{props.customValue}</span>
                  </div>
                )}

                {props.option.map((value, i) => {
                  if (props.search) {
                    if (value.title.includes(props.search.input)) {
                      return (
                        <div
                          className={styles.items}
                          key={i + value.title + 'DrOpDoWn'}
                          onClick={() => {
                            if (props.checkMode) {
                              props.onSelect(i);
                            } else {
                              props.onSelect(i);
                              setToggle(false);
                            }
                          }}>
                          {props.checkMode && (
                            <input type="checkbox" checked={props.selectedIndex?.includes(i)} readOnly tabIndex={-1} />
                          )}

                          <span>{value.title}</span>
                        </div>
                      );
                    }
                    return;
                  } else {
                    return (
                      <div
                        className={styles.items}
                        key={i + value.title + 'DrOpDoWn'}
                        onClick={() => {
                          if (props.checkMode) {
                            props.onSelect(i);
                          } else {
                            props.onSelect(i);
                            setToggle(false);
                          }
                        }}>
                        {props.checkMode && (
                          <input type="checkbox" checked={props.selectedIndex?.includes(i)} readOnly tabIndex={-1} />
                        )}

                        <span>{value.title}</span>
                      </div>
                    );
                  }
                })}
              </div>
            </ScrollBar>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
