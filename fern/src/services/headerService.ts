import { ICategoryTree } from '@Components/header';
import api from 'api';
import { IProductCategories } from 'api/models';
import { arrayToTree } from 'performant-array-to-tree';

export default class HeaderService {
  async getCategories(): Promise<ICategoryTree[]> {
    try {
      const res = await api.v1.marketApi.getMarketStuffCategories();
      return this.makeTree(res.data);
    } catch (error) {
      throw error;
    }
  }

  private makeTree(data: IProductCategories[]) {
    //   return data.reduce((r: any[], e) => {
    //     if (e.parent_id == parent) {
    //       e.child = this.makeTree(data, e.id);
    //       r.push(e);
    //     }
    //     return r;
    //   }, []);
    // }

    const categories = arrayToTree(data, {
      id: 'id',
      parentId: 'parent_id',
      childrenField: 'child',
      dataField: null,
    });
    console.log(categories);

    return categories as ICategoryTree[];
  }
}
