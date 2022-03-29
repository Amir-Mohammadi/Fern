//#region imports
import { MarketStuffPropertyModel } from '@Interfaces';
import { CatalogItemModel } from '@Interfaces/api/catalog-item-model';
import { IProductPropertyItemType, IProductPropertyNode, IProductPropertyTree } from '@Interfaces/common';
import Enumerable from 'linq';

//#endregion

class ProductPropertyTreeService {
  public transformMarketProductPropertyListToTree(
    marketStuffProperties: Array<MarketStuffPropertyModel>,
  ): Array<IProductPropertyTree> {
    const transformedMarketStuffProperties = this._transformMarketStuffPropertiesToInterface(marketStuffProperties);
    const mergedMarketStuffProperties = this._mergePropertyValuesToList(transformedMarketStuffProperties);
    const temporaryPropertiesTree = this._transformMarketStuffPropertyToTree(mergedMarketStuffProperties);
    const productPropertiesTree = this._transformTemporaryPropertiesTreeToProductPropertiesTreeInterface(
      temporaryPropertiesTree,
    );
    return productPropertiesTree;
  }

  private _transformMarketStuffPropertyToTree(
    marketStuffProperties: Array<IMarketStuffProperty>,
  ): Array<ITemporaryPropertiesTree> {
    const hashTable: { [key: number]: ITemporaryPropertiesTree } = {};
    const marketStuffPropertiesTree: Array<ITemporaryPropertiesTree> = [];

    marketStuffProperties.forEach((marketStuffProperty) => {
      hashTable[marketStuffProperty.catalogItemId] = { ...marketStuffProperty, children: [] };
    });

    marketStuffProperties.forEach((marketStuffProperty) => {
      if (marketStuffProperty.referenceId == null) {
        // this is probably a parent
        if (marketStuffProperty.extraKeyName == null) {
          // a real parent
          marketStuffPropertiesTree.push(hashTable[marketStuffProperty.catalogItemId]);
        } else {
          // this is a child of parent
          hashTable[marketStuffProperty.catalogItemId].children.push(hashTable[marketStuffProperty.catalogItemId]);
        }
      } else {
        hashTable[marketStuffProperty.referenceId].children.push(hashTable[marketStuffProperty.catalogItemId]);
      }
    });
    return marketStuffPropertiesTree;
  }

  private _transformTemporaryPropertiyTreeToProductPropertyTreeInterface(
    marketStuffPropertyTree: ITemporaryPropertiesTree,
  ): IProductPropertyTree {
    const properties: Array<IProductPropertyNode> = marketStuffPropertyTree.children.map((property) => {
      return {
        title: property.extraKeyName ? property.extraKeyName : property.catalogItemKeyName,
        type: IProductPropertyItemType.List,
        order: property.order,
        id: property.id,
        isMain: property.isMain,
        value: property.value,
      };
    });

    return {
      title: marketStuffPropertyTree.catalogItemKeyName,
      order: marketStuffPropertyTree.order,
      properties: properties.sort(this._compareProductPropertyNodes),
    };
  }

  private _transformTemporaryPropertiesTreeToProductPropertiesTreeInterface(
    marketStuffPropertiesTree: Array<ITemporaryPropertiesTree>,
  ): Array<IProductPropertyTree> {
    const productProperties: IProductPropertyTree[] = marketStuffPropertiesTree.map((marketStuffPropertyTree) => {
      return this._transformTemporaryPropertiyTreeToProductPropertyTreeInterface(marketStuffPropertyTree);
    });

    const sortedProductProperty = productProperties.sort(this._compareProductProperties);
    return sortedProductProperty;
  }

  private _mergePropertyValuesToList(marketStuffProperties: Array<IMarketStuffProperty>): Array<IMarketStuffProperty> {
    const [productPropertyParents, productPropertyChildren] = this._septatePropertyParentsFromChildren(
      marketStuffProperties,
    );
    const parentPropertyGroupedLists = this._groupValuesInProperties(productPropertyParents);
    const childPropertyGroupedLists = this._groupValuesInProperties(productPropertyChildren);
    const productProperty = parentPropertyGroupedLists.concat(childPropertyGroupedLists);
    return productProperty;
  }

  private _septatePropertyParentsFromChildren(
    marketStuffProperties: Array<IMarketStuffProperty>,
  ): [parents: Array<IMarketStuffProperty>, children: Array<IMarketStuffProperty>] {
    const productPropertyParents: Array<IMarketStuffProperty> = [];
    const productPropertyChildren: Array<IMarketStuffProperty> = [];
    marketStuffProperties.forEach((productProperty) => {
      if (!productProperty.extraKeyName) {
        productPropertyParents.push({
          id: productProperty.reference!.id,
          value: [],
          order: productProperty.reference!.order,
          catalogItemId: productProperty.reference!.id,
          rowVersion: productProperty.reference!.row_version,
          catalogItemKeyName: productProperty.reference!.value,
          extraKeyName: null,
          referenceId: null,
          isMain: false,
        });
      }
      productPropertyChildren.push(productProperty);
    });
    return [productPropertyParents, productPropertyChildren];
  }

  private _transformMarketStuffPropertiesToInterface(
    marketStuffPropertyModel: MarketStuffPropertyModel[],
  ): IMarketStuffProperty[] {
    return marketStuffPropertyModel.map(this._transformMarketStuffPropertyToInterface);
  }

  private _transformMarketStuffPropertyToInterface(
    marketStuffPropertyModel: MarketStuffPropertyModel,
  ): IMarketStuffProperty {
    return {
      id: marketStuffPropertyModel.id,
      value: [marketStuffPropertyModel.value ?? ''],
      order: marketStuffPropertyModel.order ?? 0,
      catalogItemId: marketStuffPropertyModel.catalog_item_id,
      rowVersion: marketStuffPropertyModel.row_version,
      catalogItemKeyName: marketStuffPropertyModel.catalog_item_key_name ?? '',
      extraKeyName: marketStuffPropertyModel.extra_key_name,
      referenceId: marketStuffPropertyModel.reference_id,
      isMain: marketStuffPropertyModel.is_main ?? false,
      reference: marketStuffPropertyModel.reference ?? null,
    };
  }

  private _groupValuesInProperties(
    transformedMarketStuffPropertyList: Array<IMarketStuffProperty>,
  ): Array<IMarketStuffProperty> {
    const groupedMarketStuffProperties = Enumerable.from(transformedMarketStuffPropertyList).groupBy(
      (x) => x.catalogItemId,
      (x) => x.value[0],
      function (key, value) {
        return {
          id: key,
          value: value.concat().toArray(),
        };
      },
    );

    const joinMarketStuffProperties: Array<IMarketStuffProperty> = [];
    groupedMarketStuffProperties.forEach((item) => {
      const marketStuffProperty = Enumerable.from(transformedMarketStuffPropertyList)
        .where((x) => x.catalogItemId == item.id)
        .firstOrDefault();

      if (marketStuffProperty) {
        marketStuffProperty.value = item.value;
        joinMarketStuffProperties.push(marketStuffProperty);
      }
    });
    return joinMarketStuffProperties;
  }

  private _compareProductProperties(itemA: IProductPropertyTree, itemB: IProductPropertyTree) {
    return itemA.order - itemB.order;
  }
  private _compareProductPropertyNodes(itemA: IProductPropertyNode, itemB: IProductPropertyNode) {
    return itemA.order - itemB.order;
  }
}

interface IMarketStuffProperty {
  id: number;
  value: string[];
  order: number;
  catalogItemId: number;
  rowVersion: string;
  catalogItemKeyName: string;
  extraKeyName: string | null;
  referenceId: number | null;
  isMain: boolean;
  reference?: CatalogItemModel;
}

interface ITemporaryPropertiesTree extends IMarketStuffProperty {
  children: Array<ITemporaryPropertiesTree>;
}

// singleton
const productPropertyTreeService = new ProductPropertyTreeService();
export default productPropertyTreeService;
