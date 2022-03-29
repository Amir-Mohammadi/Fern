import { ICategoryTree } from '@Components/header';
import { TreeViewNodes } from '@Components/tree-view';

export class SearchStoreService {
  public prepareTreeViewNodes(treeNodes: Array<ICategoryTree>): Array<TreeViewNodes> {
    return treeNodes.map((treeNode) => {
      if (treeNode.child.length == 0) {
        return {
          children: [],
          folded: false,
          title: treeNode.name ?? '',
          uri: '/search/' + treeNode.id,
          id: treeNode.id,
        };
      }

      return {
        children: this.prepareTreeViewNodes(treeNode.child),
        folded: false,
        title: treeNode.name ?? '',
        uri: '/search/' + treeNode.id,
        id: treeNode.id,
      };
    });
  }
}

//#region singleton export

const searchStoreService = new SearchStoreService();
export { searchStoreService };

//#endregion
