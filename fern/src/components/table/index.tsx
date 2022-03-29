import { IconGenerator } from '@Components/icons';
import styles from './table.module.scss';

interface Props {
  rows: { url?: string; text: string }[][];
  headers: string[];
  icon?: { icon: IconGenerator; action?: Function; size?: number }[];
}

export type TableProps = Props;

const Table: React.FC<TableProps> = (props) => {
  return (
    <div className={styles.tblResponsive}>
      <table>
        <thead>
          <tr>
            {props.headers.map((title, index) => (
              <th key={index + '-tr' + 'title'}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.rows.map((row, index) => (
            <tr key={index + 'tr-body'}>
              {row.map((field, index) => (
                <td key={index + '-td'}>
                  <a href={field.url}>{field.text}</a>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
