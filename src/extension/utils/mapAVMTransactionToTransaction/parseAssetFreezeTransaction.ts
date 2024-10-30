import { BigNumber } from 'bignumber.js';

// enums
import { TransactionTypeEnum } from '@extension/enums';

// types
import {
  IAVMAssetFreezeTransaction,
  IAssetFreezeTransaction,
  IAssetUnfreezeTransaction,
  IBaseTransaction,
} from '@extension/types';

export default function parseAssetFreezeTransaction(
  algorandAssetFreezeTransaction: IAVMAssetFreezeTransaction,
  baseTransaction: IBaseTransaction
): IAssetFreezeTransaction | IAssetUnfreezeTransaction {
  return {
    ...baseTransaction,
    assetId: new BigNumber(
      String(algorandAssetFreezeTransaction['asset-id'] as bigint)
    ).toFixed(),
    frozenAddress: algorandAssetFreezeTransaction.address,
    type: algorandAssetFreezeTransaction['new-freeze-status']
      ? TransactionTypeEnum.AssetFreeze
      : TransactionTypeEnum.AssetUnfreeze,
  };
}
