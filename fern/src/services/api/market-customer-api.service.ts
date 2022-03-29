import { IWriteComment } from '@Interfaces/common';
import { adaptorService } from '@Services/adaptor';
import Transporter from '@Utils/transporter';

class MarketCustomerApiService {
  private _transporter: Transporter;

  constructor(transporter: Transporter) {
    this._transporter = transporter;
  }

  public async addNewComment(marketStuffId: number, writeComment: IWriteComment): Promise<void> {
    const transformedWriterComment = adaptorService.customerApiAdaptor.reverseTransformWriteCommentInterface(
      writeComment,
    );

    return await this._transporter.post<void>(`market-stuffs/${marketStuffId}/comments/write`, {
      data: transformedWriterComment,
    });
  }
}

export default MarketCustomerApiService;
