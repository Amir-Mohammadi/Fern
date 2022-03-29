import { DownSwipe, Icons, LeftSwipe } from '@Components/icons';
import classNames from 'classnames';
import React from 'react';
import styles from './tree-view.module.scss';

interface Props {
  treeNodes: Array<TreeViewNodes>;
}

export type TreeViewNodes = {
  title: string;
  children: TreeViewNodes[];
  folded: boolean;
  uri: string;
  id: number;
};

function renderNode(node: TreeViewNodes, lastNode: boolean, firstNode: boolean) {
  return (
    <div key={node.id} className={styles.node}>
      <a
        href={node.uri}
        className={classNames({
          [styles.link]: true,
          [styles.last]: lastNode && !firstNode,
          [styles.first]: firstNode,
        })}>
        {node.title}
      </a>

      {lastNode ? null : <Icons size={12} icon={node.folded ? LeftSwipe : DownSwipe} />}
    </div>
  );
}

function creatTree(nodes: TreeViewNodes[], depth: number) {
  return (
    <div>
      <ul className={styles.list}>
        {nodes.map((node) => {
          if (node.children.length === 0) {
            return renderNode(node, true, depth === 0);
          }

          return (
            <li key={'key'}>
              {renderNode(node, false, depth === 0)}
              {node.folded ? null : creatTree(node.children, depth + 1)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export type TreeViewProps = Props;
const TreeView: React.FC<TreeViewProps> = (props) => {
  return creatTree(props.treeNodes, 0);
};

export default TreeView;
