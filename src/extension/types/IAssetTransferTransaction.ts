// Enums
import { TransactionTypeEnum } from '@extension/enums';

// Types
import IBaseTransaction from './IBaseTransaction';

interface IAssetTransferTransaction extends IBaseTransaction {
  amount: string;
  assetId: string;
  receiver: string;
  type: TransactionTypeEnum.AssetTransfer;
}

export default IAssetTransferTransaction;
