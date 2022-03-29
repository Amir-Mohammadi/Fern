import { ICategoryTree } from '@Components/header';
import { IProductCategoriesTree } from '@Services/adaptor/product-categories-adaptor';

export class HeaderStoreService {
  public prepareTreeViewNodes(treeNodes: Array<IProductCategoriesTree>): Array<ICategoryTree> {
    return treeNodes.map((treeNode) => {
      if (treeNode.children.length == 0) {
        return {
          child: [],
          name: treeNode.name ?? '',
          id: treeNode.id,
          meta_description: treeNode.meta_description ?? '',
        };
      }
      return {
        child: this.prepareTreeViewNodes(treeNode.children),
        name: treeNode.name ?? '',
        id: treeNode.id,
        meta_description: treeNode.meta_description ?? '',
      };
    });
  }
}

const headerStoreService = new HeaderStoreService();
export { headerStoreService };
