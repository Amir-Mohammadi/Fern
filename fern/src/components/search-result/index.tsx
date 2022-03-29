import * as React from 'react';
import styles from './search-result.module.scss';
interface Props {
  searchResult?: Array<{ title: string; url: string }>;
  loading?: boolean;
}
type SearchResultProps = Props;
const SearchResult: React.FC<SearchResultProps> = (props) => {
  const loading = props.loading ?? false;
  const searchResult = props.searchResult ?? new Array<{ title: string; url: string }>();
  return loading == true ? null : (
    <div className={styles.searchResultBox}>
      <ul>
        {searchResult.map((item) => (
          <li>
            <a href={item.url}> {item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SearchResult;
