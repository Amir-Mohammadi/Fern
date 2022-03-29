import { MarketProductCategoryModel } from '@Interfaces/api';
import hash from 'object-hash';
import localStorageService, { LocalStorageKeys } from '../common/local-storage.service';

export interface IProductCategoriesTree extends MarketProductCategoryModel {
  children: Array<IProductCategoriesTree>;
}

export interface ProductCategoriesTreeCache {
  productCategoriesHash: string;
  productCategoriesTree: Array<IProductCategoriesTree>;
}

class ProductCategoriesAdaptor {
  public transformMarketProductCategoryListModel(
    ProductCategories: Array<MarketProductCategoryModel>,
    ParentCategoryId?: number,
  ): Array<IProductCategoriesTree> {
    var fullProductCategoriesTree = this._getProductCategoriesTree(ProductCategories);

    if (ParentCategoryId == undefined) {
      return fullProductCategoriesTree;
    }

    return this._findInProductCategoryTreeById(fullProductCategoriesTree, ParentCategoryId);
  }

  //#region private methods
  private _findInProductCategoryTreeById(
    productCategoriesTree: IProductCategoriesTree[],
    id: number,
  ): Array<IProductCategoriesTree> {
    if (productCategoriesTree.length == 0) return [];

    for (const categoryIt in productCategoriesTree) {
      if (productCategoriesTree[categoryIt].id == id) return [productCategoriesTree[categoryIt]];

      var res = this._findInProductCategoryTreeById(productCategoriesTree[categoryIt].children, id);

      if (res.length != 0) return res;
    }

    return [];
  }

  private _getProductCategoriesTree(ProductCategories: Array<MarketProductCategoryModel>) {
    const t = this._getCategoriesFromCache(ProductCategories);
    if (t) return t;

    const productCategoriesTree = this._productCategoriesArrayToTree(ProductCategories);
    this._saveCategoriesInCache(productCategoriesTree, ProductCategories);
    return productCategoriesTree;
  }

  private _productCategoriesArrayToTree(productCategories: Array<MarketProductCategoryModel>) {
    const hashTable: { [key: number]: IProductCategoriesTree } = {};

    // create a hash table from parent_ids
    productCategories.forEach(
      (productCategory) => (hashTable[productCategory.id] = { ...productCategory, children: [] }),
    );
    const productCategoriesTree: IProductCategoriesTree[] = [];
    productCategories.forEach((productCategory) => {
      // if there is a parent_id then pick that from the hash table
      if (productCategory.parent_id) {
        hashTable[productCategory.parent_id].children.push(hashTable[productCategory.id]);
      } else {
        // no parent_id means that node is a root node itself
        productCategoriesTree.push(hashTable[productCategory.id]);
      }
    });

    return productCategoriesTree;
  }

  private _getCategoriesFromCache(productCategories: Array<MarketProductCategoryModel>) {
    var productCategoriesTreeCache = localStorageService.get<ProductCategoriesTreeCache>(
      LocalStorageKeys.PRODUCT_CATEGORIES_TREE,
    );
    var productCategoriesHash = hash.sha1(productCategories);

    if (productCategoriesHash == productCategoriesTreeCache?.productCategoriesHash) {
      return productCategoriesTreeCache!.productCategoriesTree;
    } else return undefined;
  }

  private _saveCategoriesInCache(
    productCategoriesTree: Array<IProductCategoriesTree>,
    productCategories: Array<MarketProductCategoryModel>,
  ) {
    const productCategoriesHash = hash.sha1(productCategories);
    const productCategoriesTreeCache: ProductCategoriesTreeCache = {
      productCategoriesHash,
      productCategoriesTree,
    };

    localStorageService.set(LocalStorageKeys.PRODUCT_CATEGORIES_TREE, productCategoriesTreeCache);
  }
  //#endregion
}
const productCategoriesAdaptor = new ProductCategoriesAdaptor();
export default productCategoriesAdaptor;
